'use client';

import { Reveal } from '@/components';
import { FunnelCtaBanner } from '@/components/funnel';

import { ResourceBand } from '@/kit/blocks/spotlight';

import type { LeadCaptureContextId } from '@/lib/cms';
import { funnelCtaBackground } from '@/lib/site';

export function ResourceFinalCta({ leadContextId }: { leadContextId: LeadCaptureContextId }) {
	const { src, alt } = funnelCtaBackground(leadContextId);

	return (
		<ResourceBand pad="match" borderTop>
			<Reveal>
				<FunnelCtaBanner imageSrc={src} imageAlt={alt} />
			</Reveal>
		</ResourceBand>
	);
}
