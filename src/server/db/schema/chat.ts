import { chatMessages } from '@/server/db/schema';
import { pgTableCreator, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const createTable = pgTableCreator((name) => `charles-ai_${name}`);

export const chat = createTable('chat', {
	id: uuid('id').unique().defaultRandom().primaryKey().notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	userId: varchar('user_id', { length: 256 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});

export const chatRelations = relations(chat, ({ many }) => ({
	chatMessages: many(chatMessages),
}));

export default chat;
