'use client';

import { useSettingsStore } from '@/stores/settings';
import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const SettingsButton: React.FunctionComponent = (): React.ReactNode => {
	const { selectedSettings, setSelectedSettings } = useSettingsStore();

	return (
		<Popover>
			<TooltipProvider>
				<PopoverTrigger asChild>
					<div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Settings className='size-4' />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Settings</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</PopoverTrigger>
			</TooltipProvider>
			<PopoverContent>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Settings</h4>
						<p className='text-sm text-muted-foreground'>
							Adjust the settings for the chat.
						</p>
					</div>
					<div className='grid gap-2'>
						<div className='grid grid-cols-3 items-center gap-4'>
							<Label htmlFor='width'>Temperature</Label>
							<Input
								type='number'
								min={0}
								max={1}
								step={0.05}
								defaultValue={selectedSettings}
								onChange={(e) =>
									setSelectedSettings(e.target.value)
								}
								className='col-span-2'
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default SettingsButton;
