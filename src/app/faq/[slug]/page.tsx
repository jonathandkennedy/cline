import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	faqDetailPath,
	getFaqBySlug,
	listFaqSlugs,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { faqDetailLd } from '@/lib/structured';

const PAGE_ID = 'faq-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listFaqSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getFaqBySlug,
			canonicalPath: faqDetailPath,
			notFoundTitle: 'FAQ not found',
		},
	);
}

export default async function FaqDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	if (!getFaqBySlug(slug)) notFound();
	const ld = faqDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
