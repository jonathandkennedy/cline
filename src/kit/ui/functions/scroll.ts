import type { ScrollToTopBehavior } from '../types/scroll';

const MOTION_DURATION_MS = 240;

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
		if (t < 1) {
			requestAnimationFrame(tick);
		}
	};

	requestAnimationFrame(tick);
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

export function scrollWindowToTop(behavior: ScrollToTopBehavior = 'smooth'): void {
	scrollWindowToY(0, behavior);
	if (behavior === 'instant' || prefersReducedMotion()) {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
}
