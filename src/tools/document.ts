import { BRAND, UI_COPY, formatBrandTemplate } from '@/lib/cms';
import { buildReportStyles } from '@/tools/printing';

function esc(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function buildReportHtml({
	allItems,
	checked,
	notes,
	progress,
	checkedCount,
	logoUrl,
	dateStr,
}: {
	allItems: string[];
	checked: Record<string, boolean>;
	notes: string;
	progress: number;
	checkedCount: number;
	logoUrl: string;
	dateStr: string;
}) {
	const report = UI_COPY.checklistReport;
	const have = allItems.filter((i) => checked[i]);
	const need = allItems.filter((i) => !checked[i]);

	const haveHtml = have.length
		? have.map((i) => `<li>${esc(i)}</li>`).join('')
		: '<li class="empty">None gathered yet.</li>';
	const needHtml = need.length
		? need.map((i) => `<li>${esc(i)}</li>`).join('')
		: '<li class="empty">Nothing. Your packet is complete.</li>';

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(formatBrandTemplate(UI_COPY.chrome.documentReportTitle))}</title>
<style>${buildReportStyles()}</style>
</head>
<body class="letter-doc">
<header class="dochead">
  <div class="dochead__inner">
    <div class="dochead__brand">
      <img class="dochead__logo" src="${esc(logoUrl)}" width="114" height="38" alt="${esc(BRAND.name)}">
      <div>
        <p class="dochead__kicker">California Lemon Law</p>
        <h1 class="dochead__title">Case Documentation Packet</h1>
      </div>
    </div>
    <dl class="dochead__facts">
      <div class="dochead__fact">
        <dt>Prepared</dt>
        <dd>${esc(dateStr)}</dd>
      </div>
      <div class="dochead__fact">
        <dt>Contact</dt>
        <dd>${esc(BRAND.phoneDisplay)}</dd>
      </div>
    </dl>
  </div>
</header>

<main class="doc">
  <div class="shell">
    <section class="summary" aria-label="Completion summary">
      <div>
        <p class="summary__eyebrow">${esc(report.packetStatusEyebrow)}</p>
        <h2 class="summary__headline">${esc(report.summaryHeadline)}</h2>
        <p class="summary__copy">${esc(report.summaryCopy)}</p>
      </div>
      <div class="summary__meter" aria-hidden="true">
        <div class="summary__pct">${progress}<span>%</span></div>
        <div class="summary__bar"><i style="width:${progress}%"></i></div>
        <div class="summary__count">${checkedCount} of ${allItems.length} items gathered</div>
      </div>
    </section>

    <div class="grid">
      <section class="panel">
        <div class="panel__head">
          <h3 class="panel__title">${esc(report.documentsOnHand)}</h3>
          <span class="panel__badge panel__badge--have">${have.length}</span>
        </div>
        <div class="panel__body">
          <ul class="list list--have">${haveHtml}</ul>
        </div>
      </section>

      <section class="panel">
        <div class="panel__head">
          <h3 class="panel__title">${esc(report.stillNeeded)}</h3>
          <span class="panel__badge panel__badge--need">${need.length}</span>
        </div>
        <div class="panel__body">
          <ul class="list list--need">${needHtml}</ul>
        </div>
      </section>
    </div>

    <section class="notes">
      <div class="notes__head">
        <h3 class="notes__title">${esc(report.caseNotesTitle)}</h3>
      </div>
      ${
				notes
					? `<p class="notes__body">${esc(notes)}</p>`
					: `<p class="notes__body notes__empty">${esc(report.noNotes)}</p>`
			}
    </section>
  </div>
</main>

<footer class="docfoot">
  <div class="docfoot__inner">
    <span class="docfoot__rule" aria-hidden="true"></span>
    <strong>${esc(BRAND.legalName)}.</strong>
    ${esc(formatBrandTemplate(report.footerPrepared))}
    ${esc(report.footerNotAdvice)} <strong>${esc(BRAND.phoneDisplay)}</strong>
    ${esc(report.footerCaseReview)}
  </div>
</footer>
</body>
</html>`;
}
