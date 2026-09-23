import type { ReactNode } from 'react';

import { components } from '@/kit/theme/interface/components';

export type FieldProps = {
	children: ReactNode;
	message?: string;
};

export function Field({ children, message }: FieldProps) {
	return (
		<div data-field-message={message ?? ''}>
			{children}
			{message ? (
				<p className={components.fieldError} role="alert">
					{message}
				</p>
			) : null}
		</div>
	);
}
