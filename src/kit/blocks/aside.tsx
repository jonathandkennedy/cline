'use client';

import { type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/kit/ui/functions/cn';
import { FAQ_INTRO_STICKY_ASIDE_CLASS } from '@/kit/blocks/rhythm';

export function ResourceStickyScrollAside<T extends ElementType = 'aside'>({
	as,
	children,
	className,
}: {
	as?: T;
	children: ReactNode;
	className?: string;
}) {
	const Tag = (as ?? 'aside') as ElementType;
	const ref = useRef<HTMLElement>(null);
	const [overflows, setOverflows] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const update = () => {
			setOverflows(node.scrollHeight > node.clientHeight + 1);
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(node);
		for (const child of node.children) {
			if (child instanceof Element) observer.observe(child);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref}
			className={cn(
				FAQ_INTRO_STICKY_ASIDE_CLASS,
				overflows && 'overflow-y-auto overscroll-contain',
				className,
			)}
		>
			{children}
		</Tag>
	);
}
