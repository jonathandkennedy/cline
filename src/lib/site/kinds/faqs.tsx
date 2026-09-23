import { ResourceBand } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';

import { FAQ_CATEGORY_ICONS } from '@/lib/icons';
import { FAQ_CATEGORY_LABELS, FAQ_DETAILS, type FaqCategoryId } from '@/lib/site';
import { ResourceFaqCategorySection } from '@/lib/site/resources/faqlinks';

const CATEGORIES = Object.keys(FAQ_CATEGORY_LABELS) as FaqCategoryId[];

export const faqHubKinds: SiteComponentKindMap = {
	'resource.faqCategories': () => (
		<ResourceBand bleedClassName="bg-ink/35" borderTop={false} pad="compact">
			<div className={components.resourceUi.questions.k001}>
				{CATEGORIES.map((categoryId) => {
					const items = FAQ_DETAILS.filter((f) => f.categoryId === categoryId);
					if (items.length === 0) return null;
					return (
						<ResourceFaqCategorySection
							key={categoryId}
							categoryId={categoryId}
							title={FAQ_CATEGORY_LABELS[categoryId]}
							icon={FAQ_CATEGORY_ICONS[categoryId]}
							faqs={items}
							size="sm"
						/>
					);
				})}
			</div>
		</ResourceBand>
	),
};
