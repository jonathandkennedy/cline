import { BRAND } from '@/lib/cms';
import { caseReviewFromCandidates, caseReviewNotifyAddress, deliveryEnv } from '@/lib/email/env';
import { buildAttorneyNotificationEmail } from '@/lib/email/templates/attorney';
import { buildClientConfirmationEmail } from '@/lib/email/templates/client';
import type { CaseReviewLead } from '@/lib/email/types';

type SendResult = { sent: boolean; error?: string };

async function postResend(input: {
	from: string;
	to: string | string[];
	subject: string;
	html: string;
	text: string;
	replyTo?: string;
	apiKey: string;
}): Promise<SendResult> {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${input.apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: input.from,
			to: input.to,
			subject: input.subject,
			html: input.html,
			text: input.text,
			reply_to: input.replyTo,
		}),
	});

	if (!res.ok) {
		const detail = await res.text().catch(() => '');
		return { sent: false, error: detail || res.statusText };
	}

	return { sent: true };
}

async function sendResendEmail(input: {
	to: string | string[];
	subject: string;
	html: string;
	text: string;
	replyTo?: string;
}): Promise<SendResult> {
	const apiKey = deliveryEnv('RESEND_API_KEY');
	if (!apiKey) return { sent: false };

	let last: SendResult = { sent: false };
	for (const from of caseReviewFromCandidates(BRAND.name, BRAND.email)) {
		last = await postResend({ ...input, from, apiKey });
		if (last.sent) return last;
	}
	return last;
}

export async function sendCaseReviewEmails(lead: CaseReviewLead): Promise<{
	attorney: SendResult;
	client: SendResult;
}> {
	const notifyTo = caseReviewNotifyAddress(BRAND.email);

	const attorney = buildAttorneyNotificationEmail(lead);
	const client = buildClientConfirmationEmail(lead);

	const [attorneyResult, clientResult] = await Promise.all([
		sendResendEmail({
			to: notifyTo,
			subject: attorney.subject,
			html: attorney.html,
			text: attorney.text,
			replyTo: lead.email,
		}),
		sendResendEmail({
			to: lead.email,
			subject: client.subject,
			html: client.html,
			text: client.text,
			replyTo: BRAND.email,
		}),
	]);

	return { attorney: attorneyResult, client: clientResult };
}
