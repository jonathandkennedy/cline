import { ArrowRight, Clock } from 'lucide-react';
import { memo, type ReactNode } from 'react';
import { components } from '@/kit/theme';
import { Link } from './link';

export type CardProps = {
	href: string;
	title: string;
	description: string;
	cta: string;
	minutes: string;
	badge?: string | null;
	index: number;
	icon: ReactNode;
};

function formatIndexLabel(index: number): string {
	return String(index + 1).padStart(2, '0');
}

function badgeClassName(badge: string): string {
	if (badge === 'Start Here') {
		return components.toolCard.badgeGold;
	}
	return components.toolCard.badgeNeutral;
}

function isFeaturedBadge(badge: string | null | undefined): boolean {
	return badge === 'Start Here';
}

function CardComponent({ href, title, description, cta, minutes, badge, index, icon }: CardProps) {
	const indexLabel = formatIndexLabel(index);
	const featured = isFeaturedBadge(badge);

	return (
		<Link
			href={href}
			aria-label={`${title}: ${cta}, about ${minutes}`}
			className={components.toolCard.root}
			data-featured={featured ? 'true' : undefined}
		>
			<span aria-hidden className={components.toolCard.index}>
				{indexLabel}
			</span>
			<div className={components.toolCard.headerRow}>
				<div className={components.toolCard.iconWrap}>{icon}</div>
				{badge ? <span className={badgeClassName(badge)}>{badge}</span> : null}
			</div>

			<h3 className={components.toolCard.title}>{title}</h3>
			<p className={components.toolCard.description}>{description}</p>

			<div className={components.toolCard.footer}>
				<span className={components.toolCard.cta}>
					<span>{cta}</span>
					<ArrowRight size={17} className="shrink-0" aria-hidden />
				</span>
				<span className={components.toolCard.minutes}>
					<Clock size={13} className="shrink-0" aria-hidden /> {minutes}
				</span>
			</div>
		</Link>
	);
}

export const Card = memo(
	CardComponent,
	(prev, next) =>
		prev.href === next.href &&
		prev.title === next.title &&
		prev.description === next.description &&
		prev.cta === next.cta &&
		prev.minutes === next.minutes &&
		prev.badge === next.badge &&
		prev.index === next.index &&
		prev.icon === next.icon,
);

Card.displayName = 'Card';
