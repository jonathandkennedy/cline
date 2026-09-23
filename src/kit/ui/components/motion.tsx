'use client';

import type { MouseEvent, ReactNode } from 'react';
import {
	motionHeaderMenuItemExit,
	motionHeaderMenuItemHidden,
	motionHeaderMenuItemVisible,
	motionHeaderMenuStaggerDelay,
	motionTransition,
} from '../functions/motion';
import { usePrefersReducedMotion } from '../hooks/gentle';
import { m } from '../vendors/motion';
import { Link } from './link';

type LinkHrefObject = {
	pathname?: string;
	query?: Record<string, string | string[] | undefined>;
	hash?: string;
};

export type MotionProps = {
	href: string | LinkHrefObject;
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
	className?: string;
	'aria-label'?: string;
	index: number;
	children: ReactNode;
};

const MotionLink = m(Link);

export function Motion({
	index,
	className,
	children,
	href,
	onClick,
	'aria-label': ariaLabel,
}: MotionProps) {
	const reducedMotion = usePrefersReducedMotion();
	const delay = motionHeaderMenuStaggerDelay(index, reducedMotion);

	return (
		<MotionLink
			href={href}
			onClick={onClick}
			aria-label={ariaLabel}
			className={className}
			initial={motionHeaderMenuItemHidden(reducedMotion)}
			animate={motionHeaderMenuItemVisible()}
			exit={motionHeaderMenuItemExit(reducedMotion)}
			transition={motionTransition(reducedMotion, { delay })}
		>
			{children}
		</MotionLink>
	);
}
