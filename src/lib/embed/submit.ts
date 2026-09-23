import type { LeadForm, LeadPrefill } from '@/components/leads/schema';
import { UI_COPY } from '@/lib/cms';
import { leadPageUrl, leadSourceFromSearch } from '@/lib/embed/bridge';

export class CaseReviewSubmitError extends Error {
	status: number;
	constructor(message: string, status = 500) {
		super(message);
		this.name = 'CaseReviewSubmitError';
		this.status = status;
	}
}

export async function submitCaseReview(
	data: LeadForm,
	options: {
		context: string;
		prefill?: LeadPrefill | null;
		attachments?: readonly File[];
	},
): Promise<void> {
	const form = new FormData();
	form.set('name', data.name.trim());
	form.set('phone', data.phone.trim());
	form.set('email', data.email.trim());
	form.set('vehicle', data.vehicle.trim());
	form.set('vehicleType', data.vehicleType);
	if (data.issue?.trim()) form.set('issue', data.issue.trim());
	form.set('context', options.context);
	if (options.prefill?.estimate != null) {
		form.set('estimate', String(options.prefill.estimate));
	}
	if (typeof window !== 'undefined') {
		const search = new URLSearchParams(window.location.search);
		form.set('source', leadSourceFromSearch(search));
		form.set('pageUrl', leadPageUrl() || window.location.href);
		form.set('embedUrl', window.location.href);
	}
	for (const file of options.attachments ?? []) {
		form.append('attachments', file, file.name);
	}

	const res = await fetch('/api/case-review', {
		method: 'POST',
		body: form,
	});

	if (!res.ok) {
		const modal = UI_COPY.leadModal;
		let message = modal.submitGenericError;
		try {
			const body = (await res.json()) as { error?: string };
			if (body.error === 'missing_field') {
				message = modal.submitMissingFields;
			} else if (body.error === 'invalid_email') {
				message = modal.submitInvalidEmail;
			} else if (body.error === 'delivery_not_configured') {
				message = modal.submitDeliveryNotConfigured;
			} else if (body.error === 'upstream_failed' || body.error === 'delivery_failed') {
				message = modal.submitUpstreamError;
			}
		} catch {
			// ignore parse errors
		}
		throw new CaseReviewSubmitError(message, res.status);
	}
}
