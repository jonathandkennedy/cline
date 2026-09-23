'use client';

import { ChevronDown } from 'lucide-react';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';

export type NavflyoutProps = {
	label: string;
	open: boolean;
	onClick: () => void;
	buttonRef: React.RefObject<HTMLButtonElement | null>;
	controlsId: string;
};

export function Navflyout({ label, open, onClick, buttonRef, controlsId }: NavflyoutProps) {
	return (
		<button
			ref={buttonRef}
			type="button"
			onClick={onClick}
			aria-haspopup="true"
			aria-expanded={open}
			aria-controls={controlsId}
			data-nav-open={open ? true : undefined}
			className={cn(
				components.nav.pill,
				components.nav.pillGap,
				open ? components.nav.pillOpen : components.nav.pillClosed,
			)}
		>
			{label}
			<ChevronDown
				size={15}
				className={cn(components.nav.chevron, open ? components.nav.chevronOpen : '')}
			/>
		</button>
	);
}
