import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SettingsStore = {
	selectedSettings: string;
	setSelectedSettings: (settings: string) => void;
};

export const useSettingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			selectedSettings: '0',
			setSelectedSettings: (settings) =>
				set({ selectedSettings: settings }),
		}),
		{
			name: 'settings-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
