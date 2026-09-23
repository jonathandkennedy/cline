/** Avatar primitive for reviews/social proof (items/reviews.json portraits). */
import Image from 'next/image';
import { memo } from 'react';
import { components } from '@/kit/theme';
import { cn } from '../functions/cn';

type AvatarProps = {
	name: string;
	src?: string | null;
	size?: 28 | 36 | 40 | 48 | 64;
	className?: string;
};

const SIZE_CLASS = {
	28: components.avatar.size28,
	36: components.avatar.size36,
	40: components.avatar.size40,
	48: components.avatar.size48,
	64: components.avatar.size64,
} as const;

const SIZE_PX = {
	28: 28,
	36: 36,
	40: 40,
	48: 48,
	64: 64,
} as const;

function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '');
	return letters.join('') || '?';
}

function AvatarComponent({ name, src, size = 36, className = '' }: AvatarProps) {
	const px = SIZE_PX[size];
	const shapeClass = cn(components.avatar.shape, SIZE_CLASS[size], className);

	if (src) {
		return (
			<span className={cn(shapeClass, components.avatar.imageWrap)}>
				<Image
					key={src}
					src={src}
					alt=""
					width={px}
					height={px}
					unoptimized={src.endsWith('.svg')}
					className={components.avatar.image}
					sizes={`${px}px`}
				/>
			</span>
		);
	}

	return (
		<span aria-hidden="true" className={cn(shapeClass, components.avatar.fallback)}>
			{initials(name)}
		</span>
	);
}

export const Avatar = memo(
	AvatarComponent,
	(prev, next) =>
		prev.name === next.name &&
		prev.src === next.src &&
		prev.size === next.size &&
		prev.className === next.className,
);

Avatar.displayName = 'Avatar';
