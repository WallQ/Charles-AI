import { env } from '@/env';
import * as schema from '@/server/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DB_URL);
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
