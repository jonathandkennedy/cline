'use client';

import { components } from '@/kit/theme/interface/components';
import type { LucideIcon } from 'lucide-react';
import { useCallback } from 'react';
import type {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import { Attachments, type AttachmentItem } from '@/kit/forms/components/attachments';
import { Field } from '@/kit/forms/components/field';
import { isPhoneDigitInput } from '@/kit/forms/phone';
import { maskEmail, maskUsPhone } from '@/kit/forms/functions/masks';

export type VehicleTypeOption = 'New' | 'Certified Pre-Owned' | 'Used';

export type LeadFormValues = {
	name: string;
	phone: string;
	email: string;
	vehicleYear: string;
	vehicleMake: string;
	vehicleMakeOther?: string;
	vehicleModel: string;
	vehicleType: VehicleTypeOption;
	issue?: string;
};

export type LeadPrefillValues = {
	vehicle?: string;
	vehicleYear?: string;
	vehicleMake?: string;
	vehicleModel?: string;
	vehicleMakeOther?: string;
	vehicleType?: VehicleTypeOption;
	estimate?: number;
	issue?: string;
};

export type FormTrustItem = {
	label: string | ((ctx: string) => string);
	icon: LucideIcon;
	iconClass?: string;
};

export type FormCopy = {
	yearPlaceholder: string;
	makePlaceholder: string;
	modelPlaceholder: string;
	makeOtherPlaceholder: string;
	problemPlaceholder: string;
	sendingLabel: string;
	sendCaseReviewLabel: string;
	estimateLabel: string;
	estimateHint: string;
	footnote: string;
	pill: string;
	heading: string;
	leadIntro: (context: string) => string;
	compactHeading?: string;
	compactLeadIntro?: (context: string) => string;
	compactFootnote?: string;
	phonePlaceholder?: string;
	emailPlaceholder?: string;
};

export type FormProps = {
	titleId: string;
	context: string;
	prefill?: LeadPrefillValues | null;
	vehicleType: VehicleTypeOption;
	vehicleMake: LeadFormValues['vehicleMake'];
	vehicleOtherMake: string;
	vehicleYears: readonly string[];
	vehicleMakes: readonly string[];
	register: UseFormRegister<LeadFormValues>;
	setValue: UseFormSetValue<LeadFormValues>;
	handleSubmit: UseFormHandleSubmit<LeadFormValues>;
	errors: FieldErrors<LeadFormValues>;
	isSubmitting: boolean;
	onSubmit: (data: LeadFormValues) => Promise<void>;
	acceptAttachments?: boolean;
	attachmentItems?: readonly AttachmentItem[];
	onAddAttachments?: (files: FileList | File[]) => void;
	onRemoveAttachment?: (id: string) => void;
	vehicleTypes: readonly VehicleTypeOption[];
	vehicleTypeIcons: Record<VehicleTypeOption, LucideIcon>;
	vehicleTypeLabel: (type: VehicleTypeOption) => string;
	formatEstimate: (amount: number) => string;
	copy: FormCopy;
	trustItems: readonly FormTrustItem[];
	showInlineTrust?: boolean;
	attachmentsAccept: string;
	attachmentsCopy: {
		attachmentsLabel: string;
		attachmentsAddLabel: string;
		attachmentsRemoveAria: string;
		attachmentsStatusTemplate: string;
		attachmentsStepQueued: string;
		attachmentsStepReadingTemplate: string;
		attachmentsStepValidating: string;
		attachmentsStepReady: string;
		attachmentsStepFailed: string;
	};
	formatAttachmentSize: (bytes: number) => string;
	attachmentError?: string;
	variant?: 'full' | 'compact';
};

const EMPTY_ATTACHMENT_ITEMS: readonly AttachmentItem[] = [];

function trustItemIconClass(iconClass?: string): string {
	if (iconClass === components.formTrustIconRecovery) {
		return components.formTrustIconRecovery;
	}
	if (iconClass === 'text-recovery') {
		return components.formTrustIconRecovery;
	}
	if (iconClass === 'text-gold') {
		return components.homeHeroPropIcon;
	}
	if (iconClass === components.homeHeroPropIcon) {
		return components.homeHeroPropIcon;
	}
	return components.homeHeroPropIcon;
}

export function Form({
	titleId,
	context,
	prefill,
	vehicleType,
	vehicleMake,
	vehicleOtherMake,
	vehicleYears,
	vehicleMakes,
	register,
	setValue,
	handleSubmit,
	errors,
	isSubmitting,
	onSubmit,
	acceptAttachments,
	attachmentItems = EMPTY_ATTACHMENT_ITEMS,
	onAddAttachments,
	onRemoveAttachment,
	vehicleTypes,
	vehicleTypeIcons,
	vehicleTypeLabel,
	formatEstimate,
	copy,
	trustItems,
	showInlineTrust = false,
	attachmentsAccept,
	attachmentsCopy,
	formatAttachmentSize,
	attachmentError,
	variant = 'full',
}: FormProps) {
	const handleVehicleTypeClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			const type = e.currentTarget.dataset.type as LeadFormValues['vehicleType'] | undefined;
			if (type) setValue('vehicleType', type);
		},
		[setValue],
	);

	const handlePhoneBeforeInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
		const data = (event.nativeEvent as InputEvent).data;
		if (!isPhoneDigitInput(data)) event.preventDefault();
	}, []);

	const handlePhoneChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const next = maskUsPhone(event.target.value);
			event.target.value = next;
			setValue('phone', next, {
				shouldDirty: true,
				shouldValidate: true,
			});
		},
		[setValue],
	);

	const compact = variant === 'compact';
	const heading = compact ? (copy.compactHeading ?? copy.heading) : copy.heading;
	const intro = compact
		? (copy.compactLeadIntro ?? copy.leadIntro)(context)
		: copy.leadIntro(context);
	const footnote = compact ? (copy.compactFootnote ?? copy.footnote) : copy.footnote;

	return (
		<>
			<span className={components.capturePill}>{copy.pill}</span>
			<h3
				id={titleId}
				className={compact ? components.captureInlineHeading : components.captureHeading}
			>
				{heading}
			</h3>
			<p className={compact ? components.captureInlineLead : components.captureLead}>{intro}</p>

			{!compact && prefill?.estimate ? (
				<div className={components.captureEstimateCard}>
					<div className={components.captureEstimateLabel}>{copy.estimateLabel}</div>
					<div className={components.captureEstimateValue}>{formatEstimate(prefill.estimate)}</div>
					<div className={components.captureEstimateHint}>{copy.estimateHint}</div>
				</div>
			) : null}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={compact ? components.formVehicleSectionCompact : components.formVehicleSection}
			>
				{compact ? null : (
					<div className={components.captureVehicleGrid} role="group" aria-label="Vehicle type">
						{vehicleTypes.map((t) => {
							const Icon = vehicleTypeIcons[t];
							const label = vehicleTypeLabel(t);
							return (
								<button
									type="button"
									key={t}
									data-type={t}
									onClick={handleVehicleTypeClick}
									data-active={vehicleType === t}
									aria-pressed={vehicleType === t}
									className={components.captureVehicleTile}
								>
									<Icon size={14} strokeWidth={2} className={components.formStarIcon} aria-hidden />
									<span className={components.formTruncate}>{label}</span>
								</button>
							);
						})}
					</div>
				)}

				<Field message={errors.name?.message}>
					<input
						{...register('name')}
						placeholder="Full Name"
						autoComplete="name"
						aria-label="Full Name"
						className={components.captureInput}
					/>
				</Field>

				<div className={components.formGridContact}>
					<Field message={errors.phone?.message}>
						<input
							{...register('phone')}
							type="tel"
							inputMode="tel"
							autoComplete="tel"
							placeholder={copy.phonePlaceholder ?? 'Phone'}
							aria-label="Phone number"
							maxLength={14}
							className={`${components.captureInput} w-full`}
							onBeforeInput={handlePhoneBeforeInput}
							onChange={handlePhoneChange}
						/>
					</Field>
					<Field message={errors.email?.message}>
						<input
							{...register('email', {
								onChange: (event) => {
									setValue('email', maskEmail(event.target.value), {
										shouldValidate: event.target.value.length > 0,
										shouldDirty: true,
									});
								},
							})}
							type="email"
							inputMode="email"
							autoComplete="email"
							placeholder={copy.emailPlaceholder ?? 'Email'}
							aria-label="Email address"
							className={`${components.captureInput} w-full`}
						/>
					</Field>
				</div>

				<div className={components.formGridTwo}>
					<Field message={errors.vehicleYear?.message}>
						<select
							{...register('vehicleYear')}
							aria-label="Vehicle year"
							className={components.captureInput}
							defaultValue=""
						>
							<option value="" disabled>
								{copy.yearPlaceholder}
							</option>
							{vehicleYears.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</Field>
					<Field message={errors.vehicleMake?.message}>
						<select
							{...register('vehicleMake')}
							aria-label="Vehicle make"
							className={components.captureInput}
							defaultValue=""
						>
							<option value="" disabled>
								{copy.makePlaceholder}
							</option>
							{vehicleMakes.map((make) => (
								<option key={make} value={make}>
									{make}
								</option>
							))}
							<option value={vehicleOtherMake}>Other</option>
						</select>
					</Field>
				</div>

				{vehicleMake === vehicleOtherMake ? (
					<Field message={errors.vehicleMakeOther?.message}>
						<input
							{...register('vehicleMakeOther')}
							placeholder={copy.makeOtherPlaceholder}
							aria-label="Vehicle manufacturer"
							className={components.captureInput}
						/>
					</Field>
				) : null}

				<Field message={errors.vehicleModel?.message}>
					<input
						{...register('vehicleModel')}
						placeholder={copy.modelPlaceholder}
						aria-label="Vehicle model"
						className={components.captureInput}
					/>
				</Field>

				<textarea
					{...register('issue')}
					rows={compact ? 2 : 3}
					placeholder={copy.problemPlaceholder}
					aria-label="Briefly describe the problem"
					className={components.captureTextarea}
				/>

				{!compact && acceptAttachments && onAddAttachments && onRemoveAttachment ? (
					<Attachments
						items={attachmentItems}
						onAdd={onAddAttachments}
						onRemove={onRemoveAttachment}
						accept={attachmentsAccept}
						copy={attachmentsCopy}
						formatSize={formatAttachmentSize}
						error={attachmentError ?? undefined}
					/>
				) : null}

				<button
					type="submit"
					disabled={isSubmitting}
					className={compact ? components.captureSubmitCompact : components.captureSubmit}
				>
					{isSubmitting ? copy.sendingLabel : copy.sendCaseReviewLabel}
				</button>

				<p className={compact ? components.captureFootnoteCompact : components.captureFootnote}>
					{footnote}
				</p>

				{!compact && showInlineTrust ? (
					<div className={components.captureTrustRow}>
						{trustItems.map((item) => {
							const Icon = item.icon;
							return (
								<span key={String(item.label)} className={components.captureTrustItem}>
									<Icon size={13} className={trustItemIconClass(item.iconClass)} />{' '}
									{typeof item.label === 'function' ? item.label('') : item.label}
								</span>
							);
						})}
					</div>
				) : null}
			</form>
		</>
	);
}
