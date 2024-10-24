export const APP_ROUTES = {
	HOME: '/',
	APP: '/app',
	CHAT: (id: string) => `/chat/${id}`,
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
	},
};
