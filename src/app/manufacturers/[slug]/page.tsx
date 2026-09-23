import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	getManufacturerPageBySlug,
	listManufacturerPageSlugs,
	manufacturerDetailPath,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { manufacturerDetailLd } from '@/lib/structured';

const PAGE_ID = 'manufacturer-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listManufacturerPageSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getManufacturerPageBySlug,
			canonicalPath: manufacturerDetailPath,
			notFoundTitle: 'Manufacturer not found',
		},
	);
}

export default async function ManufacturerDetailRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const page = getManufacturerPageBySlug(slug);
	if (!page) notFound();

	const ld = manufacturerDetailLd(slug);

	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
