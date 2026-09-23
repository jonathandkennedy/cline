/**
 * Google Tag Manager dataLayer events. A no-op until GTM is configured
 * (NEXT_PUBLIC_GTM_ID), so staging and local builds send nothing.
 */
type DataLayerEvent = { event: string } & Record<string, unknown>;

declare global {
	interface Window {
		dataLayer?: DataLayerEvent[];
	}
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
	if (typeof window === 'undefined' || !GTM_ID) return;
	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push({ event, ...params });
}
