import { ElfsightLearnFeed } from '@/components/elfsight';
import { IntroVideo } from '@/components/sections/intro';

import { ResourceBand } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';

export const learnHubKinds: SiteComponentKindMap = {
	'learn.introVideo': () => <IntroVideo />,
	'resource.learnFeed': () => (
		<ResourceBand borderTop={false} pad="match" bleedClassName="bg-ink/25">
			<ElfsightLearnFeed />
		</ResourceBand>
	),
};
