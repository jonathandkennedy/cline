/** Stable sonner id so repeat tel intercepts replace one Open-on-phone toast (ABRE-80). */
export const DESKTOP_TEL_TOAST_ID = 'desktop-tel-notice';
/** Class on that toast so hover cannot grow its height (ABRE-80 rework). */
export const DESKTOP_TEL_TOAST_CLASS = DESKTOP_TEL_TOAST_ID;

export function isTelHref(href: string | null | undefined): href is string {
	return typeof href === 'string' && href.toLowerCase().startsWith('tel:');
}

export function telDigits(value: string): string {
	return value.replace(/\D/g, '');
}

export function displayPhoneFromTelHref(
	href: string,
	brandDisplay: string,
	brandHref: string,
): string {
	const hrefDigits = telDigits(href);
	const brandDigits = telDigits(brandHref);
	const brandWithoutLeadingOne = brandDigits.replace(/^1/, '');
	if (
		hrefDigits === brandDigits ||
		hrefDigits === brandWithoutLeadingOne ||
		`1${hrefDigits}` === brandDigits
	) {
		return brandDisplay;
	}
	return href.replace(/^tel:/i, '');
}

export function isDesktopCallSurface(input: {
	hoverHover: boolean;
	pointerFine: boolean;
	pointerCoarse: boolean;
	minWidthDesktop: boolean;
}): boolean {
	if (input.hoverHover && input.pointerFine) return true;
	// VNC / headless Chrome often omit hover+fine media; treat wide non-coarse
	// pointers as desktop so tel: CTAs still get the Open-on-phone notice.
	return input.minWidthDesktop && !input.pointerCoarse;
}

export function shouldInterceptDesktopTel(input: {
	href: string | null | undefined;
	hoverHover: boolean;
	pointerFine: boolean;
	pointerCoarse: boolean;
	minWidthDesktop: boolean;
}): boolean {
	return (
		isTelHref(input.href) &&
		isDesktopCallSurface({
			hoverHover: input.hoverHover,
			pointerFine: input.pointerFine,
			pointerCoarse: input.pointerCoarse,
			minWidthDesktop: input.minWidthDesktop,
		})
	);
}

export function telHrefFromClickTarget(target: EventTarget | null): string | null {
	if (!(target instanceof Element)) return null;
	const anchor = target.closest('a[href^="tel:"], a[href^="TEL:"]');
	if (!(anchor instanceof HTMLAnchorElement)) return null;
	return anchor.getAttribute('href');
}
