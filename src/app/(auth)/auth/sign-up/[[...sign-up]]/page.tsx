import Link from 'next/link';
import { type Metadata } from 'next/types';
import { APP_ROUTES } from '@/routes/app';
import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import SignUpForm from '@/app/(auth)/_components/sign-up-form';

export const metadata: Metadata = {
	title: 'Sign Up | Charles-AI',
};

export default function SignUpPage() {
	return (
		<div className='relative flex flex-1 flex-col items-center justify-center'>
			<div className='absolute left-0 top-0 m-8 flex lg:hidden'>
				<Link
					href={APP_ROUTES.HOME}
					className={buttonVariants({ variant: 'link' })}>
					<ArrowLeft className='mr-2 size-4' />
					Go back
				</Link>
			</div>
			<SignUpForm />
		</div>
	);
}
