import { chats } from '@/server/db/schema';
import {
	boolean,
	numeric,
	pgTableCreator,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const createTable = pgTableCreator((name) => `charles-ai_${name}`);

export const chatMessage = createTable('chat_message', {
	id: uuid('id').unique().defaultRandom().primaryKey().notNull(),
	message: text('message').notNull(),
	model: text('model').notNull(),
	temperature: numeric('temperature').notNull(),
	isUser: boolean('is_user').default(true),
	chatId: uuid('chat_id')
		.notNull()
		.references(() => chats.id, {
			onUpdate: 'cascade',
			onDelete: 'cascade',
		}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
	chat: one(chats, {
		fields: [chatMessage.chatId],
		references: [chats.id],
	}),
}));

export default chatMessage;
