import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

import { buttonVariants } from '@/components/ui/button';
import Typography from '@/components/typography';

export default function NotFoundPage() {
	return (
		<main className='mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-8 px-8 py-8 text-center'>
			<BrainCircuit className='size-48' />
			<Typography variant='h1'>
				<Balancer>
					Oops! It seems like you are lost in the confines of our app.
				</Balancer>
			</Typography>
			<Typography variant='p'>
				<Balancer>
					But don&apos;t worry, you can find plenty of other
					interesting stuff on other pages.
				</Balancer>
			</Typography>
			<Link
				href={APP_ROUTES.HOME}
				className={buttonVariants({ variant: 'default' })}>
				<ArrowLeft className='mr-2 size-4' />
				Go back
			</Link>
		</main>
	);
}
