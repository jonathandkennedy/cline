import { cn } from '@/kit/shared';
import { Star } from 'lucide-react';
import { STAR_COUNT } from '@/lib/constants';

export function StarRating({
	size = 13,
	className = 'text-gold',
	label,
	fill = true,
}: {
	size?: number;
	className?: string;
	label?: string;
	fill?: boolean;
}) {
	return (
		// biome-ignore lint/a11y/useAriaPropsSupportedByRole: decorative star group uses role=img when labeled
		<span
			className={cn('flex items-center gap-px', className)}
			role={label ? 'img' : undefined}
			aria-label={label}
			aria-hidden={label ? undefined : true}
		>
			{Array.from({ length: STAR_COUNT }).map((_, i) => (
				<Star
					key={i}
					size={size}
					className={fill ? 'fill-current' : undefined}
					strokeWidth={1.5}
					aria-hidden="true"
				/>
			))}
		</span>
	);
}
