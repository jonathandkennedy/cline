import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { getLocationPageBySlug } from '@/lib/cms/content/records';
import { EditorialRecordProvider } from '@/lib/cms/content/current';
import {
	listLocationPageSlugs,
	locationDetailPath,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { locationDetailLd } from '@/lib/structured';

const PAGE_ID = 'location-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listLocationPageSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getLocationPageBySlug,
			canonicalPath: locationDetailPath,
			notFoundTitle: 'Location not found',
		},
	);
}

export default async function LocationDetailRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const record = getLocationPageBySlug(slug);
	if (!record) notFound();
	const ld = locationDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<EditorialRecordProvider record={record}>
				<SiteCatalogPage pageId={PAGE_ID} />
			</EditorialRecordProvider>
		</>
	);
}
