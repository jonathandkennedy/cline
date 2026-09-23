import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SITE_URL } from '@/lib/cms';

/**
 * Production advertises its sitemap. Any other host (staging, previews) gets no sitemap so it is
 * never promoted to crawlers; those hosts are noindexed by the X-Robots-Tag header in proxy.ts,
 * which crawlers can only see if the pages are not blocked here.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
	const requestHeaders = await headers();
	const host = (requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? '')
		.split(',')[0]
		.trim()
		.toLowerCase();
	const isProduction = host === new URL(SITE_URL).host;
	return {
		rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
		...(isProduction ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
	};
}
