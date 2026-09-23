'use client';

import { cn } from '@/kit/shared';
import { useCallback } from 'react';

export function BrandLogo({
	src,
	className = '',
	title,
	align = 'center',
	maskFit = 'contain',
}: {
	src: string;
	className?: string;
	title?: string;
	align?: 'center' | 'start' | 'end';
	maskFit?: 'contain' | 'height';
}) {
	const fitClass = maskFit === 'height' ? 'brand-logo-fit-height' : '';
	const alignClass =
		align === 'start' ? 'brand-logo-align-start' : align === 'end' ? 'brand-logo-align-end' : '';

	const setMaskRef = useCallback(
		(node: HTMLSpanElement | null) => {
			if (!node) return;
			const maskUrl = `url("${src}")`;
			node.style.maskImage = maskUrl;
			node.style.webkitMaskImage = maskUrl;
		},
		[src],
	);

	return (
		// biome-ignore lint/a11y/useAriaPropsSupportedByRole: CSS-masked brand mark uses role=img
		<span
			ref={setMaskRef}
			role={title ? 'img' : undefined}
			aria-label={title}
			aria-hidden={title ? undefined : true}
			className={cn('brand-logo', fitClass, alignClass, className)}
		/>
	);
}
