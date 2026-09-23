import type { VehicleType } from '@/lib/cms/types';
import { BRAND, EMBED_QUERY_ITEMS, VEHICLE_TYPES } from '@/lib/cms/tables';

type SearchParamsLike = Pick<URLSearchParams, 'get' | 'has'>;

export function parseVehicleTypeParam(raw: string | null | undefined): VehicleType | undefined {
	if (!raw) return undefined;
	return (VEHICLE_TYPES as readonly string[]).includes(raw) ? (raw as VehicleType) : undefined;
}

export function isEmbedAppPath(pathname: string | null | undefined): boolean {
	if (!pathname) return false;
	return pathname === '/embed' || pathname.startsWith('/embed/');
}

export function isToolStandalone(params: SearchParamsLike): boolean {
	if (!params.has('standalone')) return false;
	const value = params.get('standalone');
	if (value === null || value === '') return true;
	const normalized = value.toLowerCase();
	if (normalized === '0' || normalized === 'false') return false;
	return true;
}

export function isLegacyToolEmbed(params: SearchParamsLike): boolean {
	return EMBED_QUERY_ITEMS.some((item) => params.get(item.param) === item.value);
}

export function isToolDeepLinked(params: SearchParamsLike): boolean {
	if (params.has('start')) {
		const value = params.get('start');
		if (value === null || value === '' || value === '1' || value === 'true') return true;
		if (value === '0' || value === 'false') return false;
		return true;
	}
	return (
		params.has('attempts') ||
		params.has('days') ||
		params.has('type') ||
		params.has('price') ||
		params.has('months') ||
		params.has('miles')
	);
}

export type EmbedChromeVariant = 'full' | 'no-header' | 'no-bg' | 'card';

const EMBED_CHROME_VARIANTS: readonly EmbedChromeVariant[] = ['full', 'no-header', 'no-bg', 'card'];

export function parseEmbedChrome(params: SearchParamsLike): EmbedChromeVariant {
	const raw = params.get('chrome')?.trim().toLowerCase();
	if (raw && (EMBED_CHROME_VARIANTS as readonly string[]).includes(raw)) {
		return raw as EmbedChromeVariant;
	}
	return 'full';
}

export function embedChromeFlags(variant: EmbedChromeVariant) {
	return {
		hideHeader: variant === 'no-header' || variant === 'card',
		hideBg: variant === 'no-bg' || variant === 'card',
		cardOnly: variant === 'card',
	};
}

export type ToolQueryMode = {
	embed: boolean;
	standalone: boolean;
	deepLinked: boolean;
	chrome: EmbedChromeVariant;
};

export function toolQueryModeFromSearchParams(
	raw: Record<string, string | string[] | undefined> | undefined,
): ToolQueryMode {
	const params = new URLSearchParams();
	if (raw) {
		for (const [key, value] of Object.entries(raw)) {
			if (value === undefined) continue;
			if (Array.isArray(value)) {
				for (const v of value) params.append(key, v);
			} else {
				params.set(key, value);
			}
		}
	}
	return {
		embed: isToolEmbedMode(params),
		standalone: isToolStandalone(params),
		deepLinked: isToolDeepLinked(params),
		chrome: parseEmbedChrome(params),
	};
}

export function isToolEmbedMode(params: SearchParamsLike): boolean {
	return isToolStandalone(params) || isLegacyToolEmbed(params);
}
export function withPreservedToolQuery(href: string, current: SearchParamsLike): string {
	const qIndex = href.indexOf('?');
	const path = qIndex === -1 ? href : href.slice(0, qIndex);
	const target = new URLSearchParams(qIndex === -1 ? '' : href.slice(qIndex + 1));

	const chrome = current.get('chrome')?.trim();
	if (chrome) target.set('chrome', chrome);

	if (isToolStandalone(current)) {
		const standalone = current.get('standalone');
		target.set('standalone', standalone === null || standalone === '' ? '' : standalone);
	} else if (isLegacyToolEmbed(current)) {
		for (const item of EMBED_QUERY_ITEMS) {
			if (current.get(item.param) === item.value) {
				target.set(item.param, item.value);
			}
		}
	}

	const qs = target.toString();
	return qs ? `${path}?${qs}` : path;
}

const TOOL_PATH_SLUG = /^\/tool\/([^/?#]+)/;

function originOf(url: string): string {
	try {
		return new URL(url).origin;
	} catch {
		return '';
	}
}

export function isToolsHostUrl(value: string): boolean {
	const raw = value.trim();
	if (!raw) return false;
	const origin = originOf(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
	if (!origin) return false;
	const tools = originOf(BRAND.toolsUrl);
	if (tools && origin === tools) return true;
	if (typeof window !== 'undefined' && origin === window.location.origin) {
		return true;
	}
	return false;
}

/** Plugin `home` query — WordPress site home, never the tools host. */
export function parseEmbedSiteHome(params: SearchParamsLike): string {
	const raw = params.get('home')?.trim();
	if (!raw) return '';
	try {
		const url = new URL(raw);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
		if (isToolsHostUrl(url.href)) return '';
		return `${url.origin}/`;
	} catch {
		return '';
	}
}

export function embedMarketingToolUrl(siteHome: string, slug: string): string {
	return `${siteHome.replace(/\/+$/, '')}/${slug}/`;
}

export function embedAwareToolHref(href: string, current: SearchParamsLike): string {
	const home = parseEmbedSiteHome(current);
	if (!home) return withPreservedToolQuery(href, current);
	const slug = href.match(TOOL_PATH_SLUG)?.[1];
	if (slug) return embedMarketingToolUrl(home, slug);
	return home;
}

export function embedAwareSiteUrl(
	path: string,
	campaign: string,
	current: SearchParamsLike,
): string {
	const home = parseEmbedSiteHome(current);
	const base = (home || BRAND.site).replace(/\/$/, '');
	const normalized = path.startsWith('/') ? path : `/${path}`;
	const sep = normalized.includes('?') ? '&' : '?';
	return `${base}${normalized}${sep}utm_source=tools&utm_medium=referral&utm_campaign=${campaign}`;
}

export function isMailOrTelHref(href: string): boolean {
	return href.startsWith('mailto:') || href.startsWith('tel:');
}

export function isOffSiteHref(href: string): boolean {
	return href.startsWith('http://') || href.startsWith('https://') || isMailOrTelHref(href);
}
