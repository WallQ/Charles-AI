const BottomBar: React.FunctionComponent = (): React.ReactNode => {
	return (
		<footer className='flex w-full flex-row items-center justify-center border-t border-border p-2'>
			<small className='text-xs text-muted-foreground'>
				Copyright &copy; {new Date().getFullYear()} Charles-AI - All
				rights reserved.
			</small>
		</footer>
	);
};

export default BottomBar;
