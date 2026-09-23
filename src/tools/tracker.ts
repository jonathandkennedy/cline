import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { mergeCaseAttachments } from '@/lib/attachments';
import { STORAGE_KEYS } from '@/lib/constants';
import { checklistHasProgress } from '@/lib/milestone';
import { CHECKLIST } from '@/lib/cms';
import { clearStore, loadStore, saveStore } from '@/lib/storage';
import type { DocumentationPersistedState } from '@/lib/vault';
import { buildChecklistLeadIssue, generateDocumentationReport } from '@/tools/export';

export function useDocumentationChecklist(onRestart: () => void) {
	const [initialState] = useState(() => loadStore<DocumentationPersistedState>(STORAGE_KEYS.docs));
	const [showResume, setShowResume] = useState(() => checklistHasProgress(initialState));
	const [reportCopied, setReportCopied] = useState(false);
	const [checked, setChecked] = useState<Record<string, boolean>>(
		() => initialState?.checked ?? {},
	);
	const [notes, setNotes] = useState(() => initialState?.notes ?? '');
	const [attachments, setAttachments] = useState<File[]>([]);

	const allItems = CHECKLIST.flatMap((c) => c.items);
	const checkedCount = allItems.filter((i) => checked[i]).length;
	const progress = Math.round((checkedCount / Math.max(allItems.length, 1)) * 100);
	const complete = checkedCount > 0 && checkedCount === allItems.length;

	useEffect(() => {
		saveStore(STORAGE_KEYS.docs, { checked, notes });
	}, [checked, notes]);

	const toggle = useCallback((item: string) => setChecked((p) => ({ ...p, [item]: !p[item] })), []);

	const toggleCategory = useCallback((items: readonly string[]) => {
		setChecked((p) => {
			const allOn = items.every((i) => p[i]);
			const copy = { ...p };
			items.forEach((i) => {
				copy[i] = !allOn;
			});
			return copy;
		});
	}, []);

	const startOver = useCallback(() => {
		setChecked({});
		setNotes('');
		setAttachments([]);
		clearStore(STORAGE_KEYS.docs);
		setShowResume(false);
		onRestart();
	}, [onRestart]);

	const dismissResume = useCallback(() => setShowResume(false), []);

	const handleReportCopied = useCallback(() => {
		setReportCopied(true);
		window.setTimeout(() => setReportCopied(false), 2200);
	}, []);

	const generateReport = useCallback(() => {
		generateDocumentationReport({
			allItems,
			checked,
			notes,
			progress,
			checkedCount,
			onCopied: handleReportCopied,
		});
	}, [allItems, checked, notes, progress, checkedCount, handleReportCopied]);

	const handleNotesChange = useCallback(
		(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
		[],
	);

	const addAttachments = useCallback((incoming: FileList | File[]) => {
		setAttachments((current) => mergeCaseAttachments(current, incoming));
	}, []);

	const removeAttachment = useCallback((index: number) => {
		setAttachments((current) => current.filter((_, i) => i !== index));
	}, []);

	const leadPrefill = useCallback(
		() => ({
			issue: buildChecklistLeadIssue({
				allItems,
				checked,
				notes,
				progress,
				checkedCount,
			}),
			attachments,
		}),
		[allItems, checked, notes, progress, checkedCount, attachments],
	);

	return {
		showResume,
		reportCopied,
		checked,
		notes,
		attachments,
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
	};
}
