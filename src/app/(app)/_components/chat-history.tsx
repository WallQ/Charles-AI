'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';
import { useChatStore } from '@/stores/chat';
import { api } from '@/trpc/react';

import ChatDropdownMenu from '@/app/(app)/_components/chat-dropdown-menu';
import DeleteAlertDialog from '@/app/(app)/_components/delete-alert-dialog';
import RenameChatDialog from '@/app/(app)/_components/rename-chat-dialog';

const ChatHistory: React.FunctionComponent = (): React.ReactNode => {
	const [chats] = api.chat.getChats.useSuspenseQuery();
	const utils = api.useUtils();
	const changeChatName = api.chat.changeChatName.useMutation({
		onSuccess: async () => {
			await utils.chat.invalidate();
			setOpenDialog(false);
			setSelectedChat(null);
		},
	});
	const deleteChat = api.chat.deleteChat.useMutation({
		onSuccess: async () => {
			await utils.chat.invalidate();
			setOpenAlertDialog(false);
			setSelectedChat(null);
			router.push(APP_ROUTES.APP);
		},
	});

	const router = useRouter();
	const chatStore = useChatStore();

	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
	const [selectedChat, setSelectedChat] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRenameClick = (chatId: string, chatName: string) => {
		setSelectedChat({ id: chatId, name: chatName });
		setOpenDialog(true);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setSelectedChat((prev) => (prev ? { ...prev, name: value } : null));
	};

	const handleChangeNameChatSubmit = () => {
		if (!selectedChat) return;
		changeChatName.mutate({
			id: selectedChat.id,
			name: selectedChat.name,
		});
	};

	const handleDeleteClick = (chatId: string, chatName: string) => {
		setSelectedChat({ id: chatId, name: chatName });
		setOpenAlertDialog(true);
	};

	const handleDeleteChatSubmit = () => {
		if (!selectedChat) return;
		deleteChat.mutate({ id: selectedChat.id });
	};

	return (
		<nav className='flex-1'>
			{chats.length > 0 ? (
				<ol>
					{chats.map((chat) => (
						<li
							key={chat.id}
							className='flex flex-row items-center justify-between rounded-lg p-2 hover:bg-primary-foreground/5'>
							<Link
								key={chat.id}
								href={APP_ROUTES.CHAT(chat.id)}
								className='flex-1 truncate whitespace-nowrap text-sm'
								onClick={() =>
									chatStore.setSelectedChat(chat.id)
								}>
								{chat.name}
							</Link>
							<ChatDropdownMenu
								onRenameClick={handleRenameClick}
								onDeleteClick={handleDeleteClick}
								chatId={chat.id}
								chatName={chat.name}
							/>
							<RenameChatDialog
								open={
									openDialog && selectedChat?.id === chat.id
								}
								onOpenChange={(isOpen) => {
									setOpenDialog(isOpen);
									if (!isOpen) setSelectedChat(null);
								}}
								selectedChat={selectedChat}
								onInputChange={handleInputChange}
								onSubmit={handleChangeNameChatSubmit}
								isPending={changeChatName.isPending}
							/>
							<DeleteAlertDialog
								open={
									openAlertDialog &&
									selectedChat?.id === chat.id
								}
								onOpenChange={(isOpen) => {
									setOpenAlertDialog(isOpen);
									if (!isOpen) setSelectedChat(null);
								}}
								onSubmit={handleDeleteChatSubmit}
								isPending={deleteChat.isPending}
							/>
						</li>
					))}
				</ol>
			) : null}
		</nav>
	);
};

export default ChatHistory;
