'use client';

import type { SiteComponentKindMap } from '@/kit/catalog';

import { guidebookChapterKinds } from './chapter';
import { chromeKinds } from './chrome';
import { editorialKinds } from './editorial';
import { faqDetailKinds } from './faq';
import { faqHubKinds } from './faqs';
import { theFirmKinds } from './firm';
import { guidebookHubKinds } from './guidebook';
import { homeKinds } from './home';
import { learnHubKinds } from './learn';
import { manufacturerDetailKinds } from './manufacturer';
import { manufacturersHubKinds } from './manufacturers';
import { reviewDetailKinds } from './review';
import { reviewsHubKinds } from './reviews';
import { resourceSharedKinds } from './shared';
import { caseStudiesHubKinds } from './studies';
import { caseStudyDetailKinds } from './study';
import { teamKinds } from './team';

export { chromeKinds } from './chrome';
export { homeKinds } from './home';

export const siteComponentKinds: SiteComponentKindMap = {
	...homeKinds,
	...chromeKinds,
	...resourceSharedKinds,
	...manufacturersHubKinds,
	...reviewsHubKinds,
	...caseStudiesHubKinds,
	...faqHubKinds,
	...guidebookHubKinds,
	...learnHubKinds,
	...theFirmKinds,
	...teamKinds,
	...editorialKinds,
	...reviewDetailKinds,
	...caseStudyDetailKinds,
	...faqDetailKinds,
	...guidebookChapterKinds,
	...manufacturerDetailKinds,
};
