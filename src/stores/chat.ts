import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ChatStore = {
	selectedChat: string | null | undefined;
	setSelectedChat: (selectedModel: string) => void;
};

export const useChatStore = create<ChatStore>()(
	persist(
		(set) => ({
			selectedChat: null,
			setSelectedChat: (chat) => set({ selectedChat: chat }),
		}),
		{
			name: 'chat-storage',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
