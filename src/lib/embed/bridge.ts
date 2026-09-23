import type { LeadForm } from '@/components/leads/schema';

export const EMBED_MESSAGE_SOURCE = 'cline-apc-tools';

export type EmbedLeadPayload = {
	name: string;
	phone: string;
	email: string;
	vehicle: string;
	vehicleType: string;
	issue?: string;
	context: string;
	estimate?: number;
	source?: string;
};

export function embedModeLabel(search: URLSearchParams): string {
	if (search.has('standalone')) return 'standalone';
	if (search.get('embed') === '1' || search.get('iframe') === '1') return 'embed';
	return 'full';
}

export function leadSourceFromSearch(search: URLSearchParams): string {
	const explicit = search.get('source')?.trim();
	return explicit || embedModeLabel(search);
}

export function leadPageUrl(): string {
	if (typeof document === 'undefined' || typeof window === 'undefined') {
		return '';
	}
	const referrer = document.referrer;
	if (/^https?:\/\//i.test(referrer)) return referrer;
	return window.location.href;
}

export function postEmbedMessage(
	type: 'LEAD_SUBMITTED' | 'RESIZE' | 'READY',
	payload?: Record<string, unknown>,
) {
	if (typeof window === 'undefined') return;
	if (window.parent === window) return;
	window.parent.postMessage(
		{
			source: EMBED_MESSAGE_SOURCE,
			type,
			...payload,
		},
		'*',
	);
}

export function notifyEmbedLeadSubmitted(data: LeadForm, context: string, estimate?: number) {
	postEmbedMessage('LEAD_SUBMITTED', {
		payload: {
			name: data.name,
			phone: data.phone,
			email: data.email,
			vehicle: data.vehicle,
			vehicleType: data.vehicleType,
			issue: data.issue,
			context,
			estimate,
			source:
				typeof window !== 'undefined'
					? leadSourceFromSearch(new URLSearchParams(window.location.search))
					: undefined,
		} satisfies EmbedLeadPayload,
	});
}

let lastPostedHeight = 0;

export function resetEmbedHeight() {
	lastPostedHeight = 0;
}

export function measureEmbedHeight(): number {
	const head = document.querySelector('.workbench-head');
	const main = document.querySelector('.workbench-main');
	const rail = document.querySelector('.workbench-rail');
	const foot = document.querySelector('.workbench-foot');
	const intro = document.querySelector('.tool-stage[data-mode="intro"] .tool-intro');

	if (intro instanceof HTMLElement) {
		const pane = intro.closest('.tool-stage__pane') ?? intro;
		return Math.max(1, Math.ceil(pane.scrollHeight));
	}

	if (main instanceof HTMLElement) {
		const headH = head instanceof HTMLElement ? Math.ceil(head.getBoundingClientRect().height) : 0;
		const footH = foot instanceof HTMLElement ? Math.ceil(foot.getBoundingClientRect().height) : 0;
		const mainH = Math.ceil(Math.max(main.scrollHeight, main.offsetHeight));
		const railH =
			rail instanceof HTMLElement ? Math.ceil(Math.max(rail.scrollHeight, rail.offsetHeight)) : 0;
		return Math.max(1, headH + Math.max(mainH, railH) + footH);
	}

	const shell = document.querySelector('[data-embed-root], .tool-shell');
	if (shell instanceof HTMLElement) {
		return Math.max(1, Math.ceil(shell.scrollHeight));
	}
	return Math.max(
		1,
		Math.ceil(Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0)),
	);
}

export function reportEmbedHeight() {
	if (typeof window === 'undefined') return;
	const height = measureEmbedHeight();
	if (Math.abs(height - lastPostedHeight) < 2) return;
	lastPostedHeight = height;
	postEmbedMessage('RESIZE', { height });
}
