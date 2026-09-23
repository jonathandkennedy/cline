import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopicPage } from '@/components/blog/topics';
import { pageMetadata } from '@/lib/seo';
import { BLOG_TOPICS, blogTopicPath, getBlogTopic } from '@/lib/topics';

export const dynamicParams = false;

export function generateStaticParams() {
	return BLOG_TOPICS.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const topic = getBlogTopic(slug);
	if (!topic) return {};
	const title =
		topic.kind === 'brand'
			? `${topic.label} Lemon Law Articles | CLINE APC`
			: `${topic.label}: Lemon Law Articles | CLINE APC`;
	return pageMetadata({
		title,
		description: `${topic.description} ${topic.posts.length} articles from the CLINE APC lemon law blog.`,
		canonical: blogTopicPath(topic.slug),
	});
}

export default async function BlogTopicRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const topic = getBlogTopic(slug);
	if (!topic) notFound();
	return <TopicPage topic={topic} />;
}
