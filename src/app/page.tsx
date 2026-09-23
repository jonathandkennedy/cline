import type { Metadata } from 'next';
import type { SitePageId } from '@/lib/cms/catalog';
import { JsonLd } from '@/components';
import { SiteCatalogPage } from '@/lib/site/catalog';
import { homeLd } from '@/lib/structured';
import { hubSegmentGenerateMetadata, HOME_SEO } from '@/lib/site';

const PAGE_ID = 'home' satisfies SitePageId;

export default function Home() {
	return (
		<>
			<JsonLd data={homeLd()} />
			<SiteCatalogPage pageId={PAGE_ID} />
		</>
	);
}

export function generateMetadata(): Promise<Metadata> {
	return hubSegmentGenerateMetadata(HOME_SEO, '/', PAGE_ID);
}
