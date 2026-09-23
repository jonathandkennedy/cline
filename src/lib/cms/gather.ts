import type { SiteBreadcrumbItem } from './types';

export const SITE_HOME_BREADCRUMB: SiteBreadcrumbItem = {
	label: 'Home',
	href: '/',
};

export function buildHubBreadcrumbs(hubLabel: string, hubHref: string): SiteBreadcrumbItem[] {
	return [SITE_HOME_BREADCRUMB, { label: hubLabel, href: hubHref }];
}

export function buildDetailBreadcrumbs(
	hubLabel: string,
	hubHref: string,
	detailLabel: string,
	detailHref: string,
): SiteBreadcrumbItem[] {
	return [
		SITE_HOME_BREADCRUMB,
		{ label: hubLabel, href: hubHref },
		{ label: detailLabel, href: detailHref },
	];
}

export function resourceDetailPath(hubHref: string, slug: string): string {
	const base = hubHref.replace(/\/+$/, '');
	const segment = slug.replace(/^\/+/, '');
	return `${base}/${segment}`;
}

export function indexBySlug<T extends { slug: string }>(
	items: readonly T[],
): Readonly<Record<string, T>> {
	return Object.fromEntries(items.map((entry) => [entry.slug, entry])) as Readonly<
		Record<string, T>
	>;
}

export function defineSlugCollection<T extends { slug: string }>(config: {
	items: readonly T[];
	hubLabel: string;
	hubHref: string;
	detailPath: (slug: string) => string;
	detailLabel: (entry: T) => string;
}) {
	const bySlug = indexBySlug(config.items);

	return {
		listSlugs: () => config.items.map((item) => item.slug),
		getBySlug: (slug: string): T | undefined => bySlug[slug],
		buildHubBreadcrumbs: () => buildHubBreadcrumbs(config.hubLabel, config.hubHref),
		buildDetailBreadcrumbs: (slug: string) => {
			const entry = bySlug[slug];
			if (!entry) {
				return buildHubBreadcrumbs(config.hubLabel, config.hubHref);
			}
			return buildDetailBreadcrumbs(
				config.hubLabel,
				config.hubHref,
				config.detailLabel(entry),
				config.detailPath(slug),
			);
		},
	};
}
