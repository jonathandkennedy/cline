import blogLegacyRedirects from '../content/data/settings/legacy.json';

export type RedirectRule = {
	source: string;
	destination: string;
	permanent: boolean;
};

type LegacyMapping = {
	slug: string;
	legacyPaths: string[];
	destination: string;
	rationale: string;
};

function normalizePath(pathname: string): string {
	const trimmed = pathname.trim();
	if (!trimmed.startsWith('/')) return `/${trimmed.replace(/\/+$/, '')}`;
	if (trimmed === '/') return '/';
	return trimmed.replace(/\/+$/, '');
}

export function expandBlogLegacyRedirects(
	config: { mappings: LegacyMapping[] } = blogLegacyRedirects,
): RedirectRule[] {
	const rules: RedirectRule[] = [];
	const seen = new Set<string>();
	for (const mapping of config.mappings) {
		const destination = normalizePath(mapping.destination);
		const sources = new Set<string>();
		for (const legacyPath of mapping.legacyPaths) {
			sources.add(normalizePath(legacyPath));
		}
		sources.add(`/blog/${mapping.slug}`);
		sources.add(`/${mapping.slug}`);
		for (const source of sources) {
			if (seen.has(source) || source === destination) continue;
			seen.add(source);
			rules.push({ source, destination, permanent: true });
		}
	}
	return rules;
}

export function mergeWpAndLegacyRedirects(
	wpRedirects: RedirectRule[],
	legacyRedirects: RedirectRule[] = expandBlogLegacyRedirects(),
): RedirectRule[] {
	const seen = new Set(legacyRedirects.map((rule) => rule.source));
	return [...legacyRedirects, ...wpRedirects.filter((rule) => !seen.has(rule.source))];
}
