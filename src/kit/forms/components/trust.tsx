import type { ReactNode } from 'react';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';

export type TrustProps = {
	className?: string;
	rating: ReactNode;
	copy: ReactNode;
	avatars: ReactNode;
};

export function Trust({ className, rating, copy, avatars }: TrustProps) {
	return (
		<div className={cn(components.trustRoot, className)}>
			<div className={components.trustLeadRow}>
				{rating}
				<span className={components.trustRating}>{copy}</span>
			</div>
			{avatars}
		</div>
	);
}
