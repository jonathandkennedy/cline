import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { getBlogBySlug } from '@/lib/cms/content/records';
import { EditorialRecordProvider } from '@/lib/cms/content/current';
import {
	blogDetailPath,
	listBlogSlugs,
	slugSegmentGenerateMetadata,
	slugSegmentStaticParams,
} from '@/lib/site';
import { blogDetailLd } from '@/lib/structured';

const PAGE_ID = 'blog-detail' satisfies SitePageId;

export const dynamicParams = false;

export function generateStaticParams() {
	return slugSegmentStaticParams(listBlogSlugs);
}

export function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	return slugSegmentGenerateMetadata(
		{ params },
		{
			resolve: getBlogBySlug,
			canonicalPath: blogDetailPath,
			notFoundTitle: 'Article not found',
		},
	);
}

export default async function BlogDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const record = getBlogBySlug(slug);
	if (!record) notFound();
	const ld = blogDetailLd(slug);
	return (
		<>
			{ld ? <JsonLd data={ld} /> : null}
			<EditorialRecordProvider record={record}>
				<SiteCatalogPage pageId={PAGE_ID} />
			</EditorialRecordProvider>
		</>
	);
}
