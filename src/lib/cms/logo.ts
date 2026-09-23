import type { HeaderLogoChrome } from '@/kit/shared';
import {
	BRAND,
	BRAND_LOGO,
	HEADER_LOGO_ARIA_LABEL,
	HEADER_LOGO_CHROME_TEXT_ITEMS,
	HEADER_LOGO_HOME_HREF,
	HEADER_LOGO_INNER_BY_MODE,
	HEADER_LOGO_MARK,
	HEADER_LOGO_ROOT_BY_MODE,
	HEADER_LOGO_TEXT_COLUMN_BY_MODE,
	HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE,
	LAYOUT_CHROME,
} from '@/lib/cms';

export function siteHeaderLogoChrome(): HeaderLogoChrome {
	return {
		logoBrand: {
			paths: BRAND_LOGO.paths,
			aspectNoTagline: BRAND_LOGO.aspectNoTagline,
			aspectWithTagline: BRAND_LOGO.aspectWithTagline,
			markAlt: BRAND.name,
			taglineAlt: BRAND.legalName,
		},
		headerLogo: {
			ariaLabel: HEADER_LOGO_ARIA_LABEL,
			homeHref: HEADER_LOGO_HOME_HREF,
			defaultChrome: {
				title: LAYOUT_CHROME.defaultTitle,
				subtitle: LAYOUT_CHROME.defaultSubtitle,
			},
			mark: HEADER_LOGO_MARK,
			chromeTextItems: HEADER_LOGO_CHROME_TEXT_ITEMS,
			titleMaxWidthByMode: HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE,
			textColumnByMode: HEADER_LOGO_TEXT_COLUMN_BY_MODE,
			rootByMode: HEADER_LOGO_ROOT_BY_MODE,
			innerByMode: HEADER_LOGO_INNER_BY_MODE,
		},
	};
}
