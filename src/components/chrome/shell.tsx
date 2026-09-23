'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { Provider, useLayoutChrome, useLayoutChromeOptional } from '@/kit/shared';
import { provider as InterfaceGlobalsProvider } from '@/kit/layout/providers/globals';
import { scrollWindowToTop } from '@/kit/ui/functions/scroll';
import { ResourceCtaProvider } from '@/kit/blocks/paired';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import { CaseReviewCtaButton } from '@/components/fields/reviewcta';
import type { LeadCaptureContextId } from '@/lib/cms';
import {
	LAYOUT_CHROME,
	PRIMARY_ELIGIBILITY_CTA,
	SECONDARY_CASE_REVIEW_CTA,
} from '@/lib/cms/tables/config';

const DEFAULT_CHROME = {
	title: LAYOUT_CHROME.defaultTitle,
	subtitle: LAYOUT_CHROME.defaultSubtitle,
};

function isToolPath(pathname: string | null): boolean {
	return Boolean(pathname?.match(/^\/tool\/([^/?#]+)/));
}

export function LayoutChromeSync() {
	const pathname = usePathname();
	const { resetChrome, setToolPhase } = useSiteLayoutChrome();

	useLayoutEffect(() => {
		const onToolPage = isToolPath(pathname);
		scrollWindowToTop('instant');
		if (!onToolPage) {
			setToolPhase(null);
			resetChrome();
		}
	}, [pathname, resetChrome, setToolPhase]);

	return null;
}

const RESOURCE_CTA_CHROME = {
	eligibility: PRIMARY_ELIGIBILITY_CTA,
	caseReview: SECONDARY_CASE_REVIEW_CTA,
	CaseReviewButton: function SiteCaseReviewButton({
		leadContextId,
		className,
		label,
		children,
	}: {
		leadContextId: string;
		className?: string;
		label: string;
		children?: ReactNode;
	}) {
		if (label === PRIMARY_ELIGIBILITY_CTA.label) {
			return (
				<PrimaryCallCta
					leadContextId={leadContextId}
					className={className}
					label={label}
					showArrow={false}
				>
					{children}
				</PrimaryCallCta>
			);
		}
		return (
			<CaseReviewCtaButton
				leadContextId={leadContextId as LeadCaptureContextId}
				className={className}
				label={label}
			>
				{children}
			</CaseReviewCtaButton>
		);
	},
} as const;

export function LayoutProvider({ children }: { children: ReactNode }) {
	return (
		<InterfaceGlobalsProvider defaultChrome={DEFAULT_CHROME}>
			<Provider defaultChrome={DEFAULT_CHROME}>
				<ResourceCtaProvider value={RESOURCE_CTA_CHROME}>
					<LayoutChromeSync />
					{children}
				</ResourceCtaProvider>
			</Provider>
		</InterfaceGlobalsProvider>
	);
}

export function useSiteLayoutChrome() {
	return useLayoutChrome();
}

export function useSiteLayoutChromeOptional() {
	return useLayoutChromeOptional(DEFAULT_CHROME);
}
