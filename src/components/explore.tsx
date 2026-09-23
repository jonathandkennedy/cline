import { cn } from '@/kit/shared';
import { ArrowRight } from 'lucide-react';
import Link from '@/components/link';

export function SectionExploreLink({
	href,
	children,
	className,
	variant = 'default',
	expandLabel,
}: {
	href: string;
	children: React.ReactNode;
	className?: string;
	/** Icon-only control that expands label on hover (desktop chrome saver). */
	variant?: 'default' | 'icon-expand';
	/** Shown on hover when variant is icon-expand; full `children` stays in aria-label. */
	expandLabel?: string;
}) {
	if (variant === 'icon-expand') {
		const hoverText = expandLabel ?? 'More';
		const ariaLabel = typeof children === 'string' ? children : hoverText;

		return (
			<Link
				href={href}
				aria-label={ariaLabel}
				className={cn(
					'group motion-ui inline-flex h-11 min-w-11 items-center justify-center overflow-hidden rounded-lg border border-line/80 bg-surface/40 p-2 text-cta transition-[padding,background-color,border-color,box-shadow,min-width] duration-300 ease-out hover:border-gold/35 hover:bg-surface/70 hover:pl-3 hover:pr-2.5 focus-visible:border-gold/35 focus-visible:bg-surface/70 focus-visible:pl-3 focus-visible:pr-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
					className,
				)}
			>
				<span
					className={cn(
						'inline-block max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-semibold uppercase tracking-wide opacity-0',
						'transition-[max-width,opacity,margin] duration-300 ease-out',
						'group-hover:mr-1.5 group-hover:max-w-[5rem] group-hover:opacity-100',
						'group-focus-visible:mr-1.5 group-focus-visible:max-w-[5rem] group-focus-visible:opacity-100',
					)}
				>
					{hoverText}
				</span>
				<ArrowRight size={15} className="shrink-0" aria-hidden />
			</Link>
		);
	}

	return (
		<Link
			href={href}
			className={cn(
				'group motion-ui inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-line/80 bg-surface/40 px-4 py-2 text-[13.5px] font-semibold text-cta transition-all hover:border-gold/35 hover:bg-surface/70 hover:gap-2.5',
				className,
			)}
		>
			{children} <ArrowRight size={15} className="shrink-0" />
		</Link>
	);
}
