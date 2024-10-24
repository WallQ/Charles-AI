import { Fragment } from 'react';
import { Loader2 } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteAlertDialogProps = {
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSubmit: () => void;
	isPending: boolean;
};

const DeleteAlertDialog: React.FunctionComponent<DeleteAlertDialogProps> = ({
	open,
	onOpenChange,
	onSubmit,
	isPending,
}): React.ReactNode => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your chat and all of its messages. This action is
						irreversible.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={isPending} onClick={onSubmit}>
						{isPending ? (
							<Fragment>
								<Loader2 className='mr-2 size-4 animate-spin' />
								Deleting...
							</Fragment>
						) : (
							<Fragment>Delete</Fragment>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAlertDialog;
