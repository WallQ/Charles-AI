'use client';

import { Fragment, useEffect, useRef } from 'react';
import { api } from '@/trpc/react';
import { useUser } from '@clerk/nextjs';

import { cn, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ChatProps = {
	id: string;
};

const Chat: React.FunctionComponent<ChatProps> = ({ id }): React.ReactNode => {
	const { user } = useUser();
	const [chatMessages] = api.chat.getChatMessages.useSuspenseQuery({
		id,
	});

	const chatEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]);

	return (
		<div>
			{chatMessages.map((chat) => (
				<div
					key={chat.id}
					className={cn('py-4', {
						'bg-primary-foreground': chat.isUser,
						'bg-secondary': !chat.isUser,
					})}>
					<div
						className={cn(
							'container mx-auto flex w-full flex-row items-center',
							{
								'justify-end': chat.isUser,
								'justify-start': !chat.isUser,
							},
						)}>
						{chat.isUser ? (
							<Fragment>
								<p className='mr-4 box-border text-white'>
									{chat.message}
								</p>
								<Avatar>
									<AvatarImage
										src={
											user?.imageUrl ??
											`https://source.boringavatars.com/beam/128/charles-ai?colors=fafafa,f4f4f5,e4e4e7,d4d4d8,a1a1aa,71717a,52525b,3f3f46,27272a,18181b,09090b`
										}
										alt='User Profile Image'
									/>
									<AvatarFallback>
										{getInitials(user?.fullName) ?? 'AI'}
									</AvatarFallback>
								</Avatar>
							</Fragment>
						) : (
							<Fragment>
								<Avatar>
									<AvatarImage
										src={`https://source.boringavatars.com/beam/128/${chat.name}?colors=fafafa,f4f4f5,e4e4e7,d4d4d8,a1a1aa,71717a,52525b,3f3f46,27272a,18181b,09090b`}
										alt='AI Profile Image'
									/>
									<AvatarFallback>AI</AvatarFallback>
								</Avatar>
								<p className='ml-4 box-border text-white'>
									{chat.message}
								</p>
							</Fragment>
						)}
					</div>
				</div>
			))}
			<div ref={chatEndRef} />
		</div>
	);
};

export default Chat;
