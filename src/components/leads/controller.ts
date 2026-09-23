import { zodResolver } from '@hookform/resolvers/zod';
import { trackEvent } from '@/lib/analytics';
import type { AttachmentItem } from '@/kit/forms';
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	type LeadForm,
	type LeadFormFields,
	type LeadPrefill,
	leadSchema,
} from '@/components/leads/schema';
import {
	canQueueCaseAttachment,
	readyAttachmentFiles,
	startCaseAttachmentIntake,
} from '@/lib/intake';
import { MANUFACTURERS } from '@/lib/cms';
import { formatBrandTemplate } from '@/lib/cms/brandtemplate';
import { UI_COPY } from '@/lib/cms/tables/config';
import { notifyEmbedLeadSubmitted } from '@/lib/embed/bridge';
import { CaseReviewSubmitError, submitCaseReview } from '@/lib/embed/submit';
import { lockDocumentScroll } from '@/lib/lock';
import { composeVehicleLabel, resolveLeadVehicleDefaults, vehicleMakeOptions } from '@/lib/vehicle';
import { shouldCloseLeadModalOnBackdropClick } from './backdrop';
import { clearLeadSubmitted, markLeadSubmitted, readLeadSubmitted } from './storage';

const VEHICLE_MAKES = vehicleMakeOptions(MANUFACTURERS);

function leadFieldsFromPrefill(prefill: LeadPrefill | null | undefined): LeadFormFields {
	return {
		name: '',
		phone: '',
		email: '',
		...resolveLeadVehicleDefaults(prefill, VEHICLE_MAKES),
		vehicleType: prefill?.vehicleType ?? 'New',
		issue: prefill?.issue ?? '',
	};
}

function withComposedVehicle(data: LeadFormFields): LeadForm {
	return {
		...data,
		vehicle: composeVehicleLabel(data),
	};
}

function attachmentItemsFromPrefill(
	prefill: LeadPrefill | null | undefined,
	acceptAttachments: boolean,
): AttachmentItem[] {
	if (!acceptAttachments || !prefill?.attachments?.length) return [];
	return prefill.attachments.map((file) => ({
		id: crypto.randomUUID(),
		file,
		progress: 100,
		status: 'ready' as const,
	}));
}

export function useLeadModal(
	isOpen: boolean,
	onClose: () => void,
	context: string,
	prefill?: LeadPrefill | null,
	acceptAttachments = false,
	options?: { trapFocus?: boolean; lockScroll?: boolean; autoFocus?: boolean },
) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		reset,
	} = useForm<LeadFormFields>({
		resolver: zodResolver(leadSchema),
		defaultValues: leadFieldsFromPrefill(null),
	});

	const vehicleType = watch('vehicleType');
	const vehicleMake = watch('vehicleMake');
	const titleId = useId();
	const dialogRef = useRef<HTMLDivElement>(null);
	const lastActiveRef = useRef<HTMLElement | null>(null);
	const intakeHandlesRef = useRef(new Map<string, ReturnType<typeof startCaseAttachmentIntake>>());
	const attachmentItemsRef = useRef<AttachmentItem[]>([]);
	/** True only when the press that may become a click started on the backdrop itself. */
	const backdropPointerDownRef = useRef(false);
	const [persistedSubmitted, setPersistedSubmitted] = useState(false);
	const [attachmentItems, setAttachmentItems] = useState<AttachmentItem[]>([]);
	const [attachmentError, setAttachmentError] = useState<string | null>(null);
	const trapFocus = options?.trapFocus !== false;
	const lockScroll = options?.lockScroll !== false;
	const autoFocus = options?.autoFocus !== false;

	const showSuccess = persistedSubmitted;
	const readyAttachments = readyAttachmentFiles(attachmentItems);

	useEffect(() => {
		attachmentItemsRef.current = attachmentItems;
	}, [attachmentItems]);

	const clearIntakeHandles = useCallback(() => {
		for (const handle of intakeHandlesRef.current.values()) {
			handle.abort();
		}
		intakeHandlesRef.current.clear();
	}, []);

	const patchAttachmentItem = useCallback(
		(id: string, patch: Partial<Pick<AttachmentItem, 'progress' | 'status'>>) => {
			setAttachmentItems((current) =>
				current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
			);
		},
		[],
	);

	const handleBackdropPointerDown = useCallback((e: React.PointerEvent) => {
		backdropPointerDownRef.current = e.target === e.currentTarget;
	}, []);
	const handleBackdropClick = useCallback(
		(e: React.MouseEvent) => {
			// Close only on a true outside click: press and release both on the
			// backdrop. Text selection that starts in a field and ends on the
			// overlay must not dismiss the form (ABRE-37).
			const startedOnBackdrop = backdropPointerDownRef.current;
			backdropPointerDownRef.current = false;
			if (
				shouldCloseLeadModalOnBackdropClick({
					pointerDownStartedOnBackdrop: startedOnBackdrop,
					clickTargetIsBackdrop: e.target === e.currentTarget,
				})
			) {
				onClose();
			}
		},
		[onClose],
	);
	const handleDialogClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);
	const handleCloseClick = useCallback(() => onClose(), [onClose]);

	const initOnOpenRef = useRef(false);
	useLayoutEffect(() => {
		if (!isOpen) {
			initOnOpenRef.current = false;
			return;
		}
		if (initOnOpenRef.current) return;
		initOnOpenRef.current = true;

		const alreadySubmitted = readLeadSubmitted();
		setPersistedSubmitted(alreadySubmitted);
		if (alreadySubmitted) return;
		reset(leadFieldsFromPrefill(prefill));
		clearIntakeHandles();
		const seeded = attachmentItemsFromPrefill(prefill, acceptAttachments);
		attachmentItemsRef.current = seeded;
		setAttachmentItems(seeded);
		setAttachmentError(null);
	}, [acceptAttachments, clearIntakeHandles, context, isOpen, prefill, reset]);

	useEffect(() => {
		if (!isOpen) return;
		const unlockScroll = lockScroll ? lockDocumentScroll() : () => {};

		lastActiveRef.current = document.activeElement as HTMLElement | null;

		const getFocusable = () =>
			Array.from(
				dialogRef.current?.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
				) ?? [],
			).filter((el) => el.offsetParent !== null);

		const focusTimer = autoFocus
			? window.setTimeout(() => {
					if (readLeadSubmitted()) {
						dialogRef.current?.focus();
						return;
					}
					const firstInput = dialogRef.current?.querySelector<HTMLElement>('input, textarea');
					(firstInput ?? getFocusable()[0] ?? dialogRef.current)?.focus();
				}, 60)
			: 0;

		const onKey = (e: KeyboardEvent) => {
			if (!trapFocus) return;
			if (e.key === 'Escape') {
				onClose();
				return;
			}
			if (e.key !== 'Tab') return;
			const f = getFocusable();
			if (f.length === 0) return;
			const first = f[0];
			const last = f[f.length - 1];
			const active = document.activeElement as HTMLElement | null;
			if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		};

		if (trapFocus) {
			window.addEventListener('keydown', onKey);
		}
		return () => {
			unlockScroll();
			if (trapFocus) window.removeEventListener('keydown', onKey);
			window.clearTimeout(focusTimer);
			if (trapFocus) lastActiveRef.current?.focus?.();
		};
	}, [autoFocus, isOpen, lockScroll, onClose, trapFocus]);

	const onSubmit = useCallback(
		async (data: LeadFormFields) => {
			const payload = withComposedVehicle(data);
			try {
				await submitCaseReview(payload, {
					context,
					prefill,
					attachments: acceptAttachments ? readyAttachments : [],
				});
			} catch (error) {
				const message =
					error instanceof CaseReviewSubmitError
						? error.message
						: formatBrandTemplate(UI_COPY.leadModal.submitErrorToast);
				toast.error(message);
				throw error;
			}

			markLeadSubmitted({
				...payload,
				context,
				attachments: acceptAttachments ? readyAttachments : [],
			});
			setPersistedSubmitted(true);
			trackEvent('generate_lead', { form_context: context });
			notifyEmbedLeadSubmitted(payload, context, prefill?.estimate);
			toast.success(UI_COPY.leadModal.requestSentToast, {
				description: UI_COPY.leadModal.reachOutToast,
			});
		},
		[acceptAttachments, context, prefill, readyAttachments],
	);

	const queueIntake = useCallback(
		(items: AttachmentItem[]) => {
			for (const item of items) {
				const handle = startCaseAttachmentIntake(item.file, (patch) => {
					patchAttachmentItem(item.id, patch);
					if (patch.status === 'failed') {
						const message = UI_COPY.leadForm.attachmentsStepFailed;
						setAttachmentError(message);
						toast.error(message);
					}
				});
				intakeHandlesRef.current.set(item.id, handle);
				void handle.done.finally(() => {
					intakeHandlesRef.current.delete(item.id);
				});
			}
		},
		[patchAttachmentItem],
	);

	const addAttachments = useCallback(
		(incoming: FileList | File[]) => {
			if (!acceptAttachments) return;

			const next = [...attachmentItemsRef.current];
			const queuedItems: AttachmentItem[] = [];
			let rejected = false;

			for (const file of Array.from(incoming)) {
				const verdict = canQueueCaseAttachment(next, file);
				if (verdict !== 'ok') {
					rejected = true;
					continue;
				}
				const item: AttachmentItem = {
					id: crypto.randomUUID(),
					file,
					progress: 0,
					status: 'queued',
				};
				next.push(item);
				queuedItems.push(item);
			}

			if (queuedItems.length > 0) {
				attachmentItemsRef.current = next;
				setAttachmentItems(next);
				queueIntake(queuedItems);
				if (!rejected) setAttachmentError(null);
			}

			if (rejected) {
				const message = UI_COPY.leadForm.attachmentsRejectedToast;
				setAttachmentError(message);
				toast.error(message);
			}
		},
		[acceptAttachments, queueIntake],
	);

	const removeAttachment = useCallback((id: string) => {
		intakeHandlesRef.current.get(id)?.abort();
		intakeHandlesRef.current.delete(id);
		setAttachmentItems((current) => {
			const next = current.filter((item) => item.id !== id);
			attachmentItemsRef.current = next;
			return next;
		});
	}, []);

	const onSubmitAnother = useCallback(() => {
		clearLeadSubmitted();
		setPersistedSubmitted(false);
		reset(leadFieldsFromPrefill(prefill));
		clearIntakeHandles();
		const seeded = attachmentItemsFromPrefill(prefill, acceptAttachments);
		attachmentItemsRef.current = seeded;
		setAttachmentItems(seeded);
		setAttachmentError(null);
		window.setTimeout(() => {
			const firstInput = dialogRef.current?.querySelector<HTMLElement>('input, textarea');
			firstInput?.focus();
		}, 60);
	}, [acceptAttachments, clearIntakeHandles, prefill, reset]);

	return {
		register,
		handleSubmit,
		setValue,
		errors,
		isSubmitting,
		isSubmitSuccessful,
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
		context,
		acceptAttachments,
		attachmentItems: acceptAttachments ? attachmentItems : [],
		attachmentError: acceptAttachments ? attachmentError : null,
		addAttachments,
		removeAttachment,
	};
}
