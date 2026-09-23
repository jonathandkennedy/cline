'use client';

import { components } from '@/kit/theme';
import { useCallback, useEffect, useState } from 'react';
import { LeadCaptureForm } from '@/components/fields/form';
import { LeadCaptureSuccess } from '@/components/popups/confirmation';
import { useLeadModal } from '@/components/leads/controller';
import { LeadCaptureTrustBar } from '@/components/leadtrust';
import { cn } from '@/kit/shared';
import { useEmbedBridge } from '@/lib/embed/hook';
import { embedChromeFlags, parseEmbedChrome, type EmbedChromeVariant } from '@/lib/lookup';

export function LeadCaptureEmbed({ context }: { context: string }) {
	useEmbedBridge(true);
	const [chrome, setChrome] = useState<EmbedChromeVariant>('full');

	useEffect(() => {
		setChrome(parseEmbedChrome(new URLSearchParams(window.location.search)));
	}, []);

	const flags = embedChromeFlags(chrome);
	const onClose = useCallback(() => {}, []);
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
		acceptAttachments,
		attachmentItems,
		addAttachments,
		removeAttachment,
		attachmentError,
	} = useLeadModal(true, onClose, context, null, true, {
		trapFocus: false,
		lockScroll: false,
	});

	return (
		<div
			ref={dialogRef}
			data-embed-root
			className={cn(
				'tool-shell tool-shell--standalone min-h-full bg-base',
				flags.cardOnly && 'tool-shell--chrome-card',
				flags.hideBg && 'tool-shell--chrome-no-bg',
			)}
		>
			<main id="main" className="mx-auto w-full max-w-lg px-4 py-6">
				<div className="rounded-xl border border-line bg-surface p-6 sm:p-7">
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
								acceptAttachments={acceptAttachments}
								attachmentItems={attachmentItems}
								onAddAttachments={addAttachments}
								onRemoveAttachment={removeAttachment}
								attachmentError={attachmentError}
							/>
						)}
					</div>
				</div>
				<div className="mt-4">
					<LeadCaptureTrustBar />
				</div>
			</main>
		</div>
	);
}
