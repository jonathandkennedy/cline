'use client';

import { ArrowRight, Check, Info } from 'lucide-react';
import { useCallback, useId, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { LeadPrefill } from '@/components';
import { RangeInput } from '@/components/range';
import { useDockPortalRoot, usePrefersReducedMotion } from '@/hooks';

import { formatNumber } from '@/lib/numbers';

export type OpenLead = (prefill?: LeadPrefill) => void;

export function useOpenLeadPrefill(onOpenLead: OpenLead, prefill?: LeadPrefill) {
	return useCallback(() => onOpenLead(prefill), [onOpenLead, prefill]);
}

export function Slider({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
	display,
	minLabel,
	maxLabel,
	hint,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (v: number) => void;
	display: string;
	minLabel: string;
	maxLabel: string;
	hint?: string;
}) {
	const id = useId();
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(Number(e.target.value));
		},
		[onChange],
	);

	return (
		<div>
			<div className="mb-3 flex items-baseline justify-between gap-3">
				<label
					htmlFor={id}
					className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted"
				>
					{label}
				</label>
				<span className="tabular shrink-0 text-[15px] font-semibold text-cta sm:text-[16px]">
					{display}
				</span>
			</div>
			<RangeInput
				id={id}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={handleChange}
				aria-valuetext={display}
			/>
			<div className="mt-2 flex justify-between text-[11px] text-faint" aria-hidden="true">
				<span>{minLabel}</span>
				<span>{maxLabel}</span>
			</div>
			{hint && (
				<p className="mt-2.5 flex items-start gap-1.5 text-[12px] leading-snug text-gold/85">
					<Info size={12} className="mt-0.5 shrink-0" /> {hint}
				</p>
			)}
		</div>
	);
}

export function PresumptionChip({ met, label }: { met: boolean; label: string }) {
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium ${
				met
					? 'border-recovery/40 bg-recovery/10 text-recovery-soft'
					: 'border-line bg-ink text-subtle'
			}`}
		>
			<span
				aria-hidden="true"
				className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${
					met ? 'bg-recovery/25' : 'bg-line'
				}`}
			>
				{met && <Check size={9} strokeWidth={3.5} className="text-recovery" />}
			</span>
			{label}
			<span className="sr-only">, {met ? 'met' : 'not yet met'}</span>
		</span>
	);
}

function CompositionSegment({
	label,
	widthPct,
	color,
}: {
	label: string;
	widthPct: number;
	color: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		el.style.width = `${widthPct}%`;
		el.style.background = color;
	}, [color, widthPct]);

	return <div ref={ref} className="h-full motion-ui transition-[width]" title={label} />;
}

export function CompositionBar({
	segments,
}: {
	segments: { label: string; value: number; color: string }[];
}) {
	const total = segments.reduce((s, x) => s + x.value, 0) || 1;
	return (
		<div className="flex h-3 w-full overflow-hidden rounded-full bg-line">
			{segments.map((s) => (
				<CompositionSegment
					key={s.label}
					label={`${s.label}: $${formatNumber(s.value)}`}
					widthPct={(s.value / total) * 100}
					color={s.color}
				/>
			))}
		</div>
	);
}

function StickyBarValue({ value, className }: { value: string; className: string }) {
	const reducedMotion = usePrefersReducedMotion();
	const viewportRef = useRef<HTMLDivElement>(null);
	const measureRef = useRef<HTMLSpanElement>(null);

	useLayoutEffect(() => {
		const viewport = viewportRef.current;
		const measure = measureRef.current;
		if (!viewport || !measure) return;

		const syncOverflow = () => {
			const overflows = measure.scrollWidth > viewport.clientWidth + 1;
			viewport.dataset.overflow = overflows ? 'true' : 'false';
		};

		syncOverflow();
		const observer = new ResizeObserver(syncOverflow);
		observer.observe(viewport);
		observer.observe(measure);
		return () => observer.disconnect();
	}, [value, reducedMotion]);

	const durationMs = Math.max(7000, value.length * 280);

	return (
		<div
			ref={viewportRef}
			className="tool-sticky-bar__value"
			data-overflow="false"
			data-reduced-motion={reducedMotion ? 'true' : 'false'}
			style={{
				['--tool-sticky-marquee-ms' as string]: `${durationMs}ms`,
			}}
		>
			<span className="sr-only">{value}</span>
			<span
				ref={measureRef}
				className={`tool-sticky-bar__value-measure ${className}`}
				aria-hidden="true"
			>
				{value}
			</span>
			<div className="tool-sticky-bar__value-track" aria-hidden="true">
				<span className={`tool-sticky-bar__value-item ${className}`}>{value}</span>
				<span className={`tool-sticky-bar__value-item tool-sticky-bar__value-dup ${className}`}>
					{value}
				</span>
			</div>
		</div>
	);
}

export function ToolStickyBar({
	label,
	value,
	cta,
	onClick,
	tone = 'recovery',
}: {
	label: string;
	value: string;
	cta: string;
	onClick: () => void;
	tone?: 'recovery' | 'cta' | 'gold';
}) {
	const dockRoot = useDockPortalRoot();
	const valueColor = tone === 'cta' ? 'text-cta' : tone === 'gold' ? 'text-gold' : 'text-recovery';
	const dock = (
		<div className="mobile-dock tool-sticky-bar lg:hidden">
			<div className="mobile-dock__panel">
				<div className="mobile-dock__row mobile-dock__row--tool">
					<div className="min-w-0 flex-1">
						<div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-subtle">
							{label}
						</div>
						<StickyBarValue
							value={value}
							className={`tabular text-[1.35rem] font-bold leading-tight tracking-[-0.3px] ${valueColor}`}
						/>
					</div>
					<button
						type="button"
						onClick={onClick}
						className="mobile-dock__cta btn btn-primary mobile-dock__cta--compact"
					>
						<span className="mobile-dock__cta-label">{cta}</span>
						<ArrowRight size={16} className="shrink-0" aria-hidden />
					</button>
				</div>
			</div>
		</div>
	);
	return (
		<>
			<div className="tool-sticky-bar-slot lg:hidden" aria-hidden="true" />
			{dockRoot ? createPortal(dock, dockRoot) : null}
		</>
	);
}
