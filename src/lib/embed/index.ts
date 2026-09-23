export {
	EMBED_MESSAGE_SOURCE,
	embedModeLabel,
	leadPageUrl,
	leadSourceFromSearch,
	measureEmbedHeight,
	notifyEmbedLeadSubmitted,
	postEmbedMessage,
	reportEmbedHeight,
	resetEmbedHeight,
} from '@/lib/embed/bridge';
export type { EmbedLeadPayload } from '@/lib/embed/bridge';
export { resolveClientEmbedSiteHome } from '@/lib/embed/home';
export { useEmbedBridge, useEmbedSiteHome } from '@/lib/embed/hook';
export { CaseReviewSubmitError, submitCaseReview } from '@/lib/embed/submit';
