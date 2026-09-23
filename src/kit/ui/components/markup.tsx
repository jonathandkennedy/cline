import { memo } from 'react';

export type MarkupProps = {
	json: object;
};

function serializeJsonLd(data: object): string {
	return JSON.stringify(data)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026');
}

function MarkupComponent({ json }: MarkupProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serializeJsonLd(json) }}
		/>
	);
}

export const Markup = memo(MarkupComponent);

Markup.displayName = 'Markup';
