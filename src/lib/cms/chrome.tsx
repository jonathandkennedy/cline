import { isToolDeepLinked } from '@/lib/lookup';
import {
	LAYOUT_CHROME,
	LEARN_HEADER_NAV,
	LEARN_HUB_PATH,
	RESOURCE_HEADER_NAV_ITEMS,
	RESOURCE_HUB_PATH_PREFIXES,
	THE_FIRM_HEADER_NAV,
	THE_FIRM_PATH,
	TEAM_HEADER_NAV,
	TEAM_PATH,
	TOOL_HEADER_TITLES,
} from '@/lib/cms/tables/config';
import type { ToolSlug } from '@/lib/cms/types';
import { HEADER_LOGO_CHROME_TEXT_CLASS } from '@/lib/cms/mark';
import { TOOLS } from '@/lib/cms/tools';
import {
	HEADER_LOGO_ARIA_LABEL,
	HEADER_LOGO_CHROME_TEXT_ITEMS,
	HEADER_LOGO_HOME_HREF,
	HEADER_LOGO_INNER_BY_MODE,
	HEADER_LOGO_MARK,
	HEADER_LOGO_ROOT_BY_MODE,
	HEADER_LOGO_TEXT_COLUMN_BY_MODE,
} from '@/lib/cms/tables/widgets';
import { LogoMark } from '@/components/logo';
import { shortToolName, TOOL_ICONS, type ToolIconId } from '@/lib/icons';
import type { SiteLogoChrome, SiteNavChrome } from '@/kit/shared';
import { components } from '@/kit/theme';

type SearchParamsLike = Pick<URLSearchParams, 'get' | 'has'>;

export function toolSlugFromPath(pathname: string | null): ToolSlug | null {
	const match = pathname?.match(/^\/tool\/([^/?#]+)/);
	const slug = match?.[1];
	if (slug && Object.hasOwn(TOOL_HEADER_TITLES, slug)) {
		return slug as ToolSlug;
	}
	return null;
}

export function resolveHeaderChrome(
	pathname: string | null,
	params: SearchParamsLike,
): { title: string; subtitle: string } {
	const slug = toolSlugFromPath(pathname);
	if (slug && isToolDeepLinked(params)) {
		return {
			title: TOOL_HEADER_TITLES[slug],
			subtitle: LAYOUT_CHROME.siteDomain,
		};
	}
	return {
		title: LAYOUT_CHROME.defaultTitle,
		subtitle: LAYOUT_CHROME.defaultSubtitle,
	};
}

export function siteLogoChrome(): SiteLogoChrome {
	return {
		ariaLabel: HEADER_LOGO_ARIA_LABEL,
		homeHref: HEADER_LOGO_HOME_HREF,
		mark: <LogoMark height={HEADER_LOGO_MARK.height} className={HEADER_LOGO_MARK.className} />,
		textItems: HEADER_LOGO_CHROME_TEXT_ITEMS,
		textLineClassName: (key, mode, baseClass) =>
			HEADER_LOGO_CHROME_TEXT_CLASS[key](mode, baseClass),
		textColumnByMode: HEADER_LOGO_TEXT_COLUMN_BY_MODE,
		rootByMode: HEADER_LOGO_ROOT_BY_MODE,
		innerByMode: HEADER_LOGO_INNER_BY_MODE,
		defaultChrome: {
			title: LAYOUT_CHROME.defaultTitle,
			subtitle: LAYOUT_CHROME.defaultSubtitle,
		},
	};
}

export function siteNavChrome(): SiteNavChrome {
	return {
		learnNav: { href: LEARN_HUB_PATH, label: LEARN_HEADER_NAV.label },
		firmNav: { href: THE_FIRM_PATH, label: THE_FIRM_HEADER_NAV.label },
		teamNav: { href: TEAM_PATH, label: TEAM_HEADER_NAV.label },
		learnHubPath: LEARN_HUB_PATH,
		firmPath: THE_FIRM_PATH,
		teamPath: TEAM_PATH,
		resourceHubPathPrefixes: RESOURCE_HUB_PATH_PREFIXES,
		mobile: {
			tools: TOOLS.map((tool) => {
				const Icon = TOOL_ICONS[tool.icon as ToolIconId];
				return {
					slug: tool.slug,
					label: shortToolName(tool.title),
					icon: <Icon size={17} className={components.mobile.iconGold} aria-hidden />,
				};
			}),
			resources: RESOURCE_HEADER_NAV_ITEMS.map((item) => ({
				id: item.id,
				href: item.href,
				label: item.label,
			})),
		},
	};
}
