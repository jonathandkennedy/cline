import { NextResponse } from 'next/server';
import { sendCaseReviewEmails } from '@/lib/email';
import { deliveryEnv, hasConfiguredDelivery, sanitizeResendError } from '@/lib/email/env';
import type { CaseReviewLead } from '@/lib/email/types';

/** Lead form API — not part of site catalog / renderSitePage. */
const REQUIRED_FIELDS = ['name', 'phone', 'email', 'vehicle', 'vehicleType'] as const;

function field(formData: FormData, key: string): string {
	const value = formData.get(key);
	if (typeof value !== 'string') return '';
	return value.trim();
}

function optionalField(formData: FormData, key: string): string | undefined {
	const value = field(formData, key);
	return value.length > 0 ? value : undefined;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseLead(
	formData: FormData,
): CaseReviewLead | { error: 'missing_field' | 'invalid_email' } {
	for (const name of REQUIRED_FIELDS) {
		if (field(formData, name).length === 0) {
			return { error: 'missing_field' };
		}
	}

	const email = field(formData, 'email');
	if (!EMAIL_PATTERN.test(email)) {
		return { error: 'invalid_email' };
	}

	return {
		name: field(formData, 'name'),
		phone: field(formData, 'phone'),
		email,
		vehicle: field(formData, 'vehicle'),
		vehicleType: field(formData, 'vehicleType'),
		issue: optionalField(formData, 'issue'),
		context: optionalField(formData, 'context'),
		estimate: optionalField(formData, 'estimate'),
		source: optionalField(formData, 'source'),
		pageUrl: optionalField(formData, 'pageUrl'),
		embedUrl: optionalField(formData, 'embedUrl'),
		submittedAt: new Date().toISOString(),
	};
}

export async function POST(request: Request) {
	const formData = await request.formData();
	const lead = parseLead(formData);

	if ('error' in lead) {
		return NextResponse.json({ error: lead.error }, { status: 400 });
	}

	const webhook = deliveryEnv('CASE_REVIEW_WEBHOOK_URL');
	if (process.env.NODE_ENV === 'production' && !hasConfiguredDelivery()) {
		return NextResponse.json({ error: 'delivery_not_configured' }, { status: 503 });
	}

	if (webhook) {
		const forward = new FormData();
		for (const [key, value] of formData.entries()) {
			forward.append(key, value);
		}
		forward.set('submittedAt', lead.submittedAt);
		const upstream = await fetch(webhook, {
			method: 'POST',
			body: forward,
		});
		if (!upstream.ok) {
			return NextResponse.json({ error: 'upstream_failed' }, { status: 502 });
		}
	}

	if (deliveryEnv('RESEND_API_KEY')) {
		const emails = await sendCaseReviewEmails(lead);
		const delivered = emails.attorney.sent || emails.client.sent || Boolean(webhook);
		if (!delivered) {
			const attorney = sanitizeResendError(emails.attorney.error);
			const client = sanitizeResendError(emails.client.error);
			console.error('[case-review] delivery_failed', { attorney, client });
			return NextResponse.json(
				{
					error: 'delivery_failed',
					resend: attorney.name ?? client.name ?? 'not_sent',
					status: attorney.status ?? client.status,
				},
				{ status: 502 },
			);
		}
	}

	return NextResponse.json({ ok: true });
}
