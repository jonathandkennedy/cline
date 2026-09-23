'use client';

import { type MouseEvent, useEffect, useState } from 'react';
import { scrollWindowToElement } from '@/kit/ui/functions/window';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';
import { RESOURCE_ASIDE_SECTION_LABEL_CLASS } from '@/kit/blocks/rhythm';

const SECTION_NAV_ATTR = 'data-resource-section-nav';

function onCaseStudySectionLinkClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
	event.preventDefault();
	const section = document.getElementById(id);
	if (!section) return;
	const stickySectionNav = document.querySelector<HTMLElement>(`nav[${SECTION_NAV_ATTR}]`);
	scrollWindowToElement(section, {
		belowHeaderClearance: stickySectionNav,
	});
	const url = `${window.location.pathname}${window.location.search}#${id}`;
	window.history.pushState(null, '', url);
}

function bindCaseStudySectionLinkClick(id: string) {
	return function handleCaseStudySectionLinkClick(event: MouseEvent<HTMLAnchorElement>) {
		onCaseStudySectionLinkClick(event, id);
	};
}

export function CaseStudySectionNav({
	label,
	items,
}: {
	label: string;
	items: readonly { id: string; label: string }[];
}) {
	const [activeId, setActiveId] = useState(items[0]?.id ?? '');

	useEffect(() => {
		const sections = items
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]?.target.id) {
					setActiveId(visible[0].target.id);
				}
			},
			{
				rootMargin: '-20% 0px -55% 0px',
				threshold: [0, 0.15, 0.35, 0.55],
			},
		);

		for (const section of sections) {
			observer.observe(section);
		}
		return () => observer.disconnect();
	}, [items]);

	return (
		<nav aria-label={label} data-resource-section-nav="" className={components.resourceUi.toc.k001}>
			<div className={components.resourceUi.toc.k002}>
				<div aria-hidden className={components.resourceUi.toc.k003} />
				<div aria-hidden className={components.resourceUi.toc.k004} />
				<ul className={components.resourceUi.toc.k005}>
					{items.map((item) => {
						const active = item.id === activeId;
						return (
							<li key={item.id} className="shrink-0">
								<a
									href={`#${item.id}`}
									onClick={bindCaseStudySectionLinkClick(item.id)}
									aria-current={active ? 'location' : undefined}
									className={cn(
										components.resourceUi.toc.k009,
										active
											? 'border-gold/40 bg-gold/10 text-gold'
											: 'border-line/50 bg-surface/30 text-muted hover:border-gold/30 hover:text-gold-soft',
									)}
								>
									{item.label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

export function CaseStudyDesktopToc({
	label,
	items,
}: {
	label: string;
	items: readonly { id: string; label: string }[];
}) {
	return (
		<nav aria-label={label} className={components.resourceUi.toc.k006}>
			<p className={RESOURCE_ASIDE_SECTION_LABEL_CLASS}>{label}</p>
			<ul className={components.resourceUi.toc.k007}>
				{items.map((entry) => (
					<li key={entry.id}>
						<a
							href={`#${entry.id}`}
							onClick={bindCaseStudySectionLinkClick(entry.id)}
							className={components.resourceUi.toc.k008}
						>
							{entry.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
