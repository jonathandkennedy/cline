'use client';

import { components } from '@/kit/theme';
/** Tool intro backdrop; backgrounds from app marketing introBg SSOT. */
import { type CSSProperties, memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../functions/cn';

export type BackdropProps = {
	bgImage: string;
	standalone?: boolean;
};

function BackdropComponent({ bgImage, standalone = false }: BackdropProps) {
	const [portalTarget] = useState<HTMLElement | null>(() =>
		typeof document !== 'undefined' ? document.body : null,
	);

	const layerStyle = {
		'--tool-bg': `url('${bgImage}')`,
	} as CSSProperties;

	const layer = (
		<div
			className={cn(
				components.backdrop.toolPage.root,
				standalone && components.backdrop.toolPage.standalone,
			)}
			style={layerStyle}
		/>
	);

	if (portalTarget) {
		return createPortal(layer, portalTarget);
	}

	return layer;
}

export const Backdrop = memo(BackdropComponent);

Backdrop.displayName = 'Backdrop';
