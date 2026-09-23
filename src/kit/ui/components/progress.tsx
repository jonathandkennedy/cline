import { memo } from 'react';

import { components } from '@/kit/theme';

function ProgressComponent() {
	return <div className={components.progress.root} aria-hidden="true" />;
}

export const Progress = memo(ProgressComponent);

Progress.displayName = 'Progress';
