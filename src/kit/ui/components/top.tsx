'use client';

import { ArrowUp } from 'lucide-react';
import { memo, useCallback } from 'react';

import { components } from '@/kit/theme';
import { scrollWindowToTop } from '../functions/scroll';

function TopComponent() {
	const toTop = useCallback(() => {
		scrollWindowToTop();
	}, []);

	return (
		<button type="button" onClick={toTop} aria-label="Back to top" className={components.top.root}>
			<ArrowUp size={18} />
		</button>
	);
}

export const Top = memo(TopComponent);

Top.displayName = 'Top';
