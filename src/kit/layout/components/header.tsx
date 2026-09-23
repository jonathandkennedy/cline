'use client';

import { Suspense, type ReactNode } from 'react';
import { components } from '@/kit/theme/interface/components';
import type { HeaderChromeProps } from '../types/chrome';
import { Compact } from './compact';
import { Nav } from './nav';

export function Header({
	compact = false,
	phoneHref,
	phoneDisplay,
	phoneAriaLabel,
	logoChrome,
	navChrome,
	caseReviewCta,
	renderMenus,
}: HeaderChromeProps) {
	const phone = { phoneHref, phoneDisplay, phoneAriaLabel };
	if (compact) return <Compact {...phone} logoChrome={logoChrome} />;
	if (!navChrome || !caseReviewCta || !renderMenus) {
		throw new Error('Header requires navChrome, caseReviewCta, and renderMenus when not compact');
	}
	return (
		<Nav
			{...phone}
			logoChrome={logoChrome}
			navChrome={navChrome}
			caseReviewCta={caseReviewCta}
			renderMenus={renderMenus}
		/>
	);
}

function SiteHeaderPlaceholder() {
	return <div className={components.masthead.placeholder} aria-hidden />;
}

export function SiteHeader({
	fallback,
	...headerProps
}: HeaderChromeProps & { fallback?: ReactNode }) {
	return (
		<Suspense fallback={fallback ?? <SiteHeaderPlaceholder />}>
			<Header {...headerProps} />
		</Suspense>
	);
}
