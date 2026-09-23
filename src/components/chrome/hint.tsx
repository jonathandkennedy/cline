'use client';

import { useLayoutEffect } from 'react';
import { UA_DESKTOP_ATTR, macDesktopAttrValue } from '@/lib/cms/desktop';

/**
 * Marks `html[data-ua-desktop=mac]` for Mac desktop-only CSS (ABRE-72).
 * Uses layout effect so the attribute is present before paint when possible.
 */
export function UaDesktopHint() {
	useLayoutEffect(() => {
		const html = document.documentElement;
		const value = macDesktopAttrValue({
			platform: navigator.platform,
			userAgent: navigator.userAgent,
			maxTouchPoints: navigator.maxTouchPoints,
		});
		if (value) html.setAttribute(UA_DESKTOP_ATTR, value);
		else html.removeAttribute(UA_DESKTOP_ATTR);
		return () => {
			html.removeAttribute(UA_DESKTOP_ATTR);
		};
	}, []);

	return null;
}
