import wpRedirects from '@/data/settings/redirects.json';
import blogLegacyRedirects from '@/data/settings/legacy.json';

/**
 * Legacy-URL resolution for the WordPress → Next.js migration.
 *
 * Every old address must reach its new home in exactly one 301 hop, so trailing-slash
 * stripping, lowercasing and the legacy map are folded into a single lookup here and applied
 * by `src/proxy.ts` (Next's built-in trailing-slash redirect is disabled in next.config.ts).
 */

type RedirectRule = { source: string; destination: string };

type LegacyMapping = {
	slug: string;
	legacyPaths: string[];
	destination: string;
};

/** Team members who exist on the old site but have no standalone bio page here. */
const TEAM_ANCHOR_REDIRECTS: Record<string, string> = {
	'/team/eric-natensted': '/team#eric-natenstedt',
	'/team/eric-natenstedt': '/team#eric-natenstedt',
	'/team/diana-de-la-cruz': '/team#diana-de-la-cruz',
	'/team/ashley-yaddgo': '/team#ashley-yaddgo',
	'/team/john-evans': '/team#john-evans',
};

const DATED_POST = /^\/\d{4}\/\d{2}(?:\/\d{2})?\/([^/]+)$/;
const RETIRED_ARCHIVE = /^\/(?:tag|category|author)(?:\/.*)?$/;
const HAS_EXTENSION = /\/[^/]*\.[a-z0-9]{2,5}$/i;

function normalizePath(pathname: string): string {
	const trimmed = pathname.trim();
	const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
	return withSlash === '/' ? '/' : withSlash.replace(/\/+$/, '') || '/';
}

function buildExactMap(): Map<string, string> {
	const map = new Map<string, string>();
	const add = (source: string, destination: string) => {
		const from = normalizePath(source).toLowerCase();
		const to = destination.includes('#') ? destination : normalizePath(destination);
		if (from !== to && !map.has(from)) map.set(from, to);
	};

	for (const mapping of (blogLegacyRedirects as { mappings: LegacyMapping[] }).mappings) {
		for (const legacyPath of mapping.legacyPaths) add(legacyPath, mapping.destination);
		add(`/blog/${mapping.slug}`, mapping.destination);
		add(`/${mapping.slug}`, mapping.destination);
	}
	for (const rule of wpRedirects.WP_REDIRECTS as RedirectRule[]) {
		if (rule.source.includes(':')) continue; // pattern rules are handled in code below
		add(rule.source, rule.destination);
	}
	for (const [source, destination] of Object.entries(TEAM_ANCHOR_REDIRECTS)) add(source, destination);

	// Collapse any chains so every source resolves to its final destination in one hop.
	for (const [source, destination] of map) {
		let final = destination;
		for (let i = 0; i < 5 && map.has(final); i++) final = map.get(final)!;
		map.set(source, final);
	}
	return map;
}

const EXACT = buildExactMap();

function lookup(path: string): string | null {
	const exact = EXACT.get(path);
	if (exact) return exact;
	const dated = path.match(DATED_POST);
	if (dated) {
		const blogPath = `/blog/${dated[1]}`;
		return EXACT.get(blogPath) ?? blogPath;
	}
	if (RETIRED_ARCHIVE.test(path)) return '/blog';
	return null;
}

/**
 * Returns the single-hop destination (path, optionally with `#hash`) for a request path, or
 * null when the path should be served as-is.
 */
export function resolveRedirect(pathname: string): string | null {
	if (pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api/')) {
		return null;
	}
	if (HAS_EXTENSION.test(pathname)) return null;

	let decoded = pathname;
	try {
		decoded = decodeURIComponent(pathname);
	} catch {
		// keep the raw path
	}
	const normalized = normalizePath(decoded).toLowerCase();
	const destination = lookup(normalized) ?? normalized;
	return destination === decoded ? null : destination;
}
