'use client';

import { Suspense, useLayoutEffect } from 'react';
import { SiteHeader as CoreSiteHeader } from '@/kit/shared';
import { components } from '@/kit/theme';
import { CaseReviewCtaButton } from '@/components/fields';
import { Menus } from '@/components/chrome/menus';
import { useSiteLayoutChrome } from '@/components/chrome/shell';
import { siteHeaderPhoneChrome } from '@/lib/cms/phone';
import {
	resolveHeaderChrome,
	siteLogoChrome,
	siteNavChrome,
	toolSlugFromPath,
} from '@/lib/cms/chrome';
import { isEmbedAppPath, isToolDeepLinked, isToolEmbedMode } from '@/lib/lookup';
import { usePathname, useSearchParams } from 'next/navigation';

const logoChrome = siteLogoChrome();
const navChrome = siteNavChrome();

const headerChromeProps = {
	logoChrome,
	navChrome,
	caseReviewCta: CaseReviewCtaButton,
	renderMenus: (props: Parameters<typeof Menus>[0]) => <Menus {...props} />,
};

function SiteHeaderPlaceholder() {
	if (typeof window !== 'undefined') {
		const path = window.location.pathname;
		const search = new URLSearchParams(window.location.search);
		if (isEmbedAppPath(path) || isToolEmbedMode(search)) {
			return null;
		}
	}
	return <div className={`${components.masthead.placeholder} shell-placeholder`} aria-hidden />;
}

function SiteHeaderInner() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { setChrome } = useSiteLayoutChrome();
	const phone = siteHeaderPhoneChrome();

	useLayoutEffect(() => {
		const slug = toolSlugFromPath(pathname);
		if (!slug) {
			setChrome(resolveHeaderChrome(pathname, searchParams));
			return;
		}
		if (isToolDeepLinked(searchParams)) {
			setChrome(resolveHeaderChrome(pathname, searchParams));
		}
	}, [pathname, searchParams, setChrome]);

	if (isEmbedAppPath(pathname) || isToolEmbedMode(searchParams)) return null;
	return <CoreSiteHeader {...phone} {...headerChromeProps} />;
}

export function SiteHeader() {
	return (
		<Suspense fallback={<SiteHeaderPlaceholder />}>
			<SiteHeaderInner />
		</Suspense>
	);
}
