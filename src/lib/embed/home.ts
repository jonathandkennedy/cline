import { BRAND } from '@/lib/cms';
import { isToolsHostUrl, parseEmbedSiteHome } from '@/lib/lookup';

function withTrailingSlash(origin: string): string {
	return origin.endsWith('/') ? origin : `${origin}/`;
}

/** Resolve the marketing / WP site home for an embedded widget. */
export function resolveClientEmbedSiteHome(search: URLSearchParams): string {
	const fromQuery = parseEmbedSiteHome(search);
	if (fromQuery) return fromQuery;

	if (typeof window === 'undefined') {
		return withTrailingSlash(BRAND.site.replace(/\/$/, ''));
	}

	const ancestors = window.location.ancestorOrigins;
	if (ancestors && ancestors.length > 0) {
		const parent = ancestors.item(0);
		if (parent && !isToolsHostUrl(parent)) return withTrailingSlash(parent);
	}

	if (window.parent !== window && document.referrer) {
		try {
			const ref = new URL(document.referrer);
			if (!isToolsHostUrl(ref.href)) return withTrailingSlash(ref.origin);
		} catch {
			/* ignore invalid referrer */
		}
	}

	return withTrailingSlash(BRAND.site.replace(/\/$/, ''));
}
