'use client';

import type { ReactNode } from 'react';
import { cn } from '@/kit/ui/functions/cn';
import {
	RESOURCE_BAND_PY,
	RESOURCE_BAND_PY_COMPACT,
	RESOURCE_BAND_PY_MATCH,
} from '@/kit/blocks/rhythm';

export type BandProps = {
	bleedClassName?: string;
	innerClassName?: string;
	pad?: 'default' | 'compact' | 'match' | 'none';
	borderTop?: boolean;
	edgeToEdge?: boolean;
	children: ReactNode;
};

export function Band({
	bleedClassName,
	innerClassName,
	pad = 'default',
	borderTop = true,
	edgeToEdge = false,
	children,
}: BandProps) {
	const padClass =
		pad === 'none'
			? undefined
			: pad === 'compact'
				? RESOURCE_BAND_PY_COMPACT
				: pad === 'match'
					? RESOURCE_BAND_PY_MATCH
					: RESOURCE_BAND_PY;
	return (
		<section className={cn(borderTop && 'rule-y', bleedClassName)}>
			<div className={cn(!edgeToEdge && 'container-x', padClass, innerClassName)}>{children}</div>
		</section>
	);
}
