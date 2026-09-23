import { ExternalLink } from 'lucide-react';
import { Footer, JsonLd, Link } from '@/components';
import {
	FAQ_CATEGORY_LABELS,
	FAQ_DETAILS,
	faqTopicPath,
	SITE_HOME_BREADCRUMB,
	SITE_URL,
	type FaqDetailRecord,
} from '@/lib/cms';
import { breadcrumbLd, publisherLdRef } from '@/lib/structured';

const CATEGORY_INTROS: Record<string, string> = {
	basics:
		'What California’s lemon law is, what makes a vehicle a lemon, and why the 18-month / 18,000-mile rule is a presumption rather than a deadline.',
	coverage:
		'Which vehicles the Song-Beverly Consumer Warranty Act covers: new and used, leased, business-use and out-of-warranty situations.',
	fees: 'What a lemon law case costs you (nothing out of pocket) and how attorney fees are paid by the manufacturer under California law.',
	recovery:
		'What you can recover in a California lemon law claim: buybacks, replacements, cash-and-keep settlements and how the numbers are calculated.',
	process:
		'How long a lemon law case takes, the deadlines that apply and what happens from the first call to a resolution.',
	documentation:
		'The documents that prove a lemon law claim, from repair orders to your purchase contract, and what to do if you are missing some.',
};

export type FaqCategoryId = keyof typeof FAQ_CATEGORY_LABELS;

export function faqsForCategory(categoryId: string): readonly FaqDetailRecord[] {
	return FAQ_DETAILS.filter((faq) => faq.categoryId === categoryId);
}

export function faqTopicTitle(categoryId: string): string {
	return `${FAQ_CATEGORY_LABELS[categoryId as FaqCategoryId]}: California Lemon Law FAQ`;
}

export function faqTopicDescription(categoryId: string): string {
	return CATEGORY_INTROS[categoryId] ?? '';
}

/** One topical FAQ page holding every answer in a category, each addressable by #anchor. */
export function FaqTopicPage({ categoryId }: { categoryId: string }) {
	const label = FAQ_CATEGORY_LABELS[categoryId as FaqCategoryId];
	const faqs = faqsForCategory(categoryId);
	const path = faqTopicPath(categoryId);
	const url = `${SITE_URL}${path}`;
	const crumbs = [SITE_HOME_BREADCRUMB, { label: 'FAQ', href: '/faq' }, { label, href: path }];
	const ld = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'FAQPage',
				'@id': url,
				url,
				name: faqTopicTitle(categoryId),
				publisher: publisherLdRef(),
				mainEntity: faqs.map((faq) => ({
					'@type': 'Question',
					name: faq.q,
					acceptedAnswer: { '@type': 'Answer', text: faq.a },
				})),
			},
			breadcrumbLd(crumbs),
		],
	};
	const otherCategories = Object.keys(FAQ_CATEGORY_LABELS).filter((id) => id !== categoryId);

	return (
		<>
			<JsonLd data={ld} />
			<main id="main" className="container-x py-12 md:py-16">
				<nav aria-label="Breadcrumb" className="text-[13px] text-subtle">
					<Link href="/" className="hover:text-gold">
						Home
					</Link>{' '}
					/{' '}
					<Link href="/faq" className="hover:text-gold">
						FAQ
					</Link>{' '}
					/ <span className="text-muted">{label}</span>
				</nav>
				<div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
					<article className="max-w-3xl">
						<span className="eyebrow">California Lemon Law FAQ</span>
						<h1 className="display mt-3 text-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">{label}</h1>
						<p className="mt-4 text-[17px] leading-relaxed text-muted">
							{faqTopicDescription(categoryId)}
						</p>
						<ol className="mt-6 list-decimal space-y-1 pl-5 text-[15px]">
							{faqs.map((faq) => (
								<li key={faq.slug}>
									<a href={`#${faq.slug}`} className="text-muted hover:text-gold">
										{faq.q}
									</a>
								</li>
							))}
						</ol>
						{faqs.map((faq) => (
							<section
								key={faq.slug}
								id={faq.slug}
								className="mt-12 scroll-mt-28 border-t border-line/50 pt-10"
							>
								<h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-semibold leading-snug text-fg">
									{faq.q}
								</h2>
								<p className="mt-4 text-[16px] leading-relaxed text-muted">{faq.a}</p>
								{faq.keyPoints && faq.keyPoints.length > 0 ? (
									<>
										<h3 className="mt-6 text-base font-semibold text-fg">Key points</h3>
										<ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15.5px] leading-relaxed text-muted">
											{faq.keyPoints.map((point) => (
												<li key={point}>{point}</li>
											))}
										</ul>
									</>
								) : null}
								{faq.statuteLinks && faq.statuteLinks.length > 0 ? (
									<>
										<h3 className="mt-6 text-base font-semibold text-fg">Read the statute</h3>
										<ul className="mt-2 space-y-1.5 text-[15px]">
											{faq.statuteLinks.map((link) => (
												<li key={link.href}>
													<a
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center gap-1.5 text-gold hover:underline"
													>
														{link.label}
														<ExternalLink size={12} aria-hidden />
													</a>
												</li>
											))}
										</ul>
									</>
								) : null}
							</section>
						))}
						<p className="mt-12 text-[16px] text-muted">
							Have a question we didn&rsquo;t answer?{' '}
							<Link href="/contact" className="font-semibold text-gold hover:underline">
								Ask an attorney in a free case review
							</Link>
							.
						</p>
					</article>
					<aside className="lg:sticky lg:top-28 lg:self-start">
						<h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-subtle">
							More FAQ topics
						</h2>
						<ul className="mt-3 space-y-2 text-[15px]">
							{otherCategories.map((id) => (
								<li key={id}>
									<Link href={faqTopicPath(id)} className="text-muted hover:text-gold">
										{FAQ_CATEGORY_LABELS[id as FaqCategoryId]}
									</Link>
								</li>
							))}
						</ul>
					</aside>
				</div>
			</main>
			<Footer />
		</>
	);
}
