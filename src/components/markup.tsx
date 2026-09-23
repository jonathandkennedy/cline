import { Markup, type MarkupProps } from '@/kit/shared';

export function JsonLd({ data }: { data: MarkupProps['json'] }) {
	return <Markup json={data} />;
}
