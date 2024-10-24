import { NextResponse } from 'next/server';
import { APP_ROUTES } from '@/routes/app';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/app(.*)']);

export default clerkMiddleware(
	(auth, req) => {
		if (isProtectedRoute(req)) auth().protect();

		if (
			(req.nextUrl.pathname.startsWith(APP_ROUTES.AUTH.SIGN_IN) ||
				req.nextUrl.pathname.startsWith(APP_ROUTES.AUTH.SIGN_UP)) &&
			auth().userId &&
			!isProtectedRoute(req)
		)
			return NextResponse.redirect(new URL(APP_ROUTES.APP, req.url));
	},
	// { debug: process.env.NODE_ENV === 'development' },
);

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};
