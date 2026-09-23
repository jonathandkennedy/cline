/** HTML attribute marking desktop OS for CSS chrome tweaks (ABRE-72). */
export const UA_DESKTOP_ATTR = 'data-ua-desktop';

/** Resting header surface mix on Windows / default desktop. */
export const HEADER_SURFACE_MIX_DEFAULT = 42;

/**
 * iMac/macOS reads the translucent header lighter than Windows.
 * Increase resting opacity by 70%: 42% × 1.7 ≈ 71%.
 */
export const HEADER_SURFACE_MIX_MAC = Math.round(HEADER_SURFACE_MIX_DEFAULT * 1.7);

export type UaDesktopHints = {
	platform?: string | null;
	userAgent?: string | null;
	maxTouchPoints?: number | null;
};

/**
 * True for Mac desktops (iMac / MacBook), not iPhone/iPad (incl. iPadOS desktop UA).
 */
export function isMacDesktop(hints: UaDesktopHints): boolean {
	const platform = hints.platform ?? '';
	const userAgent = hints.userAgent ?? '';
	const maxTouchPoints = hints.maxTouchPoints ?? 0;

	const looksMac = /Mac|Macintosh/i.test(platform) || /Mac OS X|Macintosh/i.test(userAgent);
	if (!looksMac) return false;

	// iPhone / iPod
	if (/iPhone|iPod/i.test(userAgent)) return false;

	// iPadOS 13+ reports Macintosh + touch points; classic iPad UA still says iPad.
	if (/iPad/i.test(userAgent) || maxTouchPoints > 1) return false;

	return true;
}

export function macDesktopAttrValue(hints: UaDesktopHints): 'mac' | null {
	return isMacDesktop(hints) ? 'mac' : null;
}
