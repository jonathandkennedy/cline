import { RESOURCE_BLEED_MAIN, RESOURCE_GRID } from '@/kit/blocks/rhythm';
import { ResourceBand } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { cn } from '@/kit/ui/functions/cn';
import { components } from '@/kit/theme';

import {
	CASE_STUDIES_HUB_GRID,
	CASE_STUDY_DETAILS,
	CASE_STUDY_REPRESENTATIVE_DISCLAIMER,
} from '@/lib/site';
import { CaseStudyHubCard } from '@/lib/site/resources/tile';

export const caseStudiesHubKinds: SiteComponentKindMap = {
	'resource.caseStudiesGrid': () => (
		<ResourceBand bleedClassName={RESOURCE_BLEED_MAIN} borderTop={false} pad="default">
			<div className="max-w-2xl">
				<p className={components.resourceUi.shared.k039}>
					{CASE_STUDY_DETAILS.length} {CASE_STUDIES_HUB_GRID.countLabel}
				</p>
				<h2 className={components.resourceUi.studies.k001}>{CASE_STUDIES_HUB_GRID.headline}</h2>
				<p className={components.resourceUi.studies.k002}>{CASE_STUDY_REPRESENTATIVE_DISCLAIMER}</p>
			</div>
			<div
				className={cn(
					RESOURCE_GRID,
					'mt-10 grid-cols-1 items-stretch md:mt-12 md:grid-cols-2 lg:grid-cols-3',
				)}
			>
				{CASE_STUDY_DETAILS.map((study, index) => (
					<CaseStudyHubCard key={study.slug} study={study} index={index} />
				))}
			</div>
		</ResourceBand>
	),
};
