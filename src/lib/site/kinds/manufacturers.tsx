'use client';

import { ArrowRight } from 'lucide-react';

import { BrandLogo, Reveal } from '@/components';
import Link from '@/components/link';

import { ResourceBand } from '@/kit/blocks/spotlight';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { components } from '@/kit/theme';

import {
	getManufacturerPageBySlug,
	MANUFACTURERS,
	MANUFACTURERS_HUB_CARD_CTA,
	manufacturerDetailPath,
} from '@/lib/site';

const LOGO_SLOT_CLASS = 'flex h-10 w-full min-w-0 items-center py-1';
const LOGO_MARK_WRAP = 'inline-block h-8 max-w-full shrink-0 sm:h-9';
const LOGO_MARK_CLASS =
	'h-full w-full text-fg motion-ui transition-colors group-hover:text-gold-soft';

export const manufacturersHubKinds: SiteComponentKindMap = {
	'resource.manufacturerGrid': () => (
		<ResourceBand bleedClassName="bg-ink/25" borderTop={false} pad="match">
			<div className={components.resourceUi.directory.k001}>
				{MANUFACTURERS.map((manufacturer, index) => {
					const page = getManufacturerPageBySlug(manufacturer.slug);
					return (
						<Reveal
							key={manufacturer.slug}
							delay={index * 25}
							className={components.resourceUi.shared.k024}
						>
							<Link
								href={manufacturerDetailPath(manufacturer.slug)}
								className={components.resourceUi.directory.k002}
							>
								{manufacturer.logo ? (
									<div className={LOGO_SLOT_CLASS}>
										<span
											className={
												manufacturer.logoAspect ? LOGO_MARK_WRAP : `${LOGO_MARK_WRAP} w-24`
											}
											style={
												manufacturer.logoAspect
													? {
															aspectRatio: manufacturer.logoAspect,
														}
													: undefined
											}
										>
											<BrandLogo
												src={manufacturer.logo}
												title={manufacturer.name}
												align="start"
												maskFit="contain"
												className={LOGO_MARK_CLASS}
											/>
										</span>
									</div>
								) : (
									<span className={components.resourceUi.shared.k009}>{manufacturer.name}</span>
								)}
								{page ? <p className={components.resourceUi.directory.k003}>{page.intro}</p> : null}
								<span className={components.resourceUi.directory.k004}>
									{MANUFACTURERS_HUB_CARD_CTA}
									<ArrowRight size={14} aria-hidden />
								</span>
							</Link>
						</Reveal>
					);
				})}
			</div>
		</ResourceBand>
	),
};
