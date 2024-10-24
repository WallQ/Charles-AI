'use client';

import { Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';
import { useChatStore } from '@/stores/chat';
import { useModelStore } from '@/stores/model';
import { useSettingsStore } from '@/stores/settings';
import { api } from '@/trpc/react';
import { PromptSchema, type Prompt } from '@/validators/prompt';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const InputBar: React.FunctionComponent = (): React.ReactNode => {
	const utils = api.useUtils();
	const createChat = api.chat.createChat.useMutation();
	const sendMessage = api.chat.sendChatMessage.useMutation({
		onSuccess: async () => {
			await utils.chat.invalidate();
		},
	});

	const router = useRouter();
	const pathname = usePathname();
	const { selectedModel } = useModelStore();
	const { selectedSettings } = useSettingsStore();
	const { selectedChat, setSelectedChat } = useChatStore();

	const form = useForm<Prompt>({
		resolver: zodResolver(PromptSchema),
		defaultValues: {
			message: '',
			// file: undefined,
		},
	});

	const onSubmit = async ({ message }: Prompt) => {
		const handleCreateChatAndSendMessage = async () => {
			const createdChat = await createChat.mutateAsync();
			if (!createdChat) return;

			await sendMessage.mutateAsync({
				id: createdChat.id,
				message,
				// file: file ? URL.createObjectURL(file) : '',
				model: selectedModel,
				temperature: selectedSettings,
			});

			setSelectedChat(createdChat.id);
			router.push(APP_ROUTES.CHAT(createdChat.id));
		};

		const handleSendMessageToExistingChat = async (chatId: string) => {
			await sendMessage.mutateAsync({
				id: chatId,
				message,
				// file: file ? URL.createObjectURL(file) : '',
				model: selectedModel,
				temperature: selectedSettings,
			});
		};

		if (pathname === APP_ROUTES.APP) {
			await handleCreateChatAndSendMessage();
		} else {
			const chatId = selectedChat;
			if (chatId) await handleSendMessageToExistingChat(chatId);
		}

		form.reset();
	};

	return (
		<div className='w-[768px]'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex w-full flex-col gap-4'>
					{/* <FormField
						control={form.control}
						name='file'
						disabled={form.formState.isSubmitting}
						render={({ field }) => (
							<FormItem>
								<FormLabel>File</FormLabel>
								<FormControl>
									<Input
										type='file'
										placeholder='Select a file to AI read'
										accept='application/pdf'
										onChange={(e) =>
											field.onChange(
												e.target.files
													? e.target.files[0]
													: undefined,
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<FormField
						control={form.control}
						name='message'
						disabled={form.formState.isSubmitting}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea
										className='resize-none'
										placeholder='How can I...'
										minLength={3}
										maxLength={256}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full'
						disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? (
							<Fragment>
								<Loader2 className='mr-2 size-4 animate-spin' />
								Submitting...
							</Fragment>
						) : (
							<Fragment>Submit</Fragment>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default InputBar;
