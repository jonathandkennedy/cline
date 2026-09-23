import type { NexusAnimations } from '@/kit/theme/types/animations';

export const animations: NexusAnimations = {
	motion: {
		default: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
	},
	preset: {
		default: { duration: 0.2 },
	},
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.2 },
	},
};
