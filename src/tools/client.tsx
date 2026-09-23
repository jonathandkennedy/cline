'use client';

import { Suspense } from 'react';
import type { ToolQueryMode, ToolSlug } from '@/lib/cms';
import { ToolInner } from '@/tools/intro';

function ToolStageFallback() {
	return (
		<div className="tool-shell flex flex-col" role="status" aria-busy="true" aria-live="polite">
			<main className="tool-page tool-page--workbench flex flex-col">
				<div className="tool-stage tool-stage--viewport tool-stage--stacked tool-stage--loading container-x">
					<div className="tool-stage__stack">
						<div className="tool-stage__pane tool-stage__pane--intro tool-stage__pane--visible" />
					</div>
				</div>
			</main>
		</div>
	);
}

export type ToolClientProps = {
	slug: ToolSlug;
	queryMode: ToolQueryMode;
};

export function ToolClient({ slug, queryMode }: ToolClientProps) {
	return (
		<Suspense fallback={<ToolStageFallback />}>
			<ToolInner slug={slug} queryMode={queryMode} />
		</Suspense>
	);
}
