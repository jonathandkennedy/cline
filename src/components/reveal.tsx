'use client';

import { cn } from '@/kit/shared';
import { useEffect, useRef, type ReactNode } from 'react';
import { REVEAL_DELAY_CLASS } from '@/lib/cms';

export type RevealProps = {
	children: ReactNode;
	delay?: number;
	className?: string;
};

/**
 * One-shot entrance. Never rest at opacity 0 (ABRE-32): no pending hide, no
 * fill-mode backwards during delay, and lock after animationend so scroll
 * cannot reverse or restart a vanish.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			node.classList.add('reveal--locked');
			return;
		}

		const lock = () => {
			node.classList.remove('reveal--shown');
			node.classList.add('reveal--locked');
		};

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					node.classList.add('reveal--shown');
					io.disconnect();
					break;
				}
			},
			{ threshold: 0 },
		);

		const onEnd = (event: AnimationEvent) => {
			if (event.target !== node) return;
			if (event.animationName !== 'reveal-in') return;
			lock();
		};

		node.addEventListener('animationend', onEnd);
		io.observe(node);

		return () => {
			io.disconnect();
			node.removeEventListener('animationend', onEnd);
		};
	}, []);

	return (
		<div ref={ref} className={cn('reveal', REVEAL_DELAY_CLASS[delay], className)}>
			{children}
		</div>
	);
}
