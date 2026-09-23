'use client';

import { useMemo } from 'react';
import { Header as CoreHeader } from '@/kit/shared';
import { CaseReviewCtaButton } from '@/components/fields';
import { Menus } from '@/components/chrome/menus';
import { siteHeaderPhoneChrome } from '@/lib/cms/phone';
import { siteLogoChrome, siteNavChrome } from '@/lib/cms/chrome';
import { useEmbedSiteHome } from '@/lib/embed/hook';

type HeaderProps = {
	compact?: boolean;
};

const logoChrome = siteLogoChrome();
const navChrome = siteNavChrome();

export function Header({ compact }: HeaderProps) {
	const phone = siteHeaderPhoneChrome();
	return (
		<CoreHeader
			compact={compact}
			{...phone}
			logoChrome={logoChrome}
			navChrome={navChrome}
			caseReviewCta={CaseReviewCtaButton}
			renderMenus={(props) => <Menus {...props} />}
		/>
	);
}

/** Compact widget chrome — logo goes to the WP / www site home, not the tools host. */
export function EmbedHeader() {
	const phone = siteHeaderPhoneChrome();
	const homeHref = useEmbedSiteHome();
	const embedLogoChrome = useMemo(() => ({ ...logoChrome, homeHref }), [homeHref]);
	return (
		<CoreHeader
			compact
			{...phone}
			logoChrome={embedLogoChrome}
			navChrome={navChrome}
			caseReviewCta={CaseReviewCtaButton}
			renderMenus={(props) => <Menus {...props} />}
		/>
	);
}
