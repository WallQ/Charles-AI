import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';

export default function AuthPage() {
	redirect(APP_ROUTES.AUTH.SIGN_IN);
}
