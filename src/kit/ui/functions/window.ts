import type { ScrollToTopBehavior } from '../types/scroll';

const MOTION_DURATION_MS = 520;

function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutSite(t: number): number {
	const x = 1 - t;
	return 1 - x * x * x * x * x;
}

function animateScrollTo(targetY: number): void {
	const startY = window.scrollY;
	const delta = targetY - startY;
	if (Math.abs(delta) < 1) return;
	const startTime = performance.now();
	const tick = (now: number) => {
		const elapsed = now - startTime;
		const t = Math.min(1, elapsed / MOTION_DURATION_MS);
		const y = Math.round(startY + delta * easeOutSite(t));
		window.scrollTo(0, y);
		if (t < 1) requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
}

function stickyHeaderScrollOffsetPx(extraRem = 1.5): number {
	if (typeof window === 'undefined') return 56 + extraRem * 16;
	const root = document.documentElement;
	const headerRaw = getComputedStyle(root).getPropertyValue('--header-h').trim();
	const headerPx = headerRaw.endsWith('px')
		? Number.parseFloat(headerRaw)
		: Number.parseFloat(headerRaw) || 56;
	const remPx = Number.parseFloat(getComputedStyle(root).fontSize) || 16;
	return headerPx + extraRem * remPx;
}

function scrollWindowToY(targetY: number, behavior: ScrollToTopBehavior): void {
	const useInstant = behavior === 'instant' || prefersReducedMotion();
	const y = Math.max(0, Math.round(targetY));
	if (useInstant) {
		const html = document.documentElement;
		const previous = html.style.scrollBehavior;
		html.style.scrollBehavior = 'auto';
		window.scrollTo({ top: y, left: 0 });
		html.style.scrollBehavior = previous;
		return;
	}
	animateScrollTo(y);
}

function remPx(): number {
	if (typeof window === 'undefined') return 16;
	return Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
}

/**
 * Extra clearance (in rem) below the sticky site header.
 * When a second sticky bar (e.g. mobile case-study TOC) is visible, clear its
 * full height plus the same top gap the bar uses under the header.
 */
function belowHeaderExtraRem(defaultExtraRem: number, clearance?: HTMLElement | null): number {
	if (!clearance || typeof window === 'undefined') return defaultExtraRem;
	if (getComputedStyle(clearance).display === 'none') return defaultExtraRem;
	const heightPx = clearance.getBoundingClientRect().height;
	if (heightPx <= 0) return defaultExtraRem;
	const root = document.documentElement;
	const outerPx =
		Number.parseFloat(getComputedStyle(root).getPropertyValue('--header-outer-h')) || 0;
	const innerPx = Number.parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 0;
	const headerZoomDeltaPx = Math.max(0, outerPx - innerPx);
	const bottomGapRem = 0.75;
	return (heightPx + headerZoomDeltaPx) / remPx() + bottomGapRem;
}

function stickyStackOffsetPx(clearance?: HTMLElement | null): number | null {
	if (!clearance || typeof window === 'undefined') return null;
	if (getComputedStyle(clearance).display === 'none') return null;
	const tocH = clearance.getBoundingClientRect().height;
	if (tocH <= 0) return null;
	const header = document.querySelector('.shell');
	const headerBottom = header
		? header.getBoundingClientRect().bottom
		: Number.parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue('--header-outer-h'),
			) || 63;
	const gapPx = 12;
	return headerBottom + tocH + gapPx;
}

export function scrollWindowToElement(
	element: HTMLElement,
	options?: {
		extraRem?: number;
		behavior?: ScrollToTopBehavior;
		/** Sticky chrome under the site header (mobile section TOC, etc.). */
		belowHeaderClearance?: HTMLElement | null;
	},
): void {
	const stack = stickyStackOffsetPx(options?.belowHeaderClearance);
	const offset =
		stack ??
		stickyHeaderScrollOffsetPx(
			belowHeaderExtraRem(options?.extraRem ?? 1.5, options?.belowHeaderClearance),
		);
	const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
	scrollWindowToY(targetY, options?.behavior ?? 'smooth');
}
