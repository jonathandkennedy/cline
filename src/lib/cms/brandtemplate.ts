import { interpolateSiteTemplate } from '@/kit/catalog';
import { BRAND } from './tables/config';

const BRAND_TEMPLATE_VALUES: Record<string, string> = {
	'brand.name': BRAND.name,
	'brand.legalName': BRAND.legalName,
	'brand.phoneDisplay': BRAND.phoneDisplay,
	'brand.email': BRAND.email,
	'brand.toolsUrl': BRAND.toolsUrl,
	'brand.site': BRAND.site,
};

export function siteTemplateTokens(): Record<string, string> {
	return BRAND_TEMPLATE_VALUES;
}

export function formatBrandTemplate(template: string, extra?: Record<string, string>): string {
	return interpolateSiteTemplate(template, BRAND_TEMPLATE_VALUES, extra);
}

export function callBrandAriaLabel(
	callPrefix: string,
	atPhone: string,
	phoneDisplay: string = BRAND.phoneDisplay,
): string {
	return `${callPrefix} ${BRAND.name} ${atPhone} ${phoneDisplay}`;
}
