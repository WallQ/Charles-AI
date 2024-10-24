import { Fragment } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RenameChatDialogProps = {
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	selectedChat: { id: string; name: string } | null;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => void;
	isPending: boolean;
};

const RenameChatDialog: React.FunctionComponent<RenameChatDialogProps> = ({
	open,
	onOpenChange,
	selectedChat,
	onInputChange,
	onSubmit,
	isPending,
}): React.ReactNode => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename chat</DialogTitle>
					<DialogDescription>
						Enter a new name for the chat.
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-row items-center gap-x-4'>
					<Label htmlFor='chat-name' className='shrink-0'>
						Chat name
					</Label>
					<Input
						id='chat-name'
						type='text'
						placeholder='Important gov stuff'
						value={selectedChat?.name}
						onChange={onInputChange}
						disabled={isPending}
					/>
				</div>
				<Button
					disabled={isPending}
					onClick={onSubmit}
					className='max-w-fit place-self-end'>
					{isPending ? (
						<Fragment>
							<Loader2 className='mr-2 size-4 animate-spin' />
							Renaming...
						</Fragment>
					) : (
						<Fragment>Rename</Fragment>
					)}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default RenameChatDialog;
