import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DB_HOST: z.string(),
		DB_PORT: z.coerce.number(),
		DB_CONTAINER_NAME: z.string(),
		DB_USER: z.string(),
		DB_PASSWORD: z.string(),
		DB_NAME: z.string(),
		DB_URL: z.string().url(),
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		CLERK_SECRET_KEY: z.string(),
	},

	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
		NEXT_PUBLIC_API_URL: z.string().url(),
	},

	runtimeEnv: {
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,
		DB_CONTAINER_NAME: process.env.DB_CONTAINER_NAME,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_NAME: process.env.DB_NAME,
		DB_URL: process.env.DB_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL:
			process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_URL:
			process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
			process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
			process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
