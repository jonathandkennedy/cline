'use client';

import { cn } from '@/kit/shared';
import { useCountUp } from '@/hooks';

export function CountUp({
	to,
	duration = 1200,
	prefix = '',
	suffix = '',
	decimals = 0,
	animateOnChange = false,
	className = '',
}: {
	to: number;
	duration?: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	animateOnChange?: boolean;
	className?: string;
}) {
	const ref = useCountUp({
		to,
		duration,
		prefix,
		suffix,
		decimals,
		animateOnChange,
	});

	return <span ref={ref} className={cn(className)} />;
}
