import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { hubSegmentGenerateMetadata, BLOG_HUB_PATH, BLOG_HUB_SEO } from '@/lib/site';
import { blogHubLd } from '@/lib/structured';

const PAGE_ID = 'blog-hub' satisfies SitePageId;

export default function BlogHubRoute() {
	return (
		<>
			<JsonLd data={blogHubLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(BLOG_HUB_SEO, BLOG_HUB_PATH);
}
