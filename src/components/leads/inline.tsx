'use client';

import { useCallback } from 'react';
import { components } from '@/kit/theme';
import { LeadCaptureForm } from '@/components/fields/form';
import { LeadCaptureSuccess } from '@/components/popups/confirmation';
import { useLeadModal } from '@/components/leads/controller';
import { leadCaptureContext } from '@/lib/cms';
import type { LeadCaptureContextId } from '@/lib/cms/types';

export function LeadCaptureInline({ leadContextId }: { leadContextId: LeadCaptureContextId }) {
	const onClose = useCallback(() => {}, []);
	const context = leadCaptureContext(leadContextId);
	const {
		register,
		handleSubmit,
		setValue,
		errors,
		isSubmitting,
		showSuccess,
		vehicleType,
		vehicleMake,
		titleId,
		dialogRef,
		onSubmit,
		onSubmitAnother,
		context: leadContext,
	} = useLeadModal(true, onClose, context, null, false, {
		trapFocus: false,
		lockScroll: false,
		autoFocus: false,
	});

	return (
		<div ref={dialogRef} data-lead-inline className={components.captureInlineRoot}>
			<div className={components.capturePanelBody}>
				{showSuccess ? (
					<LeadCaptureSuccess titleId={titleId} onSubmitAnother={onSubmitAnother} />
				) : (
					<LeadCaptureForm
						titleId={titleId}
						context={leadContext}
						vehicleType={vehicleType}
						vehicleMake={vehicleMake}
						register={register}
						setValue={setValue}
						handleSubmit={handleSubmit}
						errors={errors}
						isSubmitting={isSubmitting}
						onSubmit={onSubmit}
						variant="compact"
					/>
				)}
			</div>
		</div>
	);
}

export function leadCaptureInlineSlot(leadContextId: unknown) {
	const id = String(leadContextId ?? '') as LeadCaptureContextId;
	if (!id) return undefined;
	return <LeadCaptureInline leadContextId={id} />;
}
