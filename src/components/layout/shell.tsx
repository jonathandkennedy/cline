'use client';

import { Suspense, useLayoutEffect, useState } from 'react';
import { Header as CoreHeader } from '@/kit/shared';
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
import { EMBED_QUERY_ITEMS } from '@/lib/cms/tables/config';
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

/**
 * Runs before first paint so an embedded tool (iframe with ?standalone / legacy embed query)
 * never flashes the site header, while the header itself stays in the server HTML for crawlers.
 */
export const EMBED_MODE_SCRIPT = `(function(){try{var q=new URLSearchParams(location.search);var s=q.get('standalone');var e=(q.has('standalone')&&s!=='0'&&s!=='false')||${JSON.stringify(
	EMBED_QUERY_ITEMS.map((item) => [item.param, item.value]),
)}.some(function(p){return q.get(p[0])===p[1]});if(e)document.documentElement.setAttribute('data-embed','')}catch(_){}})();`;

/**
 * Query-string-dependent chrome. Isolated in its own Suspense boundary so reading search
 * params does not force the whole header to client-side rendering.
 */
function HeaderQuerySync({ onEmbed }: { onEmbed: (embed: boolean) => void }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { setChrome } = useSiteLayoutChrome();

	useLayoutEffect(() => {
		onEmbed(isToolEmbedMode(searchParams));
		const slug = toolSlugFromPath(pathname);
		if (!slug || isToolDeepLinked(searchParams)) {
			setChrome(resolveHeaderChrome(pathname, searchParams));
		}
	}, [pathname, searchParams, setChrome, onEmbed]);

	return null;
}

export function SiteHeader() {
	const pathname = usePathname();
	const phone = siteHeaderPhoneChrome();
	const [embed, setEmbed] = useState(false);

	if (isEmbedAppPath(pathname)) return null;
	return (
		<>
			<Suspense fallback={null}>
				<HeaderQuerySync onEmbed={setEmbed} />
			</Suspense>
			{embed ? null : (
				<div data-site-header className="contents">
					<CoreHeader {...phone} {...headerChromeProps} />
				</div>
			)}
		</>
	);
}
