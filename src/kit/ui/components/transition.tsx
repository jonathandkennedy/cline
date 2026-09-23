'use client';

import { components } from '@/kit/theme';
import { scrollWindowToTop } from '../functions/scroll';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useRef } from 'react';
import { MarketingRouteTransition } from './marketing';

type TransitionProps = {
	children: ReactNode;
};

/**
 * Route transitions are skipped on tool routes — the tool shell owns its
 * compositor-only crossfade so we avoid stacked JS animations and CLS.
 */
export function Transition({ children }: TransitionProps) {
	const pathname = usePathname();
	const toolRoute = pathname?.startsWith('/tool/') ?? false;
	const previousPath = useRef(pathname);

	useEffect(() => {
		if (toolRoute || !pathname || previousPath.current === pathname) {
			previousPath.current = pathname;
			return;
		}
		previousPath.current = pathname;
		scrollWindowToTop('instant');
	}, [pathname, toolRoute]);

	if (toolRoute) {
		return <div className={components.routeRoot}>{children}</div>;
	}

	return <MarketingRouteTransition pathname={pathname}>{children}</MarketingRouteTransition>;
}
