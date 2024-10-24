import ModelSelector from '@/app/(app)/_components/model-selector';
import UserMenu from '@/app/(app)/_components/user-menu';

const TopBar: React.FunctionComponent = (): React.ReactNode => {
	return (
		<header className='flex w-full flex-row items-center justify-between border-b border-border p-4'>
			<ModelSelector />
			<UserMenu />
		</header>
	);
};

export default TopBar;
