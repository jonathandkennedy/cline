'use client';

import { cn } from '@/kit/shared';
import { useCountUp } from '@/hooks';
import { formatNumber } from '@/lib/numbers';

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

	// Final value is in the server HTML (crawlers and no-JS readers see the real number); the
	// hook takes over the text node and animates the count-up once the element is in view.
	return (
		<span ref={ref} className={cn(className)} suppressHydrationWarning>
			{`${prefix}${formatNumber(to, decimals)}${suffix}`}
		</span>
	);
}
