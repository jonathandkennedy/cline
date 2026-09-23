import type { ReactNode } from 'react';

export type MarqueeTrackProps<T> = {
	items: readonly T[];
	render: (item: T, index: number) => ReactNode;
	keyFn: (item: T, index: number) => string;
};

export function MarqueeTrack<T>({ items, render, keyFn }: MarqueeTrackProps<T>) {
	return (
		<>
			{items.map((item, i) => (
				<span key={keyFn(item, i)} className="contents">
					{render(item, i)}
				</span>
			))}

			{items.map((item, i) => (
				<span key={`dup-${keyFn(item, i)}`} aria-hidden="true" className="contents">
					{render(item, i)}
				</span>
			))}
		</>
	);
}
