'use client';

import { Form, type LeadFormValues, type VehicleTypeOption } from '@/kit/shared';
import { Award, Car, type LucideIcon, Sparkles } from 'lucide-react';
import type {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import type { LeadFormFields, LeadPrefill } from '@/components/leads/schema';
import { CASE_ATTACHMENT_ACCEPT, formatAttachmentSize } from '@/lib/attachments';
import type { AttachmentItem } from '@/kit/forms';
import { MANUFACTURERS, UI_COPY, VEHICLE_TYPES } from '@/lib/cms';
import { formatBrandTemplate } from '@/lib/cms/brandtemplate';
import { LEAD_FORM_TRUST_ITEMS } from '@/lib/cms/tables/widgets';
import type { VehicleType } from '@/lib/cms/types';
import { formatUsd } from '@/lib/numbers';
import { VEHICLE_OTHER_MAKE, vehicleMakeOptions, vehicleYearOptions } from '@/lib/vehicle';

const VEHICLE_TYPE_ICONS: Record<VehicleType, LucideIcon> = {
	New: Sparkles,
	'Certified Pre-Owned': Award,
	Used: Car,
};

const VEHICLE_YEARS = vehicleYearOptions();
const VEHICLE_MAKES = vehicleMakeOptions(MANUFACTURERS);

function vehicleTypeLabel(type: VehicleType): string {
	return type === 'Certified Pre-Owned' ? 'Certified' : type;
}

interface LeadCaptureFormProps {
	titleId: string;
	context: string;
	prefill?: LeadPrefill | null;
	vehicleType: LeadFormFields['vehicleType'];
	vehicleMake: LeadFormFields['vehicleMake'];
	register: UseFormRegister<LeadFormFields>;
	setValue: UseFormSetValue<LeadFormFields>;
	handleSubmit: UseFormHandleSubmit<LeadFormFields>;
	errors: FieldErrors<LeadFormFields>;
	isSubmitting: boolean;
	onSubmit: (data: LeadFormFields) => Promise<void>;
	acceptAttachments?: boolean;
	attachmentItems?: readonly AttachmentItem[];
	onAddAttachments?: (files: FileList | File[]) => void;
	onRemoveAttachment?: (id: string) => void;
	attachmentError?: string | null;
	variant?: 'full' | 'compact';
}

export function LeadCaptureForm({
	titleId,
	context,
	prefill,
	vehicleType,
	vehicleMake,
	register,
	setValue,
	handleSubmit,
	errors,
	isSubmitting,
	onSubmit,
	acceptAttachments,
	attachmentItems = [],
	onAddAttachments,
	onRemoveAttachment,
	attachmentError,
	variant = 'full',
}: LeadCaptureFormProps) {
	const leadFormCopy = UI_COPY.leadForm;

	return (
		<Form
			titleId={titleId}
			context={context}
			prefill={prefill}
			vehicleType={vehicleType as VehicleTypeOption}
			vehicleMake={vehicleMake}
			vehicleOtherMake={VEHICLE_OTHER_MAKE}
			vehicleYears={VEHICLE_YEARS}
			vehicleMakes={VEHICLE_MAKES}
			register={register as unknown as UseFormRegister<LeadFormValues>}
			setValue={setValue as unknown as UseFormSetValue<LeadFormValues>}
			handleSubmit={handleSubmit as unknown as UseFormHandleSubmit<LeadFormValues>}
			errors={errors as FieldErrors<LeadFormValues>}
			isSubmitting={isSubmitting}
			onSubmit={onSubmit as unknown as (data: LeadFormValues) => Promise<void>}
			acceptAttachments={acceptAttachments}
			attachmentItems={attachmentItems}
			onAddAttachments={onAddAttachments}
			onRemoveAttachment={onRemoveAttachment}
			vehicleTypes={VEHICLE_TYPES as readonly VehicleType[]}
			vehicleTypeIcons={VEHICLE_TYPE_ICONS}
			vehicleTypeLabel={vehicleTypeLabel}
			formatEstimate={formatUsd}
			copy={{
				pill: leadFormCopy.pill,
				heading: leadFormCopy.heading,
				leadIntro: (context) =>
					formatBrandTemplate(leadFormCopy.leadIntroTemplate).replace('{context}', context),
				estimateLabel: leadFormCopy.estimateLabel,
				estimateHint: leadFormCopy.estimateHint,
				footnote: formatBrandTemplate(leadFormCopy.footnote),
				yearPlaceholder: leadFormCopy.yearPlaceholder,
				makePlaceholder: leadFormCopy.makePlaceholder,
				modelPlaceholder: leadFormCopy.modelPlaceholder,
				makeOtherPlaceholder: leadFormCopy.makeOtherPlaceholder,
				problemPlaceholder: leadFormCopy.problemPlaceholder,
				sendingLabel: leadFormCopy.sendingLabel,
				sendCaseReviewLabel: leadFormCopy.sendCaseReviewLabel,
				compactHeading: leadFormCopy.compactHeading,
				compactLeadIntro: (context) =>
					formatBrandTemplate(leadFormCopy.compactLeadIntroTemplate).replace('{context}', context),
				compactFootnote: formatBrandTemplate(leadFormCopy.compactFootnote),
				phonePlaceholder: leadFormCopy.phonePlaceholder,
				emailPlaceholder: leadFormCopy.emailPlaceholder,
			}}
			trustItems={LEAD_FORM_TRUST_ITEMS}
			attachmentsAccept={CASE_ATTACHMENT_ACCEPT}
			attachmentsCopy={{
				attachmentsLabel: leadFormCopy.attachmentsLabel,
				attachmentsAddLabel: leadFormCopy.attachmentsAddLabel,
				attachmentsRemoveAria: leadFormCopy.attachmentsRemoveAria,
				attachmentsStatusTemplate: leadFormCopy.attachmentsStatusTemplate,
				attachmentsStepQueued: leadFormCopy.attachmentsStepQueued,
				attachmentsStepReadingTemplate: leadFormCopy.attachmentsStepReadingTemplate,
				attachmentsStepValidating: leadFormCopy.attachmentsStepValidating,
				attachmentsStepReady: leadFormCopy.attachmentsStepReady,
				attachmentsStepFailed: leadFormCopy.attachmentsStepFailed,
			}}
			formatAttachmentSize={formatAttachmentSize}
			attachmentError={attachmentError ?? undefined}
			variant={variant}
		/>
	);
}
