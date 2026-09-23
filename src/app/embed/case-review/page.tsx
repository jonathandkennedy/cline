import type { Metadata } from 'next';
import { LeadCaptureEmbed } from '@/components/leads/embed';
import { CASE_REVIEW_EMBED, leadCaptureContext } from '@/lib/cms';

export const metadata: Metadata = {
	title: CASE_REVIEW_EMBED.title,
	description: CASE_REVIEW_EMBED.description,
	robots: { index: false, follow: false },
};

export default function CaseReviewEmbedPage() {
	return <LeadCaptureEmbed context={leadCaptureContext('embed-case-review')} />;
}
