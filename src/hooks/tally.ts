import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './gentle';
import { formatNumber } from '@/lib/numbers';

export function useCountUp({
	to,
	duration = 1200,
	prefix = '',
	suffix = '',
	decimals = 0,
	animateOnChange = false,
}: {
	to: number;
	duration?: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	animateOnChange?: boolean;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const fromRef = useRef(0);
	const startedRef = useRef(false);
	const rafRef = useRef<number | null>(null);
	const reduced = usePrefersReducedMotion();

	const renderValue = useCallback(
		(value: number) => {
			const el = ref.current;
			if (!el) return;
			el.textContent = `${prefix}${formatNumber(value, decimals)}${suffix}`;
		},
		[decimals, prefix, suffix],
	);

	const animate = useCallback(
		(from: number, target: number) => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (reduced) {
				renderValue(target);
				fromRef.current = target;
				return;
			}
			const start = performance.now();
			const step = (now: number) => {
				const p = Math.min(1, (now - start) / duration);
				const eased = 1 - (1 - p) ** 4;
				renderValue(from + (target - from) * eased);
				if (p < 1) {
					rafRef.current = requestAnimationFrame(step);
				} else {
					renderValue(target);
					fromRef.current = target;
				}
			};
			rafRef.current = requestAnimationFrame(step);
		},
		[duration, reduced, renderValue],
	);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting || startedRef.current) continue;
					startedRef.current = true;
					animate(0, to);
					io.disconnect();
				}
			},
			{ threshold: 0.4 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [animate, to]);

	useEffect(() => {
		if (!animateOnChange || !startedRef.current) return;
		animate(fromRef.current, to);
	}, [animate, animateOnChange, to]);

	useEffect(() => {
		// Render the final value immediately so numbers are visible in static
		// renders, screenshots, and before any IntersectionObserver fires.
		// The IO will then (re)animate a nice count-up when the element enters view.
		renderValue(to);
	}, [renderValue, to]);

	return ref;
}
