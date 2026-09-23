import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	getGuidebookChapterBySlug,
	guidebookChapterPath,
	listGuidebookChapterSlugs,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { guidebookChapterLd } from '@/lib/structured';

const PAGE_ID = 'guidebook-chapter' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listGuidebookChapterSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getGuidebookChapterBySlug,
			canonicalPath: guidebookChapterPath,
			notFoundTitle: 'Chapter not found',
		},
	);
}

export default async function GuidebookChapterRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!getGuidebookChapterBySlug(slug)) notFound();
	const ld = guidebookChapterLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
