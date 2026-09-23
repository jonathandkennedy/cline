import { ArrowRight, Check, ChevronLeft, Info } from 'lucide-react';
import { type ReactNode, useCallback } from 'react';

export type QuestionProps = {
	title: string;
	subtitle?: string;
	children: ReactNode;
};

export function Question({ title, subtitle, children }: QuestionProps) {
	return (
		<div>
			<h2 className="text-balance text-[19px] font-semibold leading-tight tracking-[-0.01em] sm:text-[21px] md:text-[24px]">
				{title}
			</h2>
			{subtitle && (
				<p className="mt-2.5 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{subtitle}</p>
			)}
			<div className="mt-7">{children}</div>
		</div>
	);
}

export function BigNumber({ value, unit }: { value: number; unit: string }) {
	return (
		<div className="tabular flex items-baseline gap-3" aria-hidden="true">
			<span className="display text-[clamp(3.1rem,11vw,4.8rem)] font-bold tracking-[-0.02em] text-fg">
				{value}
			</span>
			<span className="text-[19px] font-medium text-muted">{unit}</span>
		</div>
	);
}

export function Hint({ show, children }: { show: boolean; children: ReactNode }) {
	if (!show) return <div className="mt-4 h-[1px]" />;
	return (
		<p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-recovery">
			<Check size={15} /> {children}
		</p>
	);
}

export function YesNo({
	value,
	onSelect,
	yesLabel,
	noLabel,
}: {
	value: boolean | null;
	onSelect: (v: boolean) => void;
	yesLabel: string;
	noLabel: string;
}) {
	const handleSelect = useCallback((v: boolean) => () => onSelect(v), [onSelect]);

	const choiceValues: boolean[] = [true, false];

	return (
		<div className="grid grid-cols-2 gap-4">
			{choiceValues.map((choiceValue) => (
				<button
					key={String(choiceValue)}
					type="button"
					data-active={value === choiceValue}
					onClick={handleSelect(choiceValue)}
					className="tile min-h-[56px] px-4 py-5 text-center text-[14.5px] font-semibold tracking-[-0.005em] sm:px-5 sm:py-6 sm:text-[15.5px]"
				>
					{choiceValue ? yesLabel : noLabel}
				</button>
			))}
		</div>
	);
}

export function NavRow({
	onBack,
	onNext,
	hideNext,
}: {
	onBack: () => void;
	onNext?: () => void;
	hideNext?: boolean;
}) {
	return (
		<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-stretch">
			<button
				type="button"
				onClick={onBack}
				className="btn btn-secondary btn-lg min-h-[48px] w-full sm:w-auto"
			>
				<ChevronLeft size={16} /> Back
			</button>
			{!hideNext && onNext && (
				<button
					type="button"
					onClick={onNext}
					className="btn btn-primary btn-lg min-h-[48px] flex-1 sm:flex-none"
				>
					Continue <ArrowRight size={16} />
				</button>
			)}
		</div>
	);
}

export function ResultPoint({ good, children }: { good?: boolean; children: ReactNode }) {
	return (
		<li className="flex gap-3 leading-relaxed text-fg/90">
			<span
				className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
					good ? 'bg-recovery/15' : 'bg-gold/15'
				}`}
			>
				{good ? (
					<Check size={12} className="text-recovery" />
				) : (
					<Info size={12} className="text-gold" />
				)}
			</span>
			{children}
		</li>
	);
}
