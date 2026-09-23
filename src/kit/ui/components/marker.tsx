import { memo } from 'react';

import { components } from '@/kit/theme';

export type MarkerProps = {
	id?: string;
};

function MarkerComponent({ id = 'scroll-end-flag' }: MarkerProps) {
	return <div id={id} className={components.marker.root} aria-hidden="true" />;
}

export const Marker = memo(MarkerComponent);

Marker.displayName = 'Marker';
