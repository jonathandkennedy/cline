import type { Metadata } from 'next';
import { TopicsIndexPage } from '@/components/blog/topics';
import { pageMetadata } from '@/lib/seo';
import { BLOG_TOPICS_PATH } from '@/lib/topics';

export const metadata: Metadata = pageMetadata({
	title: 'Lemon Law Articles by Topic & Manufacturer | CLINE APC',
	description:
		'Browse CLINE APC lemon law articles by topic (buybacks, used cars, recalls, leases, EVs) and by manufacturer, from Ford and Tesla to Toyota and BMW.',
	canonical: BLOG_TOPICS_PATH,
});

export default function BlogTopicsRoute() {
	return <TopicsIndexPage />;
}
