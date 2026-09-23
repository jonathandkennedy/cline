'use client';

import { type ChangeEvent, useCallback } from 'react';
import { CHECKLIST, CHECKLIST_UI, UI_COPY } from '@/lib/cms';
import { CheckRow } from '@/tools/surface';
import { TOOL_SECTION_LABEL_GOLD_CLASS } from '@/tools/tokens';
import { DocumentationUpload } from '@/tools/uploads';

export function DocumentationChecklistContent({
	checked,
	notes,
	onToggle,
	onToggleCategory,
	onNotesChange,
	attachments,
	onAddAttachments,
	onRemoveAttachment,
}: {
	checked: Record<string, boolean>;
	notes: string;
	onToggle: (item: string) => void;
	onToggleCategory: (items: readonly string[]) => void;
	onNotesChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	attachments: readonly File[];
	onAddAttachments: (files: FileList | File[]) => void;
	onRemoveAttachment: (index: number) => void;
}) {
	const handleToggleCategory = useCallback(
		(items: readonly string[]) => () => onToggleCategory(items),
		[onToggleCategory],
	);

	const handleToggle = useCallback((item: string) => () => onToggle(item), [onToggle]);

	return (
		<>
			{CHECKLIST.map((cat, idx) => {
				const catDone = cat.items.filter((i) => checked[i]).length;
				const allOn = catDone === cat.items.length;
				return (
					<div key={cat.name}>
						{idx > 0 && <hr className="tool-divider" />}
						<div className="flex flex-wrap items-center justify-between gap-2 gap-y-1">
							<span className={TOOL_SECTION_LABEL_GOLD_CLASS}>{cat.name}</span>
							<div className="flex items-center gap-2.5">
								<span className="tool-actions__meta tabular !px-2 !py-0.5 !text-[10.5px]">
									{catDone}/{cat.items.length}
								</span>
								<button
									type="button"
									onClick={handleToggleCategory(cat.items)}
									className="btn-ghost min-h-[44px] px-3 text-[12px] font-semibold text-cta transition hover:text-cta/80"
									aria-label={
										allOn ? `Clear all items in ${cat.name}` : `Select all items in ${cat.name}`
									}
								>
									{allOn ? CHECKLIST_UI.clearAll : CHECKLIST_UI.selectAll}
								</button>
							</div>
						</div>
						<div className="mt-3 space-y-0.5">
							{cat.items.map((item) => (
								<CheckRow
									key={item}
									item={item}
									checked={!!checked[item]}
									onToggle={handleToggle(item)}
								/>
							))}
						</div>
					</div>
				);
			})}

			<hr className="tool-divider" />

			<DocumentationUpload
				files={attachments}
				onAdd={onAddAttachments}
				onRemove={onRemoveAttachment}
			/>

			<hr className="tool-divider" />

			<span className={TOOL_SECTION_LABEL_GOLD_CLASS}>{CHECKLIST_UI.caseNotesLabel}</span>
			<textarea
				value={notes}
				onChange={onNotesChange}
				placeholder={UI_COPY.tools.checklistNotePlaceholder}
				aria-label={CHECKLIST_UI.caseNotesAria}
				className="tool-notes-field input mt-3 px-3 py-3"
			/>
		</>
	);
}
