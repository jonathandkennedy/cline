'use client';

import { forwardRef, type ReactNode } from 'react';
import {
	motionFadeExit,
	motionFadeHidden,
	motionFadeVisible,
	motionTransition,
} from '../functions/motion';
import { usePrefersReducedMotion } from '../hooks/gentle';
import { MotionLazy } from './lazy';
import { components } from '@/kit/theme';
import { AnimatePresence, m } from '../vendors/motion';

export type FlyoutProps = {
	open: boolean;
	id: string;
	ariaLabel: string;
	onMouseEnter?: () => void;
	children: ReactNode;
};

export const Flyout = forwardRef<HTMLDivElement, FlyoutProps>(function Flyout(
	{ open, id, ariaLabel, onMouseEnter, children },
	ref,
) {
	const reducedMotion = usePrefersReducedMotion();

	return (
		<MotionLazy>
			<AnimatePresence initial={false}>
				{open ? (
					<m.div
						key="header-mega-flyout"
						ref={ref}
						id={id}
						role="region"
						aria-label={ariaLabel}
						className={components.flyout.root}
						onMouseEnter={onMouseEnter}
						initial={motionFadeHidden(reducedMotion)}
						animate={motionFadeVisible()}
						exit={motionFadeExit(reducedMotion)}
						transition={motionTransition(reducedMotion)}
					>
						{children}
					</m.div>
				) : null}
			</AnimatePresence>
		</MotionLazy>
	);
});
