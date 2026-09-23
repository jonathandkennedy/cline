'use client';

import { type ReactNode, useCallback, useState } from 'react';
import { cn } from '@/kit/ui/functions/cn';
import { LeadCaptureModal } from '@/components/popups/modal';
import type { LeadCaptureContextId } from '@/lib/cms/types';
import { LEAD_CAPTURE_CONTEXT_BY_ID, SECONDARY_CASE_REVIEW_CTA } from '@/lib/cms/tables/config';

/**
 * Lead-form CTA button. Always uses the hand cursor on hover (ABRE-63):
 * native <button> UA style is `cursor: default`, unlike the prior <a>/tel: CTA.
 */
export function CaseReviewCtaButton({
	leadContextId,
	className,
	label,
	children,
	onActivate,
}: {
	leadContextId: string;
	className?: string;
	label?: string;
	children?: ReactNode;
	onActivate?: () => void;
}) {
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = useCallback(() => {
		setModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setModalOpen(false);
		onActivate?.();
	}, [onActivate]);

	return (
		<>
			<button type="button" className={cn('cursor-pointer', className)} onClick={openModal}>
				{children ?? label ?? SECONDARY_CASE_REVIEW_CTA.label}
			</button>
			{modalOpen ? (
				<LeadCaptureModal
					isOpen={modalOpen}
					onClose={closeModal}
					context={LEAD_CAPTURE_CONTEXT_BY_ID[leadContextId as LeadCaptureContextId]}
					acceptAttachments
				/>
			) : null}
		</>
	);
}
