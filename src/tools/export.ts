import { BRAND, BRAND_LOGO, UI_COPY, formatBrandTemplate } from '@/lib/cms';
import { buildReportHtml } from '@/tools/document';

function buildPlainTextReport({
	allItems,
	checked,
	notes,
	progress,
	checkedCount,
	dateStr,
}: {
	allItems: string[];
	checked: Record<string, boolean>;
	notes: string;
	progress: number;
	checkedCount: number;
	dateStr: string;
}) {
	const have = allItems.filter((i) => checked[i]);
	const need = allItems.filter((i) => !checked[i]);

	return [
		formatBrandTemplate(UI_COPY.chrome.exportPlainHeader),
		BRAND.legalName,
		`Prepared: ${dateStr}`,
		`Completion: ${progress}% (${checkedCount} of ${allItems.length} items)`,
		BRAND.phoneDisplay,
		'',
		UI_COPY.checklistReport.documentsOnHand.toUpperCase(),
		...(have.length ? have.map((i) => `  ✓ ${i}`) : [UI_COPY.checklistReport.noneComplete]),
		'',
		UI_COPY.checklistReport.stillNeeded.toUpperCase(),
		...(need.length ? need.map((i) => `  ○ ${i}`) : [UI_COPY.checklistReport.noneComplete]),
		'',
		'CASE NOTES',
		notes || '(none provided)',
		'',
		formatBrandTemplate(UI_COPY.chrome.exportPreparedLine),
		UI_COPY.checklistReport.disclaimer,
	].join('\n');
}

async function embedPrintLogo(html: string, logoUrl: string) {
	try {
		const res = await fetch(logoUrl);
		if (!res.ok) return html;
		const svg = await res.text();
		const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
		return html.replace(/(<img class="dochead__logo" src=")[^"]*(")/, `$1${dataUri}$2`);
	} catch {
		return html;
	}
}

function openPrintWindow(html: string) {
	// US Letter at ~96dpi so print preview defaults to portrait letter, not A4.
	const w = window.open('', '_blank', 'width=816,height=1056');
	if (!w) return;

	w.document.write(html);
	w.document.close();

	const printDoc = () => {
		w.resizeTo(816, 1056);
		w.focus();
		w.print();
	};

	const logo = w.document.querySelector<HTMLImageElement>('.dochead__logo');
	const afterLogo = () => {
		if (w.document.fonts?.ready) {
			w.document.fonts.ready.then(printDoc).catch(() => {
				window.setTimeout(printDoc, 400);
			});
			return;
		}
		window.setTimeout(printDoc, 400);
	};

	if (logo?.complete) {
		afterLogo();
	} else if (logo) {
		logo.addEventListener('load', afterLogo, { once: true });
		logo.addEventListener('error', afterLogo, { once: true });
	} else {
		afterLogo();
	}
}

export function buildChecklistLeadIssue({
	allItems,
	checked,
	notes,
	progress,
	checkedCount,
}: {
	allItems: string[];
	checked: Record<string, boolean>;
	notes: string;
	progress: number;
	checkedCount: number;
}) {
	const summary = buildPlainTextReport({
		allItems,
		checked,
		notes,
		progress,
		checkedCount,
		dateStr: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	});

	const trimmedNotes = notes.trim();
	if (!trimmedNotes) return summary;
	return `${trimmedNotes}\n\n---\n${summary}`;
}

export function generateDocumentationReport({
	allItems,
	checked,
	notes,
	progress,
	checkedCount,
	onCopied,
}: {
	allItems: string[];
	checked: Record<string, boolean>;
	notes: string;
	progress: number;
	checkedCount: number;
	onCopied: () => void;
}) {
	const dateStr = new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const text = buildPlainTextReport({
		allItems,
		checked,
		notes,
		progress,
		checkedCount,
		dateStr,
	});

	if (navigator.clipboard?.writeText) {
		navigator.clipboard.writeText(text).then(onCopied, () => {});
	}

	// Same mark as site header (LogoMark variant="light" on dark chrome).
	const logoUrl = `${window.location.origin}${BRAND_LOGO.paths.light}`;
	void embedPrintLogo(
		buildReportHtml({
			allItems,
			checked,
			notes,
			progress,
			checkedCount,
			logoUrl,
			dateStr,
		}),
		logoUrl,
	).then(openPrintWindow);
}
