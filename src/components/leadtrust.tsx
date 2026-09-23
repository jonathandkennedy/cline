import { Trust } from '@/kit/shared';
import { components } from '@/kit/theme';
import { ReviewAvatarStack } from '@/components/faces';
import { LEAD_CAPTURE_AVATAR_BORDER_CLASS } from '@/lib/constants';
import { BRAND } from '@/lib/cms/tables/config';
import { LEAD_FORM_TRUST_ITEMS } from '@/lib/cms/tables/widgets';
import { StarRating } from '@/components/rating';

export function LeadCaptureTrustBar({ className }: { className?: string }) {
	return (
		<div className={className}>
			<Trust
				rating={<StarRating size={11} label={`Rated ${BRAND.rating} out of 5 stars`} />}
				copy={
					<>
						<span className={components.trustCopy}>{BRAND.rating}</span> from {BRAND.reviewCount}+
						California drivers
					</>
				}
				avatars={
					<ReviewAvatarStack
						size={28}
						className={components.trustRatingValue}
						collapseAfter={3}
						avatarClassName={LEAD_CAPTURE_AVATAR_BORDER_CLASS}
					/>
				}
			/>
			<div className={components.captureTrustRow}>
				{LEAD_FORM_TRUST_ITEMS.map((item) => {
					const Icon = item.icon;
					const label = typeof item.label === 'function' ? item.label('') : item.label;
					return (
						<span key={label} className={components.captureTrustItem}>
							<Icon
								size={13}
								className={
									item.iconClass === 'text-recovery'
										? components.formTrustIconRecovery
										: components.homeHeroPropIcon
								}
							/>
							{label}
						</span>
					);
				})}
			</div>
		</div>
	);
}
