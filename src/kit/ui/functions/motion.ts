import type { TargetAndTransition, Transition } from 'motion/react';

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION_MS = 240;
const MOTION_DURATION_S = MOTION_DURATION_MS / 1000;

const MOTION_ROUTE_DURATION_MS = 180;
export const MOTION_ROUTE_DURATION_S = MOTION_ROUTE_DURATION_MS / 1000;

export function routeTransitionKey(pathname: string | null): string {
	return pathname ?? '/';
}

const MOTION_ENTER_Y = 8;

const MOTION_EXIT_Y = 6;

const MOTION_MICRO_ENTER_Y = 4;
const MOTION_MICRO_EXIT_Y = -3;

const MOTION_STAGGER_S = 0.02;

const MOTION_HEADER_MENU_STAGGER_S = 0.03;

const MOTION_HEADER_MENU_ENTER_Y = '1rem';
const MOTION_HEADER_MENU_EXIT_Y = '0.375rem';

const INSTANT_MOTION_TRANSITION = {
	duration: 0,
} as const satisfies Transition;

type MotionTransitionOptions = {
	delay?: number;
	duration?: number;
};

export function motionTransition(reduced: boolean, options?: MotionTransitionOptions): Transition {
	if (reduced) return INSTANT_MOTION_TRANSITION;
	return {
		duration: options?.duration ?? MOTION_DURATION_S,
		ease: MOTION_EASE,
		...(options?.delay != null ? { delay: options.delay } : {}),
	};
}

export function motionFadeUpHidden(reduced: boolean): false | TargetAndTransition {
	if (reduced) return false;
	return { opacity: 0, y: MOTION_ENTER_Y };
}

export function motionFadeUpVisible(): TargetAndTransition {
	return { opacity: 1, y: 0 };
}

export function motionFadeUpExit(reduced: boolean): TargetAndTransition {
	if (reduced) return { opacity: 0 };
	return { opacity: 0, y: MOTION_EXIT_Y };
}

export function motionMicroFadeUpHidden(reduced: boolean): false | TargetAndTransition {
	if (reduced) return false;
	return { opacity: 0, y: MOTION_MICRO_ENTER_Y };
}

export function motionMicroFadeUpExit(reduced: boolean): TargetAndTransition {
	if (reduced) return { opacity: 0 };
	return { opacity: 0, y: MOTION_MICRO_EXIT_Y };
}

export function motionMicroFadeHidden(reduced: boolean): false | TargetAndTransition {
	if (reduced) return false;
	return { opacity: 0 };
}

export function motionFadeHidden(reduced: boolean): false | TargetAndTransition {
	if (reduced) return false;
	return { opacity: 0 };
}

export function motionFadeVisible(): TargetAndTransition {
	return { opacity: 1 };
}

export function motionFadeExit(reduced: boolean): TargetAndTransition | undefined {
	if (reduced) return undefined;
	return { opacity: 0 };
}

function motionStaggerDelay(
	index: number,
	reduced: boolean,
	stepS: number = MOTION_STAGGER_S,
): number {
	if (reduced) return 0;
	return index * stepS;
}

export function motionHeaderMenuStaggerDelay(index: number, reduced: boolean): number {
	return motionStaggerDelay(index, reduced, MOTION_HEADER_MENU_STAGGER_S);
}

export function motionHeaderMenuItemHidden(reduced: boolean): false | TargetAndTransition {
	if (reduced) return false;
	return { opacity: 0, y: MOTION_HEADER_MENU_ENTER_Y };
}

export function motionHeaderMenuItemVisible(): TargetAndTransition {
	return { opacity: 1, y: 0 };
}

export function motionHeaderMenuItemExit(reduced: boolean): TargetAndTransition {
	if (reduced) return { opacity: 0 };
	return { opacity: 0, y: MOTION_HEADER_MENU_EXIT_Y };
}
