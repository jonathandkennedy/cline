/** Resource shell: progress rail + optional home footer blocks from catalog. */

import type { ReactNode } from 'react';

import { Progress } from '@/components';

import { cn } from '@/kit/shared';
import { components } from '@/kit/theme';

const RESOURCE_RAIL_CLASS = 'site-rail min-w-0 w-full';

export function ResourcePageChrome({
	children,
	footerBlocks,
	footerIds = [],
}: {
	children: ReactNode;
	footerBlocks?: Record<string, () => ReactNode>;
	footerIds?: readonly string[];
}) {
	return (
		<div className={components.resourceUi.framing.k001}>
			<Progress />
			<div className={cn(RESOURCE_RAIL_CLASS, components.resourceUi.framing.k002)}>{children}</div>
			{footerIds.map((id) => {
				const Block = footerBlocks?.[id];
				if (!Block) return null;
				return <Block key={id} />;
			})}
		</div>
	);
}
