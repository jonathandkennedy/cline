'use client';

import { components } from '@/kit/theme';
import { X } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { LeadCaptureForm } from '@/components/fields/form';
import { LeadCaptureSuccess } from './confirmation';
import { useLeadModal } from '@/components/leads/controller';
import type { LeadPrefill } from '@/components/leads/schema';
import { LeadCaptureTrustBar } from '@/components/leadtrust';
import { LogoFull } from '@/components/logo';
import { useModalPortalRoot, usePrefersReducedMotion } from '@/hooks';
import { UI_COPY } from '@/lib/cms/tables/config';
import { MotionLazy } from '@/lib/lazy';
import {
	motionFadeExit,
	motionFadeHidden,
	motionFadeUpExit,
	motionFadeUpHidden,
	motionFadeUpVisible,
	motionFadeVisible,
	motionTransition,
} from '@/lib/motion';

interface LeadCaptureModalProps {
	isOpen: boolean;
	onClose: () => void;
	context: string;
	prefill?: LeadPrefill | null;
	acceptAttachments?: boolean;
}

export function LeadCaptureModal({
	isOpen,
	onClose,
	context,
	prefill,
	acceptAttachments = false,
}: LeadCaptureModalProps) {
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
		handleBackdropPointerDown,
		handleBackdropClick,
		handleDialogClick,
		handleCloseClick,
		onSubmit,
		onSubmitAnother,
		context: leadContext,
		acceptAttachments: leadAcceptAttachments,
		attachmentItems,
		addAttachments,
		removeAttachment,
		attachmentError,
	} = useLeadModal(isOpen, onClose, context, prefill, acceptAttachments);
	const reducedMotion = usePrefersReducedMotion();
	const transition = motionTransition(reducedMotion);
	const portalRoot = useModalPortalRoot();

	if (!portalRoot) return null;

	return createPortal(
		<MotionLazy>
			<AnimatePresence>
				{isOpen && (
					<m.div
						initial={motionFadeHidden(reducedMotion)}
						animate={motionFadeVisible()}
						exit={motionFadeExit(reducedMotion)}
						transition={transition}
						className={components.captureBackdrop}
						onPointerDown={handleBackdropPointerDown}
						onClick={handleBackdropClick}
					>
						<m.div
							ref={dialogRef}
							role="dialog"
							aria-modal="true"
							aria-labelledby={titleId}
							tabIndex={-1}
							initial={motionFadeUpHidden(reducedMotion)}
							animate={motionFadeUpVisible()}
							exit={motionFadeUpExit(reducedMotion)}
							transition={transition}
							className={components.captureDialog}
							onClick={handleDialogClick}
						>
							<div className={components.captureHero}>
								<Image
									src="/images/brian-cline-capture-portrait.jpg"
									alt={UI_COPY.home.founderImageAlt}
									fill
									sizes="(min-width: 768px) 480px, 0px"
									className={components.captureHeroImage}
									priority
								/>
								<div className={components.captureHeroGradient} aria-hidden />
								<div className={components.captureHeroLogo}>
									<LogoFull variant="light" width={148} />
								</div>
							</div>

							<div className={components.capturePanel}>
								<button
									type="button"
									onClick={handleCloseClick}
									className={components.captureClose}
									aria-label="Close"
								>
									<X size={20} />
								</button>

								<div className={components.capturePanelBody}>
									{showSuccess ? (
										<LeadCaptureSuccess titleId={titleId} onSubmitAnother={onSubmitAnother} />
									) : (
										<LeadCaptureForm
											titleId={titleId}
											context={leadContext}
											prefill={prefill}
											vehicleType={vehicleType}
											vehicleMake={vehicleMake}
											register={register}
											setValue={setValue}
											handleSubmit={handleSubmit}
											errors={errors}
											isSubmitting={isSubmitting}
											onSubmit={onSubmit}
											acceptAttachments={leadAcceptAttachments}
											attachmentItems={attachmentItems}
											onAddAttachments={addAttachments}
											onRemoveAttachment={removeAttachment}
											attachmentError={attachmentError}
										/>
									)}
								</div>
							</div>

							<div className={components.captureTrustShell}>
								<LeadCaptureTrustBar className="pointer-events-auto" />
							</div>
						</m.div>
					</m.div>
				)}
			</AnimatePresence>
		</MotionLazy>,
		portalRoot,
	);
}
