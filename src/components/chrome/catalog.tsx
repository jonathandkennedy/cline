'use client';

import {
	ArrowRight,
	BookOpen,
	Factory,
	FileText,
	HelpCircle,
	MapPin,
	Newspaper,
	Star,
} from 'lucide-react';
import { Motion } from '@/kit/shared';
import { components } from '@/kit/theme';
import { RESOURCE_MEGA, type ResourceNavIconId, type ResourceNavItem } from '@/lib/cms';

type ResourceMegaCardProps = {
	item: ResourceNavItem;
	index: number;
	onNavigate?: () => void;
};

type CatalogProps = {
	items: readonly ResourceNavItem[];
	onNavigate?: () => void;
};

const RESOURCE_NAV_ICON_BY_ID: Record<ResourceNavIconId, typeof Factory> = {
	factory: Factory,
	star: Star,
	'file-text': FileText,
	'help-circle': HelpCircle,
	'book-open': BookOpen,
	newspaper: Newspaper,
	'map-pin': MapPin,
};

function ResourceMegaCard({ item, index, onNavigate }: ResourceMegaCardProps) {
	const Icon = RESOURCE_NAV_ICON_BY_ID[item.icon];
	return (
		<Motion index={index} href={item.href} onClick={onNavigate} className={components.catalog.card}>
			<div className={components.catalogCardRow}>
				<span className={components.catalog.iconWrap}>
					<Icon size={20} className={components.homeHeroPropIcon} aria-hidden />
				</span>
				<div className={components.catalogCardCopy}>
					<h3 className={components.catalog.title}>{item.label}</h3>
					<p className={components.catalog.description}>{item.description}</p>
					<span className={components.catalog.cta}>
						{RESOURCE_MEGA.catalogCtaLabel} <ArrowRight size={14} />
					</span>
				</div>
			</div>
		</Motion>
	);
}

export function Catalog({ items, onNavigate }: CatalogProps) {
	return (
		<div className={components.catalog.grid}>
			{items.map((item, index) => (
				<ResourceMegaCard key={item.id} item={item} index={index} onNavigate={onNavigate} />
			))}
		</div>
	);
}
