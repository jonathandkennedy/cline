import { BRAND, UI_COPY } from '@/lib/cms';
import { formatBrandTemplate } from '@/lib/cms/brandtemplate';
import { escHtml } from '@/lib/email/escape';
import { EMAIL_BRAND, emailShellStyles } from '@/lib/email/styles';
import type { CaseReviewLead } from '@/lib/email/types';

function fill(template: string, vars: Record<string, string>) {
	return Object.entries(vars).reduce(
		(out, [key, value]) => out.replaceAll(`{${key}}`, value),
		template,
	);
}

export function buildClientConfirmationEmail(lead: CaseReviewLead): {
	subject: string;
	html: string;
	text: string;
} {
	const copy = UI_COPY.emails;
	const chrome = UI_COPY.chrome;
	const firstName = lead.name.trim().split(/\s+/)[0] || 'there';
	const subject = formatBrandTemplate(copy.clientSubjectTemplate);
	const greeting = fill(copy.clientGreetingTemplate, { firstName });
	const bodyPlain = formatBrandTemplate(copy.clientBodyTemplate);
	const bodyHtml = escHtml(bodyPlain).replace(
		escHtml(BRAND.name),
		`<strong style="color:${EMAIL_BRAND.goldSoft};">${escHtml(BRAND.name)}</strong>`,
	);
	const callLabel = formatBrandTemplate(copy.clientCallLabelTemplate);
	const disclaimer = formatBrandTemplate(chrome.footerDisclaimerLegal);

	const text = [
		greeting,
		'',
		bodyPlain,
		'',
		`Vehicle: ${lead.vehicle}`,
		lead.issue ? `Issue noted: ${lead.issue}` : '',
		'',
		`${copy.clientTalkPrompt} ${BRAND.phoneDisplay}`,
		`${copy.clientOrEmail}: ${BRAND.email}`,
		'',
		BRAND.legalName,
		disclaimer,
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
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${EMAIL_BRAND.goldSoft};">${escHtml(copy.clientEyebrow)}</p>
  <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:${EMAIL_BRAND.text};">${escHtml(copy.clientHeading)}</h1>
</td></tr>
<tr><td style="padding:24px 28px;">
  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${EMAIL_BRAND.text};">${escHtml(greeting)}</p>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.text};">
    ${bodyHtml}
  </p>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border:1px solid ${EMAIL_BRAND.line};border-radius:10px;background:rgba(0,0,0,0.2);">
    <tr><td style="padding:16px 18px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${EMAIL_BRAND.muted};">${escHtml(copy.clientVehicleLabel)}</p>
      <p style="margin:0;font-size:15px;line-height:1.45;color:${EMAIL_BRAND.text};">${escHtml(lead.vehicle)} · ${escHtml(lead.vehicleType)}</p>
      ${lead.issue ? `<p style="margin:12px 0 0;font-size:14px;line-height:1.55;color:${EMAIL_BRAND.muted};">${escHtml(lead.issue)}</p>` : ''}
    </td></tr>
  </table>
  <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">${escHtml(copy.clientTalkPrompt)}</p>
  <table role="presentation" cellspacing="0" cellpadding="0"><tr>
    <td style="border-radius:10px;background:${EMAIL_BRAND.gold};">
      <a href="${escHtml(BRAND.phoneHref)}" style="display:inline-block;padding:14px 24px;font-size:14px;font-weight:700;letter-spacing:0.04em;color:${EMAIL_BRAND.navy};text-decoration:none;">${escHtml(callLabel)}</a>
    </td>
  </tr></table>
  <p style="margin:20px 0 0;font-size:13px;line-height:1.55;color:${EMAIL_BRAND.muted};">
    ${escHtml(copy.clientOrEmail)} <a href="mailto:${escHtml(BRAND.email)}">${escHtml(BRAND.email)}</a>
  </p>
</td></tr>
<tr><td style="padding:18px 28px;background:rgba(0,0,0,0.25);font-size:11px;line-height:1.55;color:${EMAIL_BRAND.muted};">
  ${escHtml(disclaimer)} ${escHtml(BRAND.legalName)}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

	return { subject, html, text };
}
