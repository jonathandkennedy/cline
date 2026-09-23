/** Interface-core types shared with marketing + tool shells. */
import type { Transition } from 'motion/react';

export type NexusAnimations = {
	motion: Record<string, Transition>;
	preset: Record<string, Transition>;
	fade: {
		initial: { opacity: number };
		animate: { opacity: number };
		exit: { opacity: number };
		transition: Transition;
	};
};
