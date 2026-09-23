/**
 * Case-review delivery env. Quoted/whitespace Vercel values must not look set.
 * Brand-default From (info@clineapc.com) is treated as unset so notify wins —
 * Resend rejects unverified clineapc.com after keys were added (ABRE-66).
 */

export function deliveryEnv(name: string): string {
	let value = process.env[name]?.trim() ?? '';
	if (
		(value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
		(value.startsWith("'") && value.endsWith("'") && value.length >= 2)
	) {
		value = value.slice(1, -1).trim();
	}
	return value;
}

export function hasConfiguredDelivery(): boolean {
	return Boolean(deliveryEnv('CASE_REVIEW_WEBHOOK_URL') || deliveryEnv('RESEND_API_KEY'));
}

function looksLikeEmail(value: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function extractAddress(value: string): string {
	const angled = value.match(/<([^>]+)>/);
	return (angled ? angled[1] : value).trim().toLowerCase();
}

function formatFrom(brandName: string, email: string): string {
	return `${brandName} <${email}>`;
}

/** Skip brand-default From so CASE_REVIEW_NOTIFY_EMAIL (verified domain) is used. */
export function caseReviewFromAddress(brandName: string, brandEmail: string): string {
	const from = deliveryEnv('CASE_REVIEW_FROM_EMAIL');
	const notify = deliveryEnv('CASE_REVIEW_NOTIFY_EMAIL');
	const fromAddr = from ? extractAddress(from) : '';
	const brandDefault = !fromAddr || fromAddr === brandEmail.trim().toLowerCase();

	if (!brandDefault) {
		if (from.includes('<') && from.includes('>')) return from;
		if (looksLikeEmail(from)) return formatFrom(brandName, from);
	}

	if (looksLikeEmail(notify)) return formatFrom(brandName, notify);
	return formatFrom(brandName, brandEmail);
}

export function caseReviewNotifyAddress(brandEmail: string): string {
	return deliveryEnv('CASE_REVIEW_NOTIFY_EMAIL') || brandEmail;
}

export function caseReviewNotifyFrom(brandName: string, brandEmail: string): string {
	const notify = caseReviewNotifyAddress(brandEmail);
	return looksLikeEmail(notify) ? formatFrom(brandName, notify) : formatFrom(brandName, brandEmail);
}

/** Resend accepts this From on unverified accounts (docs test sender). */
export const RESEND_ONBOARDING_FROM = 'CLINE APC <onboarding@resend.dev>';

export function caseReviewFromCandidates(brandName: string, brandEmail: string): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	for (const from of [
		caseReviewFromAddress(brandName, brandEmail),
		caseReviewNotifyFrom(brandName, brandEmail),
		RESEND_ONBOARDING_FROM,
	]) {
		const key = extractAddress(from);
		if (!key || seen.has(key)) continue;
		seen.add(key);
		out.push(from);
	}
	return out;
}

/** Resend JSON name/status only — never API keys, raw messages, or addresses. */
export function sanitizeResendError(detail?: string): {
	name?: string;
	status?: number;
} {
	if (!detail) return {};
	try {
		const parsed = JSON.parse(detail) as {
			name?: unknown;
			statusCode?: unknown;
		};
		const name = typeof parsed.name === 'string' ? parsed.name : undefined;
		const status = typeof parsed.statusCode === 'number' ? parsed.statusCode : undefined;
		return { name, status };
	} catch {
		return {};
	}
}
