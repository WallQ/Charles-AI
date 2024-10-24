import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';
import { api, HydrateClient } from '@/trpc/server';

import { ScrollArea } from '@/components/ui/scroll-area';
import Chat from '@/app/(app)/_components/chat';
import RelevantDocument from '@/app/(app)/_components/relevant-document';

type ChatHistoryPageProps = {
	params: {
		id: string;
	};
};

export default async function ChatHistoryPage({
	params,
}: ChatHistoryPageProps) {
	if (!params.id) return redirect(APP_ROUTES.APP);

	void api.chat.getChatMessages.prefetch({ id: params.id });
	void api.chat.getChatDocuments.prefetch({ id: params.id });

	return (
		<HydrateClient>
			<div className='flex w-full flex-1 flex-row items-start justify-evenly'>
				<ScrollArea className='h-full w-full max-w-5xl rounded-md border'>
					<Chat id={params.id} />
				</ScrollArea>
				<RelevantDocument id={params.id} />
			</div>
		</HydrateClient>
	);
}
