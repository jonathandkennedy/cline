import type { Metadata, Viewport } from 'next';
import type { MetadataRoute } from 'next';
import appShellTable from '@/data/settings/frame.json';
import hubHeroesTable from '@/data/pages/heroes.json';
import { BRAND } from './tables/config';
import { formatBrandTemplate } from './brandtemplate';

type AppShellTable = typeof appShellTable;

export const APP_SHELL = appShellTable as AppShellTable;

function interpolateDeep<T>(value: T): T {
	if (typeof value === 'string') {
		return formatBrandTemplate(value) as T;
	}
	if (Array.isArray(value)) {
		return value.map((item) => interpolateDeep(item)) as T;
	}
	if (value && typeof value === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value)) {
			out[k] = interpolateDeep(v);
		}
		return out as T;
	}
	return value;
}

export function siteMetadata(): Metadata {
	const meta = interpolateDeep(APP_SHELL.metadata);
	return {
		metadataBase: new URL(meta.metadataBase),
		title: meta.title,
		description: meta.description,
		applicationName: meta.applicationName,
		authors: meta.authors,
		keywords: meta.keywords,
		alternates: { canonical: '/' },
		openGraph: {
			...meta.openGraph,
			images: [
				{
					url: meta.openGraph.image.url,
					width: meta.openGraph.image.width,
					height: meta.openGraph.image.height,
					alt: meta.openGraph.image.alt,
				},
			],
		},
		twitter: meta.twitter,
		robots: meta.robots,
	};
}

export function siteViewport(): Viewport {
	const viewport = APP_SHELL.viewport as {
		themeColor: string;
		colorScheme: string;
		viewportFit?: Viewport['viewportFit'];
	};
	return {
		themeColor: viewport.themeColor,
		colorScheme: viewport.colorScheme as Viewport['colorScheme'],
		/* iPhone: paint under status bar / home indicator so chrome can fill safe areas. */
		viewportFit: viewport.viewportFit ?? 'cover',
	};
}

export function siteManifest(): MetadataRoute.Manifest {
	const m = interpolateDeep(APP_SHELL.manifest);
	return {
		name: m.name,
		short_name: m.short_name,
		description: m.description,
		id: `${BRAND.toolsUrl}/`,
		start_url: '/',
		display: 'standalone',
		background_color: '#0a0a0b',
		theme_color: '#0a0a0b',
		icons: [
			{
				src: '/icon.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any',
			},
		],
	};
}

export function homePageTitle(): string {
	return formatBrandTemplate(hubHeroesTable.HOME_SEO.seoTitle);
}

export function homePageDescription(): string {
	return hubHeroesTable.HOME_SEO.seoDescription;
}

export function webSiteLdName(): string {
	return formatBrandTemplate(APP_SHELL.metadata.applicationName);
}
