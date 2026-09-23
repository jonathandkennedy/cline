import { Card } from '@/kit/shared';
import type { Tool } from '@/lib/cms/types';
import { TOOL_ICONS } from '@/lib/icons';

export function ToolCard({ tool, index }: { tool: Tool; index: number }) {
	const Icon = TOOL_ICONS[tool.icon];
	return (
		<Card
			href={`/tool/${tool.slug}`}
			title={tool.title}
			description={tool.description}
			cta={tool.cta}
			minutes={tool.minutes}
			badge={tool.badge}
			index={index}
			icon={<Icon size={26} className="text-gold" />}
		/>
	);
}
