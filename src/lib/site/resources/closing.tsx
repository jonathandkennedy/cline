import type { ReactNode } from 'react';
import type { HubPathwaysVariantId, LeadCaptureContextId } from '@/lib/cms';
import { ResourceFinalCta } from './finale';
import { ResourceHubPathwaysBand } from './strip';

export function makeFunnelBlock(leadContextId: LeadCaptureContextId): {
	funnel: () => ReactNode;
} {
	return {
		funnel: () => <ResourceFinalCta leadContextId={leadContextId} />,
	};
}

export function makeResourceClosingBlocks({
	pathwaysVariant = 'default',
	leadContextId,
}: {
	pathwaysVariant?: HubPathwaysVariantId;
	leadContextId: LeadCaptureContextId;
}): {
	pathways: () => ReactNode;
	funnel: () => ReactNode;
} {
	return {
		pathways: () => <ResourceHubPathwaysBand variant={pathwaysVariant} />,
		...makeFunnelBlock(leadContextId),
	};
}
