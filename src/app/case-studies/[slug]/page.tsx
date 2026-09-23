import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import {
	caseStudyDetailPath,
	getCaseStudyBySlug,
	listCaseStudySlugs,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { caseStudyDetailLd } from '@/lib/structured';

const PAGE_ID = 'case-study-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listCaseStudySlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getCaseStudyBySlug,
			canonicalPath: caseStudyDetailPath,
			notFoundTitle: 'Case study not found',
		},
	);
}

export default async function CaseStudyDetailRoute({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!getCaseStudyBySlug(slug)) notFound();
	const ld = caseStudyDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}
