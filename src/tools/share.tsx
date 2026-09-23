'use client';

import { Check, Share2 } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks';
import {
	MotionLazy,
	motionFadeUpVisible,
	motionMicroFadeHidden,
	motionMicroFadeUpExit,
	motionMicroFadeUpHidden,
	motionTransition,
} from '@/kit/ui';

export type BuybackShareButtonProps = {
	copied: boolean;
	onShare: () => void;
};

export function BuybackShareButton({ copied, onShare }: BuybackShareButtonProps) {
	const reducedMotion = usePrefersReducedMotion();
	const swapTransition = motionTransition(reducedMotion);

	return (
		<MotionLazy>
			<m.button
				layout="position"
				type="button"
				onClick={onShare}
				className="tool-actions__reset btn-ghost"
				aria-label={copied ? 'Link copied' : 'Share'}
			>
				<span className="relative flex size-[13px] shrink-0 items-center justify-center">
					<AnimatePresence mode="wait" initial={false}>
						{copied ? (
							<m.span
								key="check"
								className="absolute inset-0 flex items-center justify-center"
								initial={motionMicroFadeHidden(reducedMotion)}
								animate={motionFadeUpVisible()}
								exit={motionMicroFadeUpExit(reducedMotion)}
								transition={swapTransition}
							>
								<Check size={13} aria-hidden="true" />
							</m.span>
						) : (
							<m.span
								key="share"
								className="absolute inset-0 flex items-center justify-center"
								initial={motionMicroFadeHidden(reducedMotion)}
								animate={motionFadeUpVisible()}
								exit={motionMicroFadeUpExit(reducedMotion)}
								transition={swapTransition}
							>
								<Share2 size={13} aria-hidden="true" />
							</m.span>
						)}
					</AnimatePresence>
				</span>
				<span className="hidden sm:inline">
					<AnimatePresence mode="wait" initial={false}>
						{copied ? (
							<m.span
								key="copied"
								initial={motionMicroFadeUpHidden(reducedMotion)}
								animate={motionFadeUpVisible()}
								exit={motionMicroFadeUpExit(reducedMotion)}
								transition={swapTransition}
							>
								Link Copied
							</m.span>
						) : (
							<m.span
								key="share-label"
								initial={motionMicroFadeUpHidden(reducedMotion)}
								animate={motionFadeUpVisible()}
								exit={motionMicroFadeUpExit(reducedMotion)}
								transition={swapTransition}
							>
								Share
							</m.span>
						)}
					</AnimatePresence>
				</span>
			</m.button>
		</MotionLazy>
	);
}
