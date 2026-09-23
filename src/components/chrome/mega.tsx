'use client';

import { ArrowRight } from 'lucide-react';
import { Motion } from '@/kit/shared';
import { Preview } from '@/components/sections/preview';
import { components } from '@/kit/theme';
import { TOOLS, type Tool } from '@/lib/cms';
import { shortToolName, TOOL_ICONS, type ToolIconId } from '@/lib/icons';

type MegaMenuCardProps = {
	tool: Tool;
	index: number;
	onNavigate?: () => void;
};

type MegaProps = {
	onNavigate?: () => void;
};

function MegaMenuCard({ tool, index, onNavigate }: MegaMenuCardProps) {
	const Icon = TOOL_ICONS[tool.icon as ToolIconId];
	return (
		<Motion
			index={index}
			href={`/tool/${tool.slug}`}
			onClick={onNavigate}
			className={components.mega.card}
		>
			<div aria-hidden className={components.mega.cardAccent} />
			<div className={components.megaCardHeaderRow}>
				<span className={components.mega.iconWrap}>
					<Icon size={19} className={components.homeHeroPropIcon} />
				</span>
				<div className={components.megaCardCopy}>
					<div className={components.megaBadgeRow}>
						<h3 className={components.mega.title}>{shortToolName(tool.title)}</h3>
						{tool.badge ? (
							<span
								className={
									tool.badge === 'Start Here'
										? components.megaBadgeGold
										: components.megaBadgeNeutral
								}
							>
								{tool.badge}
							</span>
						) : null}
					</div>
					<span className={components.mega.minutes}>{tool.minutes}</span>
				</div>
			</div>

			<div className={components.mega.previewWrap}>
				<Preview slug={tool.slug} />
			</div>

			<p className={components.mega.blurb}>{tool.short}</p>

			<span className={components.mega.cardCta}>
				{tool.cta} <ArrowRight size={14} />
			</span>
		</Motion>
	);
}

export function Mega({ onNavigate }: MegaProps) {
	return TOOLS.map((tool, index) => (
		<MegaMenuCard key={tool.slug} tool={tool} index={index} onNavigate={onNavigate} />
	));
}
