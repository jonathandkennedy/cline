import { BRAND, UI_COPY } from '@/lib/cms';
import { formatBrandTemplate } from '@/lib/cms/brandtemplate';
import { escHtml } from '@/lib/email/escape';
import { EMAIL_BRAND, emailShellStyles } from '@/lib/email/styles';
import type { CaseReviewLead } from '@/lib/email/types';

function row(label: string, value: string) {
	if (!value.trim()) return '';
	return `<tr>
  <td style="padding:10px 0;border-bottom:1px solid ${EMAIL_BRAND.line};vertical-align:top;width:38%;">
    <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">${escHtml(label)}</span>
  </td>
  <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${EMAIL_BRAND.line};font-size:15px;line-height:1.45;color:${EMAIL_BRAND.text};">${escHtml(value)}</td>
</tr>`;
}

function fill(template: string, vars: Record<string, string>) {
	return Object.entries(vars).reduce(
		(out, [key, value]) => out.replaceAll(`{${key}}`, value),
		template,
	);
}

export function buildAttorneyNotificationEmail(lead: CaseReviewLead): {
	subject: string;
	html: string;
	text: string;
} {
	const copy = UI_COPY.emails;
	const contextLine = lead.context?.trim() || 'Website tools';
	const subject = fill(copy.attorneySubjectTemplate, {
		name: lead.name,
		vehicle: lead.vehicle,
	});
	const heading = fill(copy.attorneyHeadingTemplate, { name: lead.name });
	const intro = fill(copy.attorneyIntroTemplate, {
		context: contextLine,
		submittedAt: lead.submittedAt,
	});
	const followUp = formatBrandTemplate(copy.attorneyFollowUpTemplate);
	const estimateLine = lead.estimate?.trim();

	const text = [
		subject,
		'',
		`Name: ${lead.name}`,
		`Phone: ${lead.phone}`,
		`Email: ${lead.email}`,
		`Vehicle: ${lead.vehicle} (${lead.vehicleType})`,
		lead.issue ? `Issue: ${lead.issue}` : '',
		`Source: ${contextLine}`,
		lead.source ? `Embed mode: ${lead.source}` : '',
		estimateLine ? `Estimate: ${estimateLine}` : '',
		lead.pageUrl ? `Page: ${lead.pageUrl}` : '',
		lead.embedUrl ? `Embed: ${lead.embedUrl}` : '',
		`Submitted: ${lead.submittedAt}`,
		'',
		`${BRAND.phoneDisplay} · ${BRAND.email}`,
	]
		.filter(Boolean)
		.join('\n');

	const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escHtml(subject)}</title>
<style>${emailShellStyles()}</style>
</head>
<body>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${EMAIL_BRAND.navy};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${EMAIL_BRAND.navyPanel};border:1px solid ${EMAIL_BRAND.line};border-radius:12px;overflow:hidden;">
<tr><td style="padding:28px 28px 20px;border-bottom:3px solid ${EMAIL_BRAND.gold};">
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${EMAIL_BRAND.goldSoft};">${escHtml(copy.attorneyEyebrow)}</p>
  <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:${EMAIL_BRAND.text};">${escHtml(heading)}</h1>
  <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:${EMAIL_BRAND.muted};">${escHtml(intro)}</p>
</td></tr>
<tr><td style="padding:8px 28px 24px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    ${row('Name', lead.name)}
    ${row('Phone', lead.phone)}
    ${row('Email', lead.email)}
    ${row('Vehicle', `${lead.vehicle} (${lead.vehicleType})`)}
    ${lead.issue ? row('Issue', lead.issue) : ''}
    ${estimateLine ? row('Estimate', estimateLine) : ''}
    ${lead.source ? row('Embed', lead.source) : ''}
    ${lead.pageUrl ? row('Page URL', lead.pageUrl) : ''}
    ${lead.embedUrl ? row('Embed URL', lead.embedUrl) : ''}
  </table>
  <p style="margin:24px 0 0;padding:16px;border-radius:10px;background:rgba(188,143,13,0.12);border:1px solid rgba(201,162,39,0.35);font-size:13px;line-height:1.55;color:${EMAIL_BRAND.text};">
    ${escHtml(followUp)}
  </p>
</td></tr>
<tr><td style="padding:18px 28px;background:rgba(0,0,0,0.25);font-size:12px;line-height:1.5;color:${EMAIL_BRAND.muted};">
  ${escHtml(BRAND.legalName)} · ${escHtml(BRAND.phoneDisplay)} · <a href="mailto:${escHtml(BRAND.email)}">${escHtml(BRAND.email)}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

	return { subject, html, text };
}
