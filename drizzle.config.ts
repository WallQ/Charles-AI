import { env } from '@/env';
import { type Config } from 'drizzle-kit';

export default {
	schema: './src/server/db/schema',
	out: './src/server/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DB_URL,
	},
	verbose: true,
	strict: true,
	tablesFilter: ['charles-ai_*'],
} satisfies Config;
