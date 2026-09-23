'use client';

import { useParams } from 'next/navigation';

import type { SiteComponentKindMap } from '@/kit/catalog';

import type { CaseStudyDetailBlockId } from '@/lib/cms';
import { createCaseStudyDetailBlocks } from '@/lib/site/resources/blocks';

function useCaseStudyDetailSlug(): string {
	const params = useParams();
	const slug = params.slug;
	if (typeof slug === 'string') return slug;
	if (Array.isArray(slug) && typeof slug[0] === 'string') return slug[0];
	return '';
}

function caseStudyDetailBlock(id: CaseStudyDetailBlockId) {
	return function RenderCaseStudyDetailBlock() {
		const blocks = createCaseStudyDetailBlocks(useCaseStudyDetailSlug());
		return blocks[id]();
	};
}

export const caseStudyDetailKinds: SiteComponentKindMap = {
	'detail.caseStudyHero': caseStudyDetailBlock('hero'),
	'detail.caseStudyNarrative': caseStudyDetailBlock('narrative'),
	'detail.caseStudyRelatedQuestions': caseStudyDetailBlock('relatedQuestions'),
	'detail.caseStudyRelatedContent': caseStudyDetailBlock('relatedContent'),
};
