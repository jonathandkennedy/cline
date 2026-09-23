import { HelpCircle, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal } from '@/components';
import type { FaqDetailRecord } from '@/lib/cms';
import { FAQ_DETAIL_SECTIONS, faqDetailPath } from '@/lib/site';
import { cn } from '@/kit/shared';
import { ResourceLinkListPanel, type ResourceLinkListSize } from '@/kit/blocks';
import { RESOURCE_BLEED_ALT } from '@/kit/blocks/rhythm';
import { ResourceBand } from '@/kit/blocks/spotlight';
import { components } from '@/kit/theme';

function ResourceFaqNumberBadge({
	index,
	size = 'default',
}: {
	index: number;
	size?: ResourceLinkListSize;
}) {
	const compact = size === 'sm';
	return (
		<span
			aria-hidden
			className={cn(
				components.resourceUi.faqlinks.k003,
				compact ? 'h-8 w-8 text-[10px]' : 'h-9 w-9 text-[11px]',
			)}
		>
			{String(index + 1).padStart(2, '0')}
		</span>
	);
}

export function ResourceRelatedQuestionsGrid({
	faqs,
	title = FAQ_DETAIL_SECTIONS.relatedQuestions,
	bleedClassName = RESOURCE_BLEED_ALT,
}: {
	faqs: readonly Pick<FaqDetailRecord, 'slug' | 'q'>[];
	title?: string;
	bleedClassName?: string;
}) {
	if (faqs.length === 0) return null;
	return (
		<ResourceBand pad="default" bleedClassName={bleedClassName}>
			<Reveal>
				<ResourceFaqCategorySection
					categoryId="related"
					title={title}
					icon={HelpCircle}
					faqs={faqs}
					size="sm"
				/>
			</Reveal>
		</ResourceBand>
	);
}

function buildFaqLinkListItems(
	faqs: readonly Pick<FaqDetailRecord, 'slug' | 'q'>[],
	options?: { numbered?: boolean; size?: ResourceLinkListSize },
) {
	return faqs.map((faq, faqIndex) => ({
		key: faq.slug,
		href: faqDetailPath(faq.slug),
		title: faq.q,
		leading:
			options?.numbered === false ? undefined : (
				<ResourceFaqNumberBadge index={faqIndex} size={options?.size} />
			),
	}));
}

function ResourceFaqLinkPanel({
	faqs,
	size = 'default',
	className,
	numbered = true,
	embedded = false,
}: {
	faqs: readonly Pick<FaqDetailRecord, 'slug' | 'q'>[];
	size?: ResourceLinkListSize;
	className?: string;
	numbered?: boolean;
	embedded?: boolean;
}) {
	const items = buildFaqLinkListItems(faqs, { numbered, size });
	return (
		<ResourceLinkListPanel size={size} className={className} items={items} embedded={embedded} />
	);
}

function ResourceCategorySectionFrame({
	idPrefix,
	sectionId,
	title,
	meta,
	icon: Icon,
	size = 'default',
	children,
}: {
	idPrefix: string;
	sectionId: string;
	title: string;
	meta: string;
	icon: LucideIcon;
	size?: ResourceLinkListSize;
	children: ReactNode;
}) {
	const compact = size === 'sm';
	const headingId = `${idPrefix}-${sectionId}`;
	return (
		<section
			aria-labelledby={headingId}
			className={cn(components.resourceUi.faqlinks.k004, compact ? 'rounded-xl' : 'rounded-2xl')}
		>
			<header
				className={cn(
					components.resourceUi.faqlinks.k005,
					compact ? 'gap-3 px-3.5 py-3.5 md:px-4 md:py-4' : 'gap-3.5 px-4 py-4 md:px-6 md:py-5',
				)}
			>
				<span className={cn(components.resourceUi.shared.k004, compact ? 'h-9 w-9' : 'h-11 w-11')}>
					<Icon size={compact ? 16 : 18} aria-hidden />
				</span>
				<div className={components.resourceUi.faqlinks.k001}>
					<h2
						id={headingId}
						className={cn(
							components.resourceUi.faqlinks.k006,
							compact ? 'text-[1.05rem] md:text-[1.1rem]' : 'text-[1.15rem] md:text-[1.35rem]',
						)}
					>
						{title}
					</h2>
					<p className={components.resourceUi.faqlinks.k002}>{meta}</p>
				</div>
			</header>
			{children}
		</section>
	);
}

export function ResourceFaqCategorySection({
	categoryId,
	title,
	icon: Icon,
	faqs,
	size = 'default',
	className,
}: {
	categoryId: string;
	title: string;
	icon: LucideIcon;
	faqs: readonly Pick<FaqDetailRecord, 'slug' | 'q'>[];
	size?: ResourceLinkListSize;
	className?: string;
}) {
	if (faqs.length === 0) return null;
	const meta = faqs.length === 1 ? '1 question' : `${faqs.length} questions`;
	return (
		<div className={cn(components.resourceUi.faqlinks.k007, className)}>
			<ResourceCategorySectionFrame
				idPrefix="faq-cat"
				sectionId={categoryId}
				title={title}
				meta={meta}
				icon={Icon}
				size={size}
			>
				<ResourceFaqLinkPanel faqs={faqs} size={size} embedded />
			</ResourceCategorySectionFrame>
		</div>
	);
}
