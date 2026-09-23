import { CaseReviewCtaButton } from '@/components/fields/reviewcta';
import { PhoneCta, SiteLogo } from '@/components';
import { bannerCtaRowCenteredClass } from '@/kit/ui/functions/row';
import { Link } from '@/components/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { TRUST_ICONS } from '@/lib/icons';
import { FINAL_CTA_TRUST, GUIDEBOOK_CTA, HOME_RESOURCE_CTAS, UI_COPY } from '@/lib/cms';
import { formatBrandTemplate } from '@/lib/cms';
import { components } from '@/kit/theme/interface/components';

const CARD_CLASS =
	'card card-static relative isolate overflow-hidden border-gold/20 px-6 py-12 text-center shadow-[0_40px_100px_-50px_rgba(188,143,13,0.28)] sm:px-10 sm:py-14 md:px-12 md:py-[4.5rem]';

export function FunnelCtaBanner({
	imageSrc,
	imageAlt,
	showFooterLinks = false,
}: {
	imageSrc: string;
	imageAlt: string;
	showFooterLinks?: boolean;
}) {
	return (
		<div className={CARD_CLASS}>
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				sizes="(max-width: 1024px) 100vw, 1024px"
				className="-z-10 object-cover object-bottom opacity-[0.42] saturate-[1.05]"
			/>
			<div className="absolute inset-0 -z-10 bg-gradient-to-t from-base via-base/[0.88] to-base/55" />
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,rgba(0,0,0,0.5)_0%,transparent_68%)]" />
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
			/>
			<div
				aria-hidden
				className="glow left-1/2 top-[-2rem] h-72 w-[40rem] -translate-x-1/2 bg-gold/12"
			/>
			<div className="relative mx-auto flex w-full max-w-3xl flex-col items-center">
				<SiteLogo
					href="/"
					variant="full"
					width={164}
					logoVariant="light"
					className="drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] motion-ui transition-opacity hover:opacity-90"
				/>
				<h2 className="display mt-7 max-w-none text-balance text-[clamp(1.2rem,2.35vw,2.05rem)] leading-[1.12] md:mt-8">
					Think you&apos;re driving a <span className="gold-grad">lemon?</span>
				</h2>
				<p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted md:mt-5 md:text-[17px]">
					{formatBrandTemplate(UI_COPY.chrome.funnelCtaBody)}
				</p>
				<div
					className={`${bannerCtaRowCenteredClass('mt-8')} w-full max-w-md sm:max-w-none md:mt-9`}
				>
					<CaseReviewCtaButton
						leadContextId="home-final-cta"
						className={components.homeHeroPrimaryCta}
					>
						Get a Free Case Review <ArrowRight size={17} aria-hidden />
					</CaseReviewCtaButton>
					<PhoneCta className={components.homeHeroPhoneCta} />
				</div>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-9">
					{FINAL_CTA_TRUST.map((item) => {
						const Icon = TRUST_ICONS[item.icon];
						return (
							<span
								key={item.text}
								className="inline-flex items-center gap-1.5 rounded-full border border-line/90 bg-ink/50 px-3.5 py-2 text-[12.5px] text-subtle backdrop-blur-sm"
							>
								<Icon
									size={14}
									className={item.icon === 'shield-check' ? 'text-recovery' : 'text-gold'}
								/>
								{item.text}
							</span>
						);
					})}
				</div>
				{showFooterLinks ? (
					<div className="mt-10 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-line/80 pt-8 text-[13px] md:mt-11 md:pt-9">
						<Link href={GUIDEBOOK_CTA.ctaHref} className={components.homeFounderResourceLink}>
							{GUIDEBOOK_CTA.ctaLabel}
						</Link>
						<span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
						<Link
							href={HOME_RESOURCE_CTAS.caseStudies.href}
							className={components.homeFounderResourceLink}
						>
							{HOME_RESOURCE_CTAS.caseStudies.label}
						</Link>
						<span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
						<Link
							href={HOME_RESOURCE_CTAS.manufacturers.href}
							className={components.homeFounderResourceLink}
						>
							{HOME_RESOURCE_CTAS.manufacturers.label}
						</Link>
					</div>
				) : null}
			</div>
		</div>
	);
}
