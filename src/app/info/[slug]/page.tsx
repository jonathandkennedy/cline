import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	getEditorialPageBySlug,
	infoDetailPath,
	listEditorialPageSlugs,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { infoDetailLd } from '@/lib/structured';

const PAGE_ID = 'info-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listEditorialPageSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getEditorialPageBySlug,
			canonicalPath: infoDetailPath,
			notFoundTitle: 'Guide not found',
		},
	);
}

export default async function InfoDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	if (!getEditorialPageBySlug(slug)) notFound();
	const ld = infoDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
