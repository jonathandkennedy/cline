'use client';

import type { ReactNode } from 'react';
import { cn } from '@/kit/ui/functions/cn';
import { proseParagraphsFromText } from '@/kit/ui/functions/prose';
import { RESOURCE_PROSE_CLASS } from '@/kit/blocks/rhythm';

function normalizeProseChildren(children: ReactNode): ReactNode {
	if (typeof children === 'string') {
		const paragraphs = proseParagraphsFromText(children);
		if (paragraphs.length === 0) return null;
		if (paragraphs.length === 1) return <p>{paragraphs[0]}</p>;
		return paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>);
	}
	return children;
}

export function ResourceProse({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn(RESOURCE_PROSE_CLASS, className)}>{normalizeProseChildren(children)}</div>
	);
}
