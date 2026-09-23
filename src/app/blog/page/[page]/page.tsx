import type { Metadata } from 'next';
import { JsonLd } from '@/components';
import type { SitePageId } from '@/lib/cms/catalog';
import { BLOG_HUB_GRID, BLOG_POSTS } from '@/lib/cms';
import { BLOG_HUB_PATH, BLOG_HUB_SEO, hubSegmentGenerateMetadata } from '@/lib/site';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { blogHubLd } from '@/lib/structured';

const PAGE_ID = 'blog-hub' satisfies SitePageId;

/** Only real archive pages exist; /blog/page/1, out-of-range and non-numeric pages 404. */
export const dynamicParams = false;

export function generateStaticParams() {
	const totalPages = Math.ceil(BLOG_POSTS.length / BLOG_HUB_GRID.pageSize);
	return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
		page: String(index + 2),
	}));
}

type BlogHubPaginatedRouteProps = {
	params: Promise<{ page: string }>;
};

export default function BlogHubPaginatedRoute() {
	return (
		<>
			<JsonLd data={blogHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export async function generateMetadata({ params }: BlogHubPaginatedRouteProps): Promise<Metadata> {
	const { page } = await params;
	const pageNumber = Number(page);
	const suffix = Number.isFinite(pageNumber) && pageNumber > 1 ? `, Page ${pageNumber}` : '';
	return hubSegmentGenerateMetadata(
		{
			seoTitle: BLOG_HUB_SEO.seoTitle.replace(' | ', `${suffix} | `),
			seoDescription: BLOG_HUB_SEO.seoDescription,
		},
		`${BLOG_HUB_PATH}/page/${page}`,
	);
}
