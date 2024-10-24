import { Ellipsis, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type ChatDropdownMenuProps = {
	onRenameClick: (chatId: string, chatName: string) => void;
	onDeleteClick: (chatId: string, chatName: string) => void;
	chatId: string;
	chatName: string;
};

const ChatDropdownMenu: React.FunctionComponent<ChatDropdownMenuProps> = ({
	onRenameClick,
	onDeleteClick,
	chatId,
	chatName,
}): React.ReactNode => {
	return (
		<DropdownMenu>
			<TooltipProvider>
				<DropdownMenuTrigger asChild>
					<div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='default'
									size='icon'
									className='size-6'>
									<Ellipsis className='size-4' />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Options</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</DropdownMenuTrigger>
			</TooltipProvider>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => onRenameClick(chatId, chatName)}
					className='cursor-pointer'>
					<Pencil className='mr-2 size-4' />
					<span>Rename</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onDeleteClick(chatId, chatName)}
					className='cursor-pointer'>
					<Trash2 className='mr-2 size-4' />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ChatDropdownMenu;
