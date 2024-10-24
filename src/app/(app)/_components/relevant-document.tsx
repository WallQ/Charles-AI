'use client';

import Link from 'next/link';
import { api } from '@/trpc/react';
import { BookText } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import Typography from '@/components/typography';

type RelevantDocumentProps = {
	id: string;
};

const RelevantDocument: React.FunctionComponent<RelevantDocumentProps> = ({
	id,
}): React.ReactNode => {
	const [chatDocuments] = api.chat.getChatDocuments.useSuspenseQuery({
		id,
	});

	return (
		<div className='flex w-full max-w-md flex-col'>
			<Typography variant='h5'>Relevant documents</Typography>
			{chatDocuments && chatDocuments.relevant_docs.length > 0 ? (
				<div className='flex flex-col items-start'>
					{chatDocuments.relevant_docs.map((document) => (
						<Link
							key={document.Id}
							href={document.Link}
							target='_blank'
							rel='external'
							className={`${buttonVariants({ variant: 'link' })} flex flex-row text-wrap px-0 py-0`}>
							<BookText className='mr-2 size-4' />
							{document.Title}
						</Link>
					))}
				</div>
			) : (
				<Typography variant='p'>
					No relevant documents found!
				</Typography>
			)}
		</div>
	);
};

export default RelevantDocument;
