import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/routes/app';

export default function ChatPage() {
	redirect(APP_ROUTES.APP);
}
