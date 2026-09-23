'use client';

import { components } from '@/kit/theme';
import type { ReactNode } from 'react';
import {
	MOTION_ROUTE_DURATION_S,
	motionFadeExit,
	motionFadeHidden,
	motionFadeVisible,
	motionTransition,
	routeTransitionKey,
} from '../functions/motion';
import { usePrefersReducedMotion } from '../hooks/gentle';
import { AnimatePresence, m } from '../vendors/motion';
import { MotionLazy } from './lazy';

type MarketingRouteTransitionProps = {
	children: ReactNode;
	pathname: string | null;
};

export function MarketingRouteTransition({ children, pathname }: MarketingRouteTransitionProps) {
	const reducedMotion = usePrefersReducedMotion();
	const transitionKey = routeTransitionKey(pathname);

	if (reducedMotion) {
		return <div className={components.routeRoot}>{children}</div>;
	}

	const transition = motionTransition(false, {
		duration: MOTION_ROUTE_DURATION_S,
	});

	return (
		<div className={components.routeRoot}>
			<MotionLazy>
				<AnimatePresence mode="sync" initial={false}>
					<m.div
						key={transitionKey}
						className={components.routeLayer}
						initial={motionFadeHidden(false)}
						animate={motionFadeVisible()}
						exit={motionFadeExit(false)}
						transition={transition}
					>
						{children}
					</m.div>
				</AnimatePresence>
			</MotionLazy>
		</div>
	);
}
