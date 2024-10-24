import { type Metadata } from 'next';

import BottomBar from '@/app/(app)/_components/bottom-bar';
import InputBar from '@/app/(app)/_components/input-bar';
import SideBar from '@/app/(app)/_components/side-bar';
import TopBar from '@/app/(app)/_components/top-bar';

export const metadata: Metadata = {
	title: 'App | Charles-AI',
};

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='relative flex h-screen w-full flex-1 flex-row overflow-hidden'>
			<SideBar />
			<div className='relative flex h-full w-full flex-1 flex-col items-center'>
				<TopBar />
				<main className='flex w-full flex-1 flex-col items-center justify-center p-8'>
					{children}
				</main>
				<div className='flex w-full flex-col items-center justify-center gap-y-4'>
					<InputBar />
					<BottomBar />
				</div>
			</div>
		</div>
	);
}
