import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Footer, JsonLd, Link } from '@/components';
import { LeadCaptureEmbed } from '@/components/leads/embed';
import { BRAND, OFFICES, TOOLS } from '@/lib/cms';
import { pageMetadata } from '@/lib/seo';
import { contactLd } from '@/lib/structured';

const CONTACT_PATH = '/contact';

export const metadata: Metadata = pageMetadata({
	title: 'Free California Lemon Law Case Review | CLINE APC',
	description:
		'Request a free California lemon law case review. An attorney reviews your vehicle, repair history and options. You pay no attorney fees; the manufacturer does.',
	canonical: CONTACT_PATH,
});

const RELATED_LINKS = [
	...TOOLS.map((tool) => ({ href: `/tool/${tool.slug}`, label: tool.title })),
	{ href: '/faq', label: 'California Lemon Law FAQ' },
	{ href: '/info/fees', label: 'How our fees work' },
	{ href: '/the-firm', label: 'About the firm' },
	{ href: '/team', label: 'Our attorneys' },
];

export default function ContactPage() {
	return (
		<>
			<JsonLd data={contactLd()} />
			<main id="main" className="container-x py-12 md:py-16">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
					<div>
						<span className="eyebrow">Contact CLINE APC</span>
						<h1 className="display mt-3 text-[clamp(2rem,5vw,3rem)] tracking-[-0.01em]">
							Free Lemon Law Case Review
						</h1>
						<div className="mt-5 max-w-2xl space-y-4 text-[16px] leading-relaxed text-muted">
							<p>
								If your new or used vehicle keeps going back to the dealer for the same problem,
								tell us about it. {`A ${BRAND.name} attorney`} reviews every request and follows up
								to explain whether California&rsquo;s lemon law, the Song-Beverly Consumer Warranty
								Act, is likely to apply and what a repurchase, replacement or cash settlement could
								look like.
							</p>
							<p>
								The review is free. If we take your case you do not pay attorney fees out of pocket:
								under the Song-Beverly Act the manufacturer pays the fees and costs of a consumer
								who prevails. Have your purchase or lease contract and repair orders handy; the
								documentation checklist below shows what helps most.
							</p>
						</div>

						<h2 className="mt-10 text-xl font-semibold text-fg">Call, email or visit</h2>
						<ul className="mt-4 space-y-3 text-[15px] text-muted">
							<li className="flex items-center gap-2.5">
								<Phone size={17} className="shrink-0 text-gold" aria-hidden="true" />
								<a href={BRAND.phoneHref} className="font-semibold text-fg hover:text-gold">
									{BRAND.phoneDisplay}
								</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Mail size={17} className="shrink-0 text-gold" aria-hidden="true" />
								<a href={`mailto:${BRAND.email}`} className="font-semibold text-fg hover:text-gold">
									{BRAND.email}
								</a>
							</li>
						</ul>
						<h3 className="mt-6 text-base font-semibold text-fg">Offices</h3>
						<ul className="mt-3 grid gap-4 text-[15px] text-muted sm:grid-cols-2">
							{OFFICES.map((office) => (
								<li key={office.city} className="flex gap-2.5">
									<MapPin size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
									<address className="not-italic leading-snug">
										<span className="font-medium text-fg">{office.city} office</span>
										<br />
										{office.address}
										<br />
										{office.region}
									</address>
								</li>
							))}
						</ul>
						<p className="mt-4 text-[14px] text-subtle">
							We represent drivers across California; most cases are handled by phone and email
							without an office visit.
						</p>

						<h2 className="mt-10 text-xl font-semibold text-fg">Before you reach out</h2>
						<ul className="mt-4 grid gap-2 text-[15px] sm:grid-cols-2">
							{RELATED_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-muted underline-offset-4 hover:text-gold hover:underline"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h2 className="sr-only">Case review form</h2>
						<LeadCaptureEmbed context="Contact Page" inline />
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
