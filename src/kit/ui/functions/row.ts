import { components } from '@/kit/theme';

export const BANNER_CTA_ROW = components['resource.bannerCtaRow'];

export const BANNER_CTA_ROW_DUAL = components['resource.bannerCtaRowDual'];

const BANNER_CTA_ROW_ASIDE_STACK = components['resource.bannerCtaRowAsideStack'];

const BANNER_CTA_ROW_CENTERED = components['resource.bannerCtaRowCentered'];

export function bannerCtaRowClass(mt: string) {
	return `${mt} ${BANNER_CTA_ROW}`;
}

export function bannerCtaRowDualClass(mt: string) {
	return `${mt} ${BANNER_CTA_ROW_DUAL}`;
}

export function bannerCtaRowAsideStackClass(mt: string) {
	return `${mt} ${BANNER_CTA_ROW_ASIDE_STACK}`;
}

export function bannerCtaRowCenteredClass(mt: string) {
	return `${mt} ${BANNER_CTA_ROW_CENTERED}`;
}
