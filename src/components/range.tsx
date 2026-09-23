'use client';

import { cn } from '@/kit/shared';
import { type ComponentPropsWithoutRef, useCallback, useLayoutEffect, useRef } from 'react';

type RangeInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'min' | 'max' | 'value'> & {
	min: number;
	max: number;
	value: number;
};

function syncProgress(el: HTMLInputElement, min: number, max: number, value: number) {
	const span = max - min;
	const pct = span > 0 ? ((value - min) / span) * 100 : 0;
	el.style.setProperty('--_p', `${pct}%`);
}

export function RangeInput({
	min,
	max,
	value,
	className = '',
	onChange,
	...props
}: RangeInputProps) {
	const ref = useRef<HTMLInputElement>(null);

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		syncProgress(el, min, max, value);
	}, [min, max, value]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const el = e.currentTarget;
			const next = Number(el.value);
			syncProgress(el, min, max, next);
			onChange?.(e);
		},
		[min, max, onChange],
	);

	return (
		<input
			ref={ref}
			type="range"
			className={cn('slider', className)}
			min={min}
			max={max}
			value={value}
			onChange={handleChange}
			{...props}
		/>
	);
}
