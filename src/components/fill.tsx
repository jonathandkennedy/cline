'use client';

import { cn } from '@/kit/shared';
import { useLayoutEffect, useRef } from 'react';

export function ProgressFill({ percent, className = '' }: { percent: number; className?: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.style.width = `${percent}%`;
	}, [percent]);

	return <span ref={ref} className={cn(className)} />;
}
