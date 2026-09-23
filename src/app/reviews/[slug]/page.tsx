import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	getReviewBySlug,
	listReviewSlugs,
	reviewDetailPath,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { reviewDetailLd } from '@/lib/structured';

const PAGE_ID = 'review-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listReviewSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getReviewBySlug,
			canonicalPath: reviewDetailPath,
			notFoundTitle: 'Review not found',
			// One quote per page is thin; the /reviews hub carries every quote and is indexed.
			noindex: true,
		},
	);
}

export default async function ReviewDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	if (!getReviewBySlug(slug)) notFound();
	const ld = reviewDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
