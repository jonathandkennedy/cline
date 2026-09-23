import { cn } from '@/kit/shared';
import { Avatar } from '@/kit/shared';
import { getReviewSocialProofAvatars, reviewPortraitSrc } from '@/lib/cms';

type ReviewAvatarStackProps = {
	size?: 28 | 36 | 40;
	className?: string;
	avatarClassName?: string;
	/** Hide avatars with index >= this on viewports under 400px. Omit to show all. */
	collapseAfter?: number;
};

export function ReviewAvatarStack({
	size = 36,
	className,
	avatarClassName,
	collapseAfter,
}: ReviewAvatarStackProps) {
	const reviews = getReviewSocialProofAvatars();

	return (
		<div aria-hidden className={cn('flex shrink-0 -space-x-2 sm:-space-x-2.5', className)}>
			{reviews.map((review, i) => (
				<Avatar
					key={review.slug}
					name={review.name}
					src={reviewPortraitSrc(review)}
					size={size}
					className={cn(
						avatarClassName,
						collapseAfter !== undefined && i >= collapseAfter && 'hidden min-[400px]:inline-flex',
					)}
				/>
			))}
		</div>
	);
}
