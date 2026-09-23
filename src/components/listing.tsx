'use client';

import { cn } from '@/kit/shared';
import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { proseParagraphsFromText } from '@/kit/ui/functions/prose';
import Link from '@/components/link';
import { type FaqDetailRecord, faqDetailPath } from '@/lib/cms';

function FaqItem({
	entry,
	open,
	onToggle,
	index,
	id,
}: {
	entry: FaqDetailRecord;
	open: boolean;
	onToggle: (index: number) => void;
	index: number;
	id: string;
}) {
	const handleClick = useCallback(() => onToggle(index), [onToggle, index]);

	return (
		<div className="card overflow-hidden transition-colors hover:border-gold/25">
			<button
				type="button"
				onClick={handleClick}
				aria-expanded={open}
				aria-controls={`${id}-panel`}
				id={`${id}-button`}
				className="flex w-full min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base md:min-h-[60px] md:px-6 md:py-5"
			>
				<span className="pr-2 text-[15.5px] font-semibold leading-snug text-fg">{entry.q}</span>
				<span
					aria-hidden="true"
					className={cn(
						'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-gold motion-ui transition-transform',
						open && 'rotate-45 border-gold/50 bg-gold/10',
					)}
				>
					<Plus size={16} />
				</span>
			</button>
			<div
				id={`${id}-panel`}
				role="region"
				aria-labelledby={`${id}-button`}
				data-open={open}
				className="collapsible-panel grid"
			>
				<div className="overflow-hidden">
					<div className="space-y-3 px-5 pb-5 text-[14.5px] leading-relaxed text-muted md:px-6 md:pb-6">
						{proseParagraphsFromText(entry.a).map((paragraph) => (
							<p key={paragraph.slice(0, 48)}>{paragraph}</p>
						))}
					</div>
					<div className={cn('px-5 pb-6 md:px-6', !open && 'hidden')}>
						<Link
							href={faqDetailPath(entry.slug)}
							className="motion-ui inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-cta transition-[gap] hover:gap-2"
							tabIndex={open ? 0 : -1}
						>
							Read Full Answer →
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export function FaqList({ items }: { items: readonly FaqDetailRecord[] }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleToggle = useCallback((index: number) => {
		setOpenIndex((prev) => (prev === index ? null : index));
	}, []);

	return (
		<>
			{items.map((entry, i) => (
				<FaqItem
					key={entry.slug}
					id={`faq-${entry.slug}`}
					index={i}
					entry={entry}
					open={openIndex === i}
					onToggle={handleToggle}
				/>
			))}
		</>
	);
}
