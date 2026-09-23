import {
	BRAND_LOGO,
	type HEADER_LOGO_CHROME_TEXT_ITEMS,
	HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE,
} from './tables';
import type { BrandLogoVariant, HeaderLogoMode } from './types';

export function brandLogoSrc(variant: BrandLogoVariant, tagline: boolean): string {
	if (tagline) {
		const taglineKey = {
			light: 'lightTagline',
			primary: 'primaryTagline',
			dark: 'darkTagline',
		} as const;
		return BRAND_LOGO.paths[taglineKey[variant]];
	}
	return BRAND_LOGO.paths[variant];
}

export const HEADER_LOGO_CHROME_TEXT_CLASS: Record<
	(typeof HEADER_LOGO_CHROME_TEXT_ITEMS)[number]['key'],
	(mode: HeaderLogoMode, base: string) => string
> = {
	title: (mode, base) =>
		[base, HEADER_LOGO_TITLE_MAX_WIDTH_BY_MODE[mode]].filter(Boolean).join(' '),
	subtitle: (_mode, base) => base,
};
