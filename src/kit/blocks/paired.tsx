'use client';

import { ArrowRight } from 'lucide-react';
import { createContext, useContext, type ComponentType, type ReactNode } from 'react';
import {
	bannerCtaRowAsideStackClass,
	bannerCtaRowClass,
	bannerCtaRowDualClass,
} from '@/kit/ui/functions/row';
import { components } from '@/kit/theme/interface/components';

export type ResourceEligibilityCta = { label: string; href?: string };
export type ResourceCaseReviewCta = { label: string };

export type ResourceCaseReviewButtonProps = {
	leadContextId: string;
	className?: string;
	label: string;
	children?: ReactNode;
};

export type ResourceCtaChrome = {
	eligibility: ResourceEligibilityCta;
	caseReview: ResourceCaseReviewCta;
	CaseReviewButton: ComponentType<ResourceCaseReviewButtonProps>;
};

const ResourceCtaContext = createContext<ResourceCtaChrome | null>(null);

export function ResourceCtaProvider({
	value,
	children,
}: {
	value: ResourceCtaChrome;
	children: ReactNode;
}) {
	return <ResourceCtaContext.Provider value={value}>{children}</ResourceCtaContext.Provider>;
}

function useResourceCtaChrome(): ResourceCtaChrome {
	const value = useContext(ResourceCtaContext);
	if (!value) {
		throw new Error('ResourcePrimaryLinkCta and ResourceDualCta require ResourceCtaProvider');
	}
	return value;
}

export function ResourcePrimaryLinkCta({
	leadContextId,
	className = bannerCtaRowClass('mt-5'),
}: {
	leadContextId: string;
	className?: string;
}) {
	const { eligibility, caseReview, CaseReviewButton } = useResourceCtaChrome();

	return (
		<div className={className}>
			<CaseReviewButton
				leadContextId={leadContextId}
				className={components.resourceUi.shared.k030}
				label={eligibility.label}
			>
				{eligibility.label} <ArrowRight size={15} className="shrink-0" />
			</CaseReviewButton>
			<CaseReviewButton
				leadContextId={leadContextId}
				className={components.resourceUi.paired.k001}
				label={caseReview.label}
			/>
		</div>
	);
}

export function ResourceDualCta({
	leadContextId,
	className,
	asideStack = false,
}: {
	leadContextId: string;
	className?: string;
	asideStack?: boolean;
}) {
	const { eligibility, caseReview, CaseReviewButton } = useResourceCtaChrome();
	const rowClass =
		className ?? (asideStack ? bannerCtaRowAsideStackClass('mt-5') : bannerCtaRowDualClass('mt-5'));

	return (
		<div className={rowClass}>
			<CaseReviewButton
				leadContextId={leadContextId}
				className={
					asideStack
						? 'btn btn-primary btn-md min-h-[44px] w-full justify-center'
						: components.resourceUi.shared.k030
				}
				label={eligibility.label}
			>
				{eligibility.label} <ArrowRight size={15} className="shrink-0" />
			</CaseReviewButton>
			<CaseReviewButton
				leadContextId={leadContextId}
				className={
					asideStack
						? 'btn btn-secondary btn-md min-h-[44px] w-full justify-center'
						: 'btn btn-secondary btn-md min-h-[44px] w-full justify-center sm:w-auto sm:min-w-[11rem]'
				}
				label={caseReview.label}
			/>
		</div>
	);
}
