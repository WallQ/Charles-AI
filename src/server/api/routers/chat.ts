import { env } from '@/env';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { chatMessages, chats } from '@/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import fetch from 'node-fetch';
import { z } from 'zod';

import { generateRandom4WordString } from '@/lib/utils';

export const chatRouter = createTRPCRouter({
	getChats: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select({
				id: chats.id,
				name: chats.name,
			})
			.from(chats)
			.where(eq(chats.userId, ctx.auth.userId))
			.orderBy(desc(chats.createdAt));
	}),

	changeChatName: protectedProcedure
		.input(
			z.object({
				id: z.string().min(16).max(64),
				name: z.string().min(3).max(64),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db
				.update(chats)
				.set({ name: input.name })
				.where(
					and(
						eq(chats.id, input.id),
						eq(chats.userId, ctx.auth.userId),
					),
				);
		}),

	deleteChat: protectedProcedure
		.input(z.object({ id: z.string().min(16).max(64) }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.db
				.delete(chats)
				.where(
					and(
						eq(chats.id, input.id),
						eq(chats.userId, ctx.auth.userId),
					),
				)
				.returning()
				.then((res) => res[0]);
		}),

	createChat: protectedProcedure.mutation(async ({ ctx }) => {
		return await ctx.db
			.insert(chats)
			.values({
				userId: ctx.auth.userId,
				name: generateRandom4WordString(),
			})
			.onConflictDoNothing()
			.returning({
				id: chats.id,
			})
			.then((res) => res[0]);
	}),

	sendChatMessage: protectedProcedure
		.input(
			z.object({
				id: z.string().min(16).max(64),
				model: z.string(),
				temperature: z.string(),
				message: z.string().min(3).max(256),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(chatMessages).values({
				message: input.message,
				model: input.model,
				temperature: input.temperature,
				isUser: true,
				chatId: input.id,
			});

			const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/prompt`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: input.model,
					temperature: input.temperature,
					question: input.message,
				}),
			});

			if (!response.ok)
				throw new Error('Failed to fetch answer from external API');

			const answer = (await response.json()) as {
				answer: string;
			};

			await ctx.db.insert(chatMessages).values({
				message: answer.answer,
				model: input.model,
				temperature: input.temperature,
				isUser: false,
				chatId: input.id,
			});
		}),

	getChatMessages: protectedProcedure
		.input(z.object({ id: z.string().min(16).max(64) }))
		.query(async ({ ctx, input }) => {
			return await ctx.db
				.select({
					id: chatMessages.id,
					message: chatMessages.message,
					model: chatMessages.model,
					isUser: chatMessages.isUser,
					createdAt: chatMessages.createdAt,
					name: chats.name,
				})
				.from(chatMessages)
				.innerJoin(chats, eq(chats.id, chatMessages.chatId))
				.where(
					and(
						eq(chats.userId, ctx.auth.userId),
						eq(chatMessages.chatId, input.id),
					),
				);
		}),

	getChatDocuments: protectedProcedure
		.input(z.object({ id: z.string().min(16).max(64) }))
		.query(async ({ ctx, input }) => {
			const questions = await ctx.db
				.select({
					message: chatMessages.message,
				})
				.from(chatMessages)
				.innerJoin(chats, eq(chats.id, chatMessages.chatId))
				.where(
					and(
						eq(chats.userId, ctx.auth.userId),
						eq(chatMessages.chatId, input.id),
						eq(chatMessages.isUser, true),
					),
				);

			const response = await fetch(
				`${env.NEXT_PUBLIC_API_URL}/get_relevant_documents`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						questions,
					}),
				},
			);

			if (!response.ok)
				throw new Error('Failed to fetch documents from external API');

			const chatDocuments = (await response.json()) as {
				relevant_docs: [
					{
						Id: string;
						Link: string;
						Title: string;
					},
				];
			};

			return chatDocuments;
		}),
});
