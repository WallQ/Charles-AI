import { models } from '@/data/models';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ModelStore = {
	selectedModel: string;
	setSelectedModel: (selectedModel: string) => void;
};

export const useModelStore = create<ModelStore>()(
	persist(
		(set) => ({
			selectedModel: models[0].value,
			setSelectedModel: (model) => set({ selectedModel: model }),
		}),
		{
			name: 'model-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
