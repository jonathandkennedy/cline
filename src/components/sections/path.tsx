import {
	ArrowRight,
	BookOpen,
	Factory,
	FileText,
	GraduationCap,
	HelpCircle,
	type LucideIcon,
	Star,
} from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { Reveal } from '@/components';
import Link from '@/components/link';
import { PrimaryCallCta } from '@/components/fields/primarycall';
import type { HomeClaimPathTile } from '@/lib/cms';
import { HOME_CLAIM_PATH, PRIMARY_ELIGIBILITY_CTA } from '@/lib/cms';
import { components } from '@/kit/theme';
import { cn } from '@/kit/shared';

type ResourceTileProps = {
	tile: HomeClaimPathTile;
	delay: number;
};

type PathEligibilityLinkProps = {
	className?: string;
};

export const HOME_SECTION_H2 = components.homeSectionH2;
export const HOME_SECTION_BODY = components.homeSectionBody;
export const HOME_SECTION_GRID_MT = components.homeSectionGridMt;
export const HOME_SECTION_HEADER_ROW = components.homeSectionHeaderRow;
export const HOME_SECTION_ELIGIBILITY_LINK = components.homeSectionEligibilityLink;

const TILE_ICONS: Record<string, LucideIcon> = {
	factory: Factory,
	'file-text': FileText,
	'help-circle': HelpCircle,
	star: Star,
	book: BookOpen,
	graduation: GraduationCap,
};

function ResourceTile({ tile, delay }: ResourceTileProps) {
	const Icon = TILE_ICONS[tile.icon] ?? BookOpen;

	return (
		<Reveal delay={delay} className={components.homeFullHeight}>
			<Link href={tile.href} className={components.homePathTileLink}>
				<div className={components.homePathTileMedia}>
					{tile.image ? (
						<Image
							src={tile.image}
							alt=""
							fill
							sizes="(min-width: 1024px) 360px, 50vw"
							className={components.homePathTileImage}
						/>
					) : (
						<div aria-hidden className={components.homePathTilePlaceholder} />
					)}
					<div aria-hidden className={components.homePathTileOverlay} />
				</div>
				<div className={components.homePathTileBody}>
					<span className={components.homeIconWellGold}>
						<Icon size={18} aria-hidden />
					</span>
					<h3 className={components.homePathTileTitle}>{tile.title}</h3>
					<p className={components.homePathTileBodyText}>{tile.body}</p>
					<span className={components.homePathTileCta}>
						{tile.cta}
						<ArrowRight size={14} className={components.homePathTileCtaIcon} aria-hidden />
					</span>
				</div>
			</Link>
		</Reveal>
	);
}

export function PathEligibilityLink({ className }: PathEligibilityLinkProps) {
	return (
		<PrimaryCallCta
			leadContextId="home-final-cta"
			className={cn(components.homeSectionEligibilityLink, className)}
			arrowSize={14}
		/>
	);
}

function PathComponent() {
	return (
		<section className={components.homePathRoot}>
			<div className={components.homePathInner}>
				<Reveal>
					<span className={components.sectionEyebrow}>{HOME_CLAIM_PATH.eyebrow}</span>
					<h2 className={components.homeSectionH2}>{HOME_CLAIM_PATH.headline}</h2>
					<p className={components.homeSectionBody}>{HOME_CLAIM_PATH.body}</p>
				</Reveal>

				<ul className={cn(components.homeSectionGridMt, components.homePathGrid)}>
					{HOME_CLAIM_PATH.tiles.map((tile, index) => (
						<li key={tile.id} className={components.homeFullHeight}>
							<ResourceTile tile={tile} delay={index * 40} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export const Path = memo(PathComponent);
