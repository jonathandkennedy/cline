import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/cms';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/embed/', '/api/'],
		},
		sitemap: `${BRAND.toolsUrl}/sitemap.xml`,
		host: BRAND.toolsUrl,
	};
}
