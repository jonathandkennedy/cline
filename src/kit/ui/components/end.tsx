'use client';

import { memo, useEffect } from 'react';

export type EndProps = {
	offset?: number;
	flagId?: string;
};

const NEAR_END_ATTR = 'data-near-end';
const DEFAULT_FLAG_ID = 'scroll-end-flag';

function EndComponent({ offset = 160, flagId = DEFAULT_FLAG_ID }: EndProps) {
	useEffect(() => {
		const el = document.getElementById(flagId);
		if (!el) return;

		const io = new IntersectionObserver(
			([entry]) => {
				document.documentElement.toggleAttribute(NEAR_END_ATTR, entry.isIntersecting);
			},
			{ rootMargin: `0px 0px ${offset}px 0px`, threshold: 0 },
		);

		io.observe(el);
		return () => {
			io.disconnect();
			document.documentElement.removeAttribute(NEAR_END_ATTR);
		};
	}, [offset, flagId]);

	return null;
}

export const End = memo(EndComponent);

End.displayName = 'End';
