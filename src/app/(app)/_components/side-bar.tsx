import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { api, HydrateClient } from '@/trpc/server';
import { Menu, SquarePen } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import ChatHistory from '@/app/(app)/_components/chat-history';
import SettingsButton from '@/app/(app)/_components/settings-button';

const SideBar: React.FunctionComponent = (): React.ReactNode => {
	void api.chat.getChats.prefetch();

	return (
		<HydrateClient>
			<div className='flex h-full min-h-0 w-64 flex-shrink-0 flex-col gap-y-4 bg-primary p-4 text-primary-foreground'>
				<div className='flex flex-row items-center justify-between'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Menu className='size-4' />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Toggle menu</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={APP_ROUTES.APP}
									className={buttonVariants({
										variant: 'ghost',
										size: 'icon',
									})}>
									<SquarePen className='size-4' />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>New chat</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<ChatHistory />
				<SettingsButton />
			</div>
		</HydrateClient>
	);
};

export default SideBar;
