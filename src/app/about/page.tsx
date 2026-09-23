import { permanentRedirect } from 'next/navigation';
import { THE_FIRM_PATH } from '@/lib/site';

export default function AboutRedirectPage() {
	permanentRedirect(THE_FIRM_PATH);
}
