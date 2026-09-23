import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqTopicPage, faqTopicDescription, faqTopicTitle } from '@/components/faq/topic';
import { faqCategoryIdForTopicSlug, faqTopicPath, listFaqTopicSlugs } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';

/**
 * Six topical FAQ pages replace the 24 single-answer pages; the old /faq/<question> URLs
 * 301 to /faq/<topic>#<question> (see src/lib/redirects.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
	return listFaqTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const categoryId = faqCategoryIdForTopicSlug(slug);
	if (!categoryId) return {};
	return pageMetadata({
		title: `${faqTopicTitle(categoryId).replace(': California Lemon Law FAQ', '')} | Lemon Law FAQ | CLINE APC`,
		description: faqTopicDescription(categoryId),
		canonical: faqTopicPath(categoryId),
	});
}

export default async function FaqTopicRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const categoryId = faqCategoryIdForTopicSlug(slug);
	if (!categoryId) notFound();
	return <FaqTopicPage categoryId={categoryId} />;
}
