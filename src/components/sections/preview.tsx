import { Check } from 'lucide-react';
import type { ReactElement } from 'react';
import {
	TOOL_PREVIEW_CONFIG,
	type ToolPreviewChecklist,
	type ToolPreviewChips,
	type ToolPreviewConfig,
	type ToolPreviewRecovery,
	type ToolSlug,
} from '@/lib/cms';
import { components } from '@/kit/theme';
import { cn } from '@/kit/shared';

type PreviewProps = {
	slug: ToolSlug;
};

function ChipsPreview({ config }: { config: ToolPreviewChips }) {
	return (
		<div className={components.preview.frame} aria-hidden="true">
			<div className={components.previewFrameHeader}>
				<span className={components.preview.railLabel}>{config.railLabel}</span>
				<span className={components.previewRecoveryBadge}>{config.badgeLabel}</span>
			</div>
			<div className={components.preview.progressTrack}>
				<div className={components.preview.progressBar} />
			</div>
			<div className={components.preview.chipRow}>
				{config.chips.map((c) => (
					<span key={c} className={components.preview.chip}>
						{c}
					</span>
				))}
			</div>
		</div>
	);
}

function RecoveryPreview({ config }: { config: ToolPreviewRecovery }) {
	return (
		<div className={components.preview.frame} aria-hidden="true">
			<span className={components.preview.railLabel}>Estimated recovery</span>
			<span className={components.preview.recoveryAmount}>{config.amount}</span>
			<div className={components.preview.segmentStack}>
				{config.segments.map((seg) => (
					<span key={seg.className} className={seg.className} />
				))}
			</div>
		</div>
	);
}

function ChecklistPreview({ config }: { config: ToolPreviewChecklist }) {
	return (
		<div className={cn(components.preview.frame, components.preview.frameGap)} aria-hidden="true">
			{config.rows.map(({ label, done }) => (
				<div key={label} className={components.preview.checkRow}>
					<span
						className={cn(
							components.previewCheckBox,
							done ? components.preview.checkBoxDone : components.preview.checkBoxIdle,
						)}
					>
						{done && <Check size={11} strokeWidth={3} />}
					</span>
					<span className={components.preview.checkLabel}>{label}</span>
				</div>
			))}
		</div>
	);
}

const TOOL_PREVIEW_BY_KIND: Record<
	ToolPreviewConfig['kind'],
	(props: { config: ToolPreviewConfig }) => ReactElement
> = {
	chips: ChipsPreview as (props: { config: ToolPreviewConfig }) => ReactElement,
	recovery: RecoveryPreview as (props: { config: ToolPreviewConfig }) => ReactElement,
	checklist: ChecklistPreview as (props: { config: ToolPreviewConfig }) => ReactElement,
};

export function Preview({ slug }: PreviewProps) {
	const config = TOOL_PREVIEW_CONFIG[slug];
	const Preview = TOOL_PREVIEW_BY_KIND[config.kind];
	return <Preview config={config} />;
}
