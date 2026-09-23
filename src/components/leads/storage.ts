const LEAD_SUBMITTED_STORAGE_KEY = 'cline-apc-lead-submitted';
const LEAD_LAST_CONTEXT_KEY = 'cline-apc-lead-last-context';

export type LeadSubmittedPayload = {
	context: string;
	name: string;
	phone: string;
	email: string;
	vehicle: string;
	vehicleType: string;
	issue?: string;
	attachments: readonly File[];
};

export function readLeadSubmitted(): boolean {
	if (typeof window === 'undefined') return false;
	try {
		return window.localStorage.getItem(LEAD_SUBMITTED_STORAGE_KEY) === '1';
	} catch {
		return false;
	}
}

export function markLeadSubmitted({ context, attachments }: LeadSubmittedPayload): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(LEAD_SUBMITTED_STORAGE_KEY, '1');
		window.sessionStorage.setItem(LEAD_LAST_CONTEXT_KEY, context);
		if (attachments.length > 0) {
			window.sessionStorage.setItem(
				`${LEAD_LAST_CONTEXT_KEY}:attachment-count`,
				String(attachments.length),
			);
		}
	} catch {
		// quota / private mode
	}
}

export function clearLeadSubmitted(): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.removeItem(LEAD_SUBMITTED_STORAGE_KEY);
		window.sessionStorage.removeItem(LEAD_LAST_CONTEXT_KEY);
		window.sessionStorage.removeItem(`${LEAD_LAST_CONTEXT_KEY}:attachment-count`);
	} catch {
		// ignore
	}
}
