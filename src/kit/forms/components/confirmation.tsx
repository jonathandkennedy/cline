import { CheckCircle2, Clock } from 'lucide-react';
import type { ReactNode } from 'react';
import { components } from '@/kit/theme/interface/components';
import { cn } from '@/kit/ui/functions/cn';

export type SuccessBlockVariant = 'eyebrow' | 'heading' | 'paragraph' | 'phone';

export type SuccessBlockItem = {
	id: string;
	variant: SuccessBlockVariant;
	text: string;
};

export type ConfirmationProps = {
	titleId: string;
	onSubmitAnother: () => void;
	items: readonly SuccessBlockItem[];
	submitAnotherLabel: string;
	phoneHref: string;
	phoneDisplay: string;
};

const SUCCESS_BLOCK_BY_VARIANT: Record<
	SuccessBlockVariant,
	(props: {
		item: SuccessBlockItem;
		titleId: string;
		phoneHref: string;
		phoneDisplay: string;
	}) => ReactNode
> = {
	eyebrow: ({ item }) => (
		<span key={item.id} className={components.captureSuccessPill}>
			{item.text}
		</span>
	),
	heading: ({ item, titleId }) => (
		<h3
			key={item.id}
			id={titleId}
			className={cn(components.captureHeading, components.captureHeadingFg)}
		>
			{item.text}
		</h3>
	),
	paragraph: ({ item }) => (
		<p key={item.id} className={components.captureSuccessParagraph}>
			{item.text}
		</p>
	),
	phone: ({ item, phoneHref, phoneDisplay }) => (
		<div key={item.id} className={components.captureSuccessPhone}>
			<Clock size={15} className={components.captureSuccessClockIcon} aria-hidden />
			<span className={components.captureSuccessPhoneMuted}>{item.text}</span>
			<a href={phoneHref} className={components.captureSuccessPhoneLink}>
				{phoneDisplay}
			</a>
		</div>
	),
};

function SuccessBlock({
	item,
	titleId,
	phoneHref,
	phoneDisplay,
}: {
	item: SuccessBlockItem;
	titleId: string;
	phoneHref: string;
	phoneDisplay: string;
}) {
	return SUCCESS_BLOCK_BY_VARIANT[item.variant]({
		item,
		titleId,
		phoneHref,
		phoneDisplay,
	});
}

export function Confirmation({
	titleId,
	onSubmitAnother,
	items,
	submitAnotherLabel,
	phoneHref,
	phoneDisplay,
}: ConfirmationProps) {
	return (
		<div className={components.captureSuccessRoot}>
			<div className={components.captureSuccessIcon}>
				<CheckCircle2
					className={components.captureSuccessCheck}
					strokeWidth={2.25}
					aria-hidden="true"
				/>
			</div>
			{items.map((item) => (
				<SuccessBlock
					key={item.id}
					item={item}
					titleId={titleId}
					phoneHref={phoneHref}
					phoneDisplay={phoneDisplay}
				/>
			))}
			<button type="button" onClick={onSubmitAnother} className={components.captureSuccessSubmit}>
				{submitAnotherLabel}
			</button>
		</div>
	);
}
