import { Check } from 'lucide-react';
import { memo } from 'react';

import { components } from '@/kit/theme';

export type ChecklistProps = {
	children: string;
};

function ChecklistComponent({ children }: ChecklistProps) {
	return (
		<li className={components.checklist.itemRoot}>
			<span className={components.checklist.itemIconWrap}>
				<Check size={13} className={components.checklist.itemIcon} />
			</span>
			<span className={components.checklist.itemText}>{children}</span>
		</li>
	);
}

export const Checklist = memo(ChecklistComponent);

Checklist.displayName = 'Checklist';
