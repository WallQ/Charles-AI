'use client';

import { models } from '@/data/models';
import { useModelStore } from '@/stores/model';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const ModelSelector: React.FunctionComponent = (): React.ReactNode => {
	const { selectedModel, setSelectedModel } = useModelStore();

	return (
		<Select
			defaultValue={selectedModel}
			onValueChange={(value) => setSelectedModel(value)}>
			<SelectTrigger className='w-48'>
				<SelectValue placeholder='Select a model' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Model</SelectLabel>
					{models.map((model) => (
						<SelectItem key={model.value} value={model.value}>
							{model.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default ModelSelector;
