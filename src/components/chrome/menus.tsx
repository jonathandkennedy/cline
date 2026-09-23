'use client';

import { ArrowRight } from 'lucide-react';
import type { RefObject } from 'react';
import { Flyout } from '@/kit/shared';
import { components } from '@/kit/theme';
import { CaseReviewCtaButton } from '@/components/fields/reviewcta';
import Link from '@/components/link';
import { RESOURCE_MEGA, RESOURCE_TOOLS_STRIP } from '@/lib/cms/tables/pages';
import { RESOURCE_HEADER_NAV_ITEMS } from '@/lib/cms/tables/config';
import { Catalog } from './catalog';
import { Mega } from './mega';

type MenusProps = {
	megaFlyoutRef: RefObject<HTMLDivElement | null>;
	megaOpen: boolean;
	activeMega: 'tools' | 'resources' | null;
	onMouseEnter: () => void;
	closeToolsOnNavigate: () => void;
};

export function Menus({
	megaFlyoutRef,
	megaOpen,
	activeMega,
	onMouseEnter,
	closeToolsOnNavigate,
}: MenusProps) {
	return (
		<Flyout
			ref={megaFlyoutRef}
			open={megaOpen}
			id={activeMega === 'resources' ? 'resources-megamenu' : 'tools-megamenu'}
			ariaLabel={activeMega === 'resources' ? 'Resources' : RESOURCE_TOOLS_STRIP.eyebrow}
			onMouseEnter={onMouseEnter}
		>
			{activeMega === 'tools' ? (
				<div className={components.shell}>
					<div className={components.flyout.panel}>
						<div className={components.flyout.toolsGrid}>
							<Mega onNavigate={closeToolsOnNavigate} />
						</div>
						<div className={components.flyout.footerBar}>
							<span className={components.flyout.footerNote}>
								{RESOURCE_TOOLS_STRIP.footerNote}
							</span>
							<CaseReviewCtaButton
								leadContextId="shell"
								onActivate={closeToolsOnNavigate}
								className={components.flyout.footerCta}
							>
								{RESOURCE_TOOLS_STRIP.footerCtaLabel} <ArrowRight size={14} />
							</CaseReviewCtaButton>
						</div>
					</div>
				</div>
			) : null}
			{activeMega === 'resources' ? (
				<div className={components.shell}>
					<div className={components.flyout.panel}>
						<Catalog items={RESOURCE_HEADER_NAV_ITEMS} onNavigate={closeToolsOnNavigate} />
						<div className={components.flyout.footerBar}>
							<span className={components.flyout.footerNote}>{RESOURCE_MEGA.footerNote}</span>
							<Link
								href={RESOURCE_MEGA.footerCtaHref}
								onClick={closeToolsOnNavigate}
								className={components.flyout.footerCta}
							>
								{RESOURCE_MEGA.footerCtaLabel} <ArrowRight size={14} />
							</Link>
						</div>
					</div>
				</div>
			) : null}
		</Flyout>
	);
}
