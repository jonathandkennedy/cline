'use client';

import { Info } from 'lucide-react';
import { useCallback } from 'react';
import { ToolSessionNotice, ToolWorkbench } from '@/components';
import {
	CHECKLIST_FOOT_DISCLAIMER_ITEMS,
	CHECKLIST_FOOT_LINK_ITEMS,
	formatChecklistHeaderProgress,
	UI_COPY,
} from '@/lib/cms';
import { DocumentationChecklistRail, DocumentationStickyBar } from '@/tools/aside';
import { DocumentationChecklistContent } from '@/tools/body';
import type { OpenLead } from '@/tools/shared';
import { ToolWorkbenchActions } from '@/tools/toolbar';
import { useDocumentationChecklist } from '@/tools/tracker';

export function DocumentationChecklist({
	onOpenLead,
	onRestart,
}: {
	onOpenLead: OpenLead;
	onRestart: () => void;
}) {
	const {
		showResume,
		reportCopied,
		checked,
		notes,
		allItems,
		checkedCount,
		progress,
		complete,
		toggle,
		toggleCategory,
		startOver,
		dismissResume,
		generateReport,
		handleNotesChange,
		addAttachments,
		removeAttachment,
		leadPrefill,
		attachments,
	} = useDocumentationChecklist(onRestart);

	const openFootLead = useCallback(() => onOpenLead(leadPrefill()), [onOpenLead, leadPrefill]);

	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="tool-canvas">
				<ToolWorkbench
					headerLead={
						<span className="workbench-head__meta tabular">
							<span className="sm:hidden">
								{formatChecklistHeaderProgress('{checked}/{total}', checkedCount, allItems.length)}
							</span>
							<span className="hidden sm:inline">
								{formatChecklistHeaderProgress(
									UI_COPY.tools.checklistProgressTemplate,
									checkedCount,
									allItems.length,
								)}
							</span>
						</span>
					}
					progress={{
						percent: progress,
						ariaLabel: UI_COPY.tools.checklistProgressAria,
					}}
					notice={
						showResume ? (
							<ToolSessionNotice
								message={UI_COPY.tools.checklistRestoredBanner}
								onDismiss={dismissResume}
							/>
						) : undefined
					}
					headerAside={<ToolWorkbenchActions onReset={startOver} />}
					rail={
						<DocumentationChecklistRail
							complete={complete}
							progress={progress}
							checkedCount={checkedCount}
							allItemsCount={allItems.length}
							reportCopied={reportCopied}
							onGenerateReport={generateReport}
							onOpenLead={onOpenLead}
							leadPrefill={leadPrefill}
						/>
					}
					foot={
						<>
							<Info size={13} className="mt-0.5 shrink-0 text-subtle" />
							<span>
								{CHECKLIST_FOOT_DISCLAIMER_ITEMS.map((text) => (
									<span key={text}>{text}</span>
								))}{' '}
								{CHECKLIST_FOOT_LINK_ITEMS.map((link) => (
									<button
										key={link.label}
										type="button"
										onClick={openFootLead}
										className="text-gold/80 underline underline-offset-2 transition hover:text-gold"
									>
										{link.label}
									</button>
								))}
								.
							</span>
						</>
					}
				>
					<DocumentationChecklistContent
						checked={checked}
						notes={notes}
						onToggle={toggle}
						onToggleCategory={toggleCategory}
						onNotesChange={handleNotesChange}
						attachments={attachments}
						onAddAttachments={addAttachments}
						onRemoveAttachment={removeAttachment}
					/>
				</ToolWorkbench>
			</div>

			<DocumentationStickyBar
				progress={progress}
				onOpenLead={onOpenLead}
				leadPrefill={leadPrefill}
				complete={complete}
			/>
		</div>
	);
}
