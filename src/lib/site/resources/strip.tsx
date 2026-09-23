import {
	ArrowRight,
	BookOpen,
	Calculator,
	Factory,
	FileSearch,
	HelpCircle,
	type LucideIcon,
	Scale,
	Star,
} from 'lucide-react';
import { Reveal } from '@/components';
import Link from '@/components/link';

import { ResourceBand } from '@/kit/blocks/spotlight';
import { components } from '@/kit/theme';

import type { HubPathwaysVariantId, ResourceHubPathwaysContent } from '@/lib/cms';
import { HUB_PATHWAYS, HUB_PATHWAYS_VARIANTS } from '@/lib/site';

const PATHWAY_ICONS: Record<string, LucideIcon> = {
	eligibility: FileSearch,
	guidebook: BookOpen,
	'case-studies': Scale,
	buyback: Calculator,
	manufacturers: Factory,
	reviews: Star,
	faq: HelpCircle,
};

function resolvePathwaysContent(
	variant: HubPathwaysVariantId = 'default',
): ResourceHubPathwaysContent {
	const variants = HUB_PATHWAYS_VARIANTS as Record<
		HubPathwaysVariantId,
		ResourceHubPathwaysContent
	>;
	return variants[variant] ?? (HUB_PATHWAYS as ResourceHubPathwaysContent);
}

export function ResourceHubPathwaysBand({
	content,
	variant = 'default',
}: {
	content?: ResourceHubPathwaysContent;
	variant?: HubPathwaysVariantId;
}) {
	const resolved = content ?? resolvePathwaysContent(variant);

	return (
		<ResourceBand pad="compact" bleedClassName="bg-ink/20">
			<div className={components.resourceUi.strip.k001}>
				<Reveal className={components.resourceUi.strip.k002}>
					<span className="eyebrow">{resolved.eyebrow}</span>
					<h2 className={components.resourceUi.strip.k003}>{resolved.title}</h2>
					<p className={components.resourceUi.strip.k004}>{resolved.body}</p>
				</Reveal>

				<div className={components.resourceUi.strip.k005}>
					<ul className={components.resourceUi.strip.k006}>
						{resolved.rows.map((row, index) => {
							const Icon = PATHWAY_ICONS[row.id] ?? FileSearch;
							return (
								<li key={row.id} className={components.resourceUi.strip.k007}>
									<Reveal delay={index * 50} className={components.resourceUi.shared.k031}>
										<Link href={row.href} className={components.resourceUi.strip.k008}>
											<span className={components.resourceUi.strip.k009}>
												<Icon size={16} aria-hidden />
											</span>
											<div className={components.resourceUi.strip.k010}>
												<h3 className={components.resourceUi.strip.k011}>{row.title}</h3>
												<p className={components.resourceUi.strip.k012}>{row.body}</p>
												<span className={components.resourceUi.strip.k013}>
													{row.cta}
													<ArrowRight
														size={14}
														className={components.resourceUi.strip.k014}
														aria-hidden
													/>
												</span>
											</div>
										</Link>
									</Reveal>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</ResourceBand>
	);
}
