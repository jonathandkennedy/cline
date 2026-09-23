import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/kit/ui/functions/cn';
import type { LeadCaptureContextId } from '@/lib/cms/types';
import { BRAND } from '@/lib/cms';
import { PRIMARY_ELIGIBILITY_CTA } from '@/lib/cms/tables/config';

/**
 * Yellow primary "Call for a Free Case Review" CTA — always a brand tel:
 * link (ABRE-80). Desktop DesktopTelNotice intercepts it into the
 * "Open on phone" popup; phones open the native dialer. Not the lead form.
 */
export function PrimaryCallCta({
	className,
	label = PRIMARY_ELIGIBILITY_CTA.label,
	showArrow = true,
	arrowSize = 17,
	children,
}: {
	leadContextId?: LeadCaptureContextId | string;
	className?: string;
	label?: string;
	showArrow?: boolean;
	arrowSize?: number;
	children?: ReactNode;
}) {
	return (
		<a href={BRAND.phoneHref} className={cn('cursor-pointer', className)}>
			{children ?? (
				<>
					{label}
					{showArrow ? (
						<>
							{' '}
							<ArrowRight size={arrowSize} aria-hidden />
						</>
					) : null}
				</>
			)}
		</a>
	);
}
