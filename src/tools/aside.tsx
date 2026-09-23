'use client';

import { ArrowRight, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { m } from 'motion/react';
import { useCallback } from 'react';
import type { LeadPrefill } from '@/components';
import { ProgressFill } from '@/components/fill';
import { usePrefersReducedMotion } from '@/hooks';
import { motionFadeUpHidden, motionFadeUpVisible, motionTransition } from '@/kit/ui';
import { CHECKLIST_UI, UI_COPY } from '@/lib/cms';
import { type OpenLead, ToolStickyBar } from '@/tools/shared';

function useChecklistLeadOpen(onOpenLead: OpenLead, leadPrefill: () => LeadPrefill) {
	return useCallback(() => onOpenLead(leadPrefill()), [onOpenLead, leadPrefill]);
}

export function DocumentationChecklistRail({
	complete,
	progress,
	checkedCount,
	allItemsCount,
	reportCopied,
	onGenerateReport,
	onOpenLead,
	leadPrefill,
}: {
	complete: boolean;
	progress: number;
	checkedCount: number;
	allItemsCount: number;
	reportCopied: boolean;
	onGenerateReport: () => void;
	onOpenLead: OpenLead;
	leadPrefill: () => LeadPrefill;
}) {
	const handleOpenLead = useChecklistLeadOpen(onOpenLead, leadPrefill);
	const reducedMotion = usePrefersReducedMotion();

	return (
		<div>
			{complete && (
				<m.div
					initial={motionFadeUpHidden(reducedMotion)}
					animate={motionFadeUpVisible()}
					transition={motionTransition(reducedMotion)}
					className="mb-5 flex items-center gap-3 rounded-xl border border-recovery/40 bg-recovery/10 p-3.5"
				>
					<Sparkles size={18} className="shrink-0 text-recovery" />
					<div>
						<div className="text-[13px] font-semibold text-recovery-soft">
							{CHECKLIST_UI.packetCompleteTitle}
						</div>
						<div className="text-[12px] text-subtle">{CHECKLIST_UI.packetCompleteBody}</div>
					</div>
				</m.div>
			)}

			<div className="eyebrow">{CHECKLIST_UI.packetProgressEyebrow}</div>
			<div
				className={`display mt-2 text-[48px] leading-none ${complete ? 'text-recovery' : 'text-cta'}`}
				aria-hidden="true"
			>
				{progress}
				<span className="align-top text-[22px]">%</span>
			</div>
			<div
				className="progress mt-4"
				role="progressbar"
				aria-label={UI_COPY.tools.checklistProgressAria}
				aria-valuenow={progress}
				aria-valuemin={0}
				aria-valuemax={100}
			>
				<ProgressFill percent={progress} />
			</div>
			<span className="sr-only" aria-live="polite">
				{checkedCount} of {allItemsCount} documents gathered, {progress} percent complete.
			</span>

			<button
				type="button"
				onClick={onGenerateReport}
				className="btn btn-primary btn-lg mt-6 w-full"
			>
				<Printer size={17} />{' '}
				{reportCopied ? (
					<>
						<span className="sm:hidden">{CHECKLIST_UI.reportCopiedShort}</span>
						<span className="hidden sm:inline">{CHECKLIST_UI.reportCopiedLong}</span>
					</>
				) : (
					<>
						<span className="sm:hidden">{CHECKLIST_UI.reportGenerateShort}</span>
						<span className="hidden sm:inline">{CHECKLIST_UI.reportGenerateLong}</span>
					</>
				)}
			</button>
			<button
				type="button"
				onClick={handleOpenLead}
				className="btn btn-secondary btn-md mt-3 w-full"
			>
				{CHECKLIST_UI.sendToCline} <ArrowRight size={15} />
			</button>
			<p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-snug text-faint">
				<ShieldCheck size={13} className="mt-px shrink-0 text-recovery" />
				{CHECKLIST_UI.privacyNote}
			</p>
		</div>
	);
}

export function DocumentationStickyBar({
	progress,
	onOpenLead,
	leadPrefill,
	complete,
}: {
	progress: number;
	onOpenLead: OpenLead;
	leadPrefill: () => LeadPrefill;
	complete?: boolean;
}) {
	const handleOpenLead = useChecklistLeadOpen(onOpenLead, leadPrefill);

	return (
		<ToolStickyBar
			label={complete ? CHECKLIST_UI.stickyCompleteLabel : CHECKLIST_UI.stickyProgressLabel}
			value={`${progress}%`}
			cta={complete ? UI_COPY.tools.checklistSendRail : CHECKLIST_UI.stickySendPacket}
			onClick={handleOpenLead}
			tone={complete ? 'recovery' : 'cta'}
		/>
	);
}
