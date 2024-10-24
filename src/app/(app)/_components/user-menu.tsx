import { APP_ROUTES } from '@/routes/app';
import { SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { LogOut, User } from 'lucide-react';

import { getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserMenu: React.FunctionComponent = async () => {
	const user = await currentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage
						src={
							user?.imageUrl ??
							`https://source.boringavatars.com/beam/128/charles-ai?colors=fafafa,f4f4f5,e4e4e7,d4d4d8,a1a1aa,71717a,52525b,3f3f46,27272a,18181b,09090b`
						}
						alt='Profile Image'
					/>
					<AvatarFallback>
						{getInitials(user?.fullName) ?? 'AI'}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-48'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer'>
						<User className='mr-2 size-4' />
						<span>Profile</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<SignOutButton redirectUrl={APP_ROUTES.HOME}>
						<button className='flex flex-1 flex-row items-center'>
							<LogOut className='mr-2 size-4' />
							<span>Log out</span>
						</button>
					</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
