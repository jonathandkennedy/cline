import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/components/link';
import {
	APP_SHELL,
	BRAND,
	callBrandAriaLabel,
	formatBrandTemplate,
	FOOTER_LINK_ITEMS,
	OFFICES,
	RESOURCE_FOOTER_NAV_ITEMS,
	TOOLS,
	UI_COPY,
} from '@/lib/cms';
import { LogoFull } from '@/components/logo';
import { isMailOrTelHref } from '@/lib/lookup';

export function Footer({ compact = false }: { compact?: boolean }) {
	const year = new Date().getFullYear();

	if (compact) {
		return (
			<footer className="border-t border-dashed border-line py-5">
				<div className="container-x flex flex-col items-center gap-2 text-center text-[11.5px] leading-relaxed text-faint">
					<a
						href={BRAND.phoneHref}
						className="inline-flex min-h-11 items-center font-medium text-muted transition hover:text-gold"
					>
						{formatBrandTemplate(UI_COPY.chrome.footerCompactPhone)}
					</a>
					<p className="max-w-2xl">{UI_COPY.chrome.footerDisclaimerEducational}</p>
				</div>
			</footer>
		);
	}

	return (
		<footer className="mt-auto border-t border-dashed border-line bg-ink/40">
			<div className="container-x grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12 lg:py-16">
				<div className="sm:col-span-2 md:col-span-4 lg:col-span-1">
					<Link
						href="/"
						aria-label={formatBrandTemplate(UI_COPY.chrome.footerLogoAria)}
						className="inline-flex"
					>
						<LogoFull width={172} />
					</Link>
					<p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
						{formatBrandTemplate(UI_COPY.chrome.footerFirmBlurb)}
					</p>
					<div className="mt-5 flex flex-col gap-1">
						<a
							href={BRAND.phoneHref}
							aria-label={callBrandAriaLabel(APP_SHELL.aria.callPrefix, APP_SHELL.aria.atPhone)}
							className="inline-flex items-center gap-2 py-1 text-lg font-semibold leading-tight text-fg transition hover:text-gold"
						>
							<Phone size={17} className="shrink-0 text-gold" aria-hidden="true" />
							{BRAND.phoneDisplay}
						</a>
						<a
							href={`mailto:${BRAND.email}`}
							aria-label={formatBrandTemplate(UI_COPY.chrome.footerEmailLabel)}
							className="inline-flex items-center gap-2 py-1 text-lg font-semibold leading-tight text-fg transition hover:text-gold"
						>
							<Mail size={17} className="shrink-0 text-gold" aria-hidden="true" />
							{formatBrandTemplate(UI_COPY.chrome.footerEmailLabel)}
						</a>
					</div>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
						Free Tools
					</p>
					<ul className="mt-4 space-y-1 text-sm leading-relaxed md:space-y-2 lg:space-y-3">
						{TOOLS.map((t) => (
							<li key={t.slug}>
								<Link
									href={`/tool/${t.slug}`}
									className="inline-flex min-h-11 items-center px-2 -mx-2 text-muted transition hover:text-gold-soft md:min-h-0"
								>
									{t.title}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Resources</p>
					<ul className="mt-4 space-y-1 text-sm leading-relaxed md:space-y-2 lg:space-y-3">
						{RESOURCE_FOOTER_NAV_ITEMS.map((link) => (
							<li key={link.id}>
								<Link
									href={link.href}
									className="inline-flex min-h-11 items-center px-2 -mx-2 text-muted transition hover:text-gold-soft md:min-h-0"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Firm</p>
					<ul className="mt-4 space-y-1 text-sm leading-relaxed md:space-y-2 lg:space-y-3">
						{FOOTER_LINK_ITEMS.map((link) => {
							const external = 'external' in link && Boolean(link.external);
							const protocol = isMailOrTelHref(link.href);
							const className =
								'icon' in link && link.icon
									? 'inline-flex min-h-11 items-center gap-1 px-2 -mx-2 text-muted transition hover:text-gold-soft md:min-h-0'
									: 'inline-flex min-h-11 items-center px-2 -mx-2 text-muted transition hover:text-gold-soft md:min-h-0';
							return (
								<li key={link.label}>
									{external || protocol ? (
										<a
											href={link.href}
											{...(protocol
												? {}
												: {
														target: '_blank' as const,
														rel: 'noopener',
													})}
											className={className}
										>
											{link.label}
											{'icon' in link && link.icon && !protocol ? <ArrowUpRight size={13} /> : null}
										</a>
									) : (
										<Link href={link.href} className={className}>
											{link.label}
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Offices</p>
					<ul className="mt-4 space-y-3 text-sm leading-relaxed md:space-y-3 lg:space-y-4">
						{OFFICES.map((o) => (
							<li key={o.city} className="flex gap-2.5 text-muted">
								<MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
								<span className="leading-snug">
									<span className="font-medium text-fg">{o.city}</span>
									<br />
									{o.address}, {o.region}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-dashed border-line">
				<div className="container-x flex flex-col gap-4 py-6 text-[12px] leading-relaxed text-faint md:flex-row md:items-start md:justify-between">
					<p>
						© {year} {BRAND.legalName}. All rights reserved.
					</p>
					<p className="max-w-2xl md:text-right">
						{UI_COPY.chrome.footerDisclaimerLegal}{' '}
						{formatBrandTemplate(UI_COPY.chrome.footerDisclaimerConsult)}
					</p>
				</div>
			</div>
		</footer>
	);
}
