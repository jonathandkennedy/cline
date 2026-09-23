'use client';

import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { CaseReviewCtaButton, PhoneCta, Reveal } from '@/components';
import { FirmManufacturerLogoGrid } from '@/lib/site/resources/grid';
import { cn } from '@/kit/ui/functions/cn';
import { components } from '@/kit/theme';
import { VALUE_PROP_ICONS } from '@/lib/icons';
import { formatBrandTemplate } from '@/lib/cms';
import { BRAND, FOUNDER_STATS, THE_FIRM_SECTIONS, UI_COPY, VALUE_PROPS } from '@/lib/site';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { ResourceBand } from '@/kit/blocks/spotlight';

export const theFirmKinds: SiteComponentKindMap = {
	'firm.mission': () => {
		const { mission } = THE_FIRM_SECTIONS;
		return (
			<ResourceBand borderTop={false} pad="match">
				<div className={components.resourceUi.firm.k001}>
					<div className={components.resourceUi.firm.k002}>
						<Reveal delay={40}>
							<FirmManufacturerLogoGrid />
						</Reveal>
					</div>
					<div className={components.resourceUi.firm.k003}>
						<Reveal>
							<span className="eyebrow">{mission.eyebrow}</span>
							<h2 className={components.resourceUi.firm.k004}>{mission.headline}</h2>
							<div className={components.resourceUi.firm.k005}>
								{mission.paragraphs.map((p) => (
									<p key={p.slice(0, 24)}>{p}</p>
								))}
							</div>
						</Reveal>
					</div>
				</div>
			</ResourceBand>
		);
	},
	'firm.pillars': () => (
		<ResourceBand bleedClassName="bg-ink/25" pad="match">
			<div className={components.resourceUi.firm.k006}>
				{VALUE_PROPS.map((v, i) => {
					const Icon = VALUE_PROP_ICONS[v.icon];
					return (
						<Reveal key={v.title} delay={i * 40} className={components.resourceUi.shared.k024}>
							<div
								className={cn(
									components.resourceUi.firm.k031,
									'flex-row items-start',
									i === 0 && 'border-gold/20',
								)}
							>
								<div className={components.resourceUi.firm.k007}>
									<Icon size={18} className="text-gold" />
								</div>
								<div className={components.resourceUi.shared.k001}>
									<h3 className={components.resourceUi.firm.k008}>{v.title}</h3>
									<p className={components.resourceUi.firm.k009}>{formatBrandTemplate(v.body)}</p>
								</div>
							</div>
						</Reveal>
					);
				})}
			</div>
		</ResourceBand>
	),
	'firm.founder': () => {
		const { founder } = THE_FIRM_SECTIONS;
		return (
			<ResourceBand>
				<div className={components.resourceUi.firm.k010}>
					<Reveal>
						<div className={components.resourceUi.firm.k011}>
							<div aria-hidden className={components.resourceUi.firm.k012} />
							<div className={components.resourceUi.firm.k013}>
								<div className={components.resourceUi.firm.k014}>
									<Image
										src="/images/brian-cline-capture-portrait.jpg"
										alt={UI_COPY.home.founderImageAlt}
										fill
										sizes="(max-width: 768px) 90vw, 420px"
										className={components.resourceUi.firm.k015}
									/>
									<div className={components.resourceUi.firm.k016} />
									<div className={components.resourceUi.firm.k017}>
										<div className={components.resourceUi.firm.k018}>{BRAND.founder}</div>
										<div className={components.resourceUi.firm.k019}>{founder.roleLabel}</div>
									</div>
								</div>
							</div>
						</div>
					</Reveal>
					<Reveal delay={90}>
						<span className="eyebrow">{founder.eyebrow}</span>
						<h2 className={components.resourceUi.shared.k025}>{founder.headline}</h2>
						{founder.paragraphs.map((p, i) => (
							<p
								key={p.slice(0, 24)}
								className={cn(components.resourceUi.firm.k032, i === 0 ? 'mt-5' : 'mt-3.5')}
							>
								{p.replace('{founder}', BRAND.founder)}
							</p>
						))}
						<div className={components.resourceUi.firm.k020}>
							{FOUNDER_STATS.map((b) => (
								<div key={b.stat} className={components.resourceUi.firm.k021}>
									<div className={components.resourceUi.firm.k022}>{b.stat}</div>
									<div className={components.resourceUi.firm.k023}>{b.label}</div>
								</div>
							))}
						</div>
						<div className={components.resourceUi.firm.k024}>
							<CaseReviewCtaButton leadContextId="the-firm" className="btn btn-primary btn-md">
								{founder.ctaLabel} <ArrowRight size={16} />
							</CaseReviewCtaButton>
							<PhoneCta size="md" />
						</div>
					</Reveal>
				</div>
			</ResourceBand>
		);
	},
	'firm.statewide': () => {
		const { statewide } = THE_FIRM_SECTIONS;
		return (
			<ResourceBand bleedClassName="bg-ink/30" pad="match">
				<div className={components.resourceUi.firm.k025}>
					<Reveal>
						<span className="eyebrow">{statewide.eyebrow}</span>
						<h2 className={components.resourceUi.shared.k025}>{statewide.headline}</h2>
						<p className={components.resourceUi.firm.k026}>{statewide.body}</p>
					</Reveal>
					<Reveal delay={60}>
						<ul className={components.resourceUi.firm.k027}>
							{statewide.regions.map((region) => (
								<li key={region} className={components.resourceUi.firm.k028}>
									<MapPin size={16} className={components.resourceUi.firm.k029} aria-hidden />
									<span className={components.resourceUi.firm.k030}>{region}</span>
								</li>
							))}
						</ul>
					</Reveal>
				</div>
			</ResourceBand>
		);
	},
};
