import { type Metadata } from 'next';
import Link from 'next/link';
import { APP_ROUTES } from '@/routes/app';
import { ArrowLeft, BrainCircuit } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Authentication | Charles-AI',
};

export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className='flex h-screen w-full flex-row'>
			<div className='relative hidden w-1/2 flex-col items-center justify-center bg-foreground lg:flex'>
				<div className='absolute left-0 top-0 m-8'>
					<Link
						href={APP_ROUTES.HOME}
						className={`${buttonVariants({ variant: 'link' })} text-secondary`}>
						<ArrowLeft className='mr-2 size-4' />
						Go back
					</Link>
				</div>
				<Link href={APP_ROUTES.HOME}>
					<BrainCircuit className='size-48 text-secondary' />
				</Link>
			</div>
			{children}
		</main>
	);
}
