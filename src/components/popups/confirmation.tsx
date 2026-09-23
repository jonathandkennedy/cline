import type { SuccessBlockItem } from '@/kit/shared';
import { Confirmation } from '@/kit/shared';
import { BRAND, UI_COPY } from '@/lib/cms/tables/config';
import { LEAD_MODAL_SUCCESS_ITEMS } from '@/lib/cms/tables/widgets';

export function LeadCaptureSuccess({
	titleId,
	onSubmitAnother,
}: {
	titleId: string;
	onSubmitAnother: () => void;
}) {
	const items = LEAD_MODAL_SUCCESS_ITEMS as readonly SuccessBlockItem[];

	return (
		<Confirmation
			titleId={titleId}
			onSubmitAnother={onSubmitAnother}
			items={items}
			submitAnotherLabel={UI_COPY.leadModal.submitAnotherLabel}
			phoneHref={BRAND.phoneHref}
			phoneDisplay={BRAND.phoneDisplay}
		/>
	);
}
