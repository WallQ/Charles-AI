import {
	maxLengthErrorMessage,
	minLengthErrorMessage,
} from '@/validators/general';
import { z } from 'zod';

// const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
// const ACCEPTED_FILE_TYPES = ['application/pdf'];

export const PromptSchema = z.object({
	message: z
		.string()
		.min(3, { message: minLengthErrorMessage('Message', 3) })
		.max(256, { message: maxLengthErrorMessage('Message', 256) }),
	// file: z
	// 	.instanceof(File)
	// 	.optional()
	// 	.refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, {
	// 		message: 'File size must be less than 3MB.',
	// 	})
	// 	.refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
	// 		message: 'File must be a PDF.',
	// 	}),
});

export type Prompt = z.infer<typeof PromptSchema>;
