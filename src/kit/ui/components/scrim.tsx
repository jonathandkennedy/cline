'use client';

import { createPortal } from 'react-dom';
import {
	motionFadeExit,
	motionFadeHidden,
	motionFadeVisible,
	motionTransition,
} from '../functions/motion';
import { usePrefersReducedMotion } from '../hooks/gentle';
import { useIsClientMounted } from '../hooks/mount';
import { MotionLazy } from './lazy';
import { components } from '@/kit/theme';
import { AnimatePresence, m } from '../vendors/motion';

type ScrimProps = {
	open: boolean;
};

export function Scrim({ open }: ScrimProps) {
	const reducedMotion = usePrefersReducedMotion();
	const mounted = useIsClientMounted();

	if (!mounted) return null;

	return createPortal(
		<MotionLazy>
			<AnimatePresence initial={false}>
				{open ? (
					<m.div
						key="mega-menu-backdrop"
						className={components.backdrop.megaMenu}
						aria-hidden
						initial={motionFadeHidden(reducedMotion)}
						animate={motionFadeVisible()}
						exit={motionFadeExit(reducedMotion)}
						transition={motionTransition(reducedMotion)}
					/>
				) : null}
			</AnimatePresence>
		</MotionLazy>,
		document.body,
	);
}
