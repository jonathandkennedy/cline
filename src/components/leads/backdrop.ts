/**
 * Decide whether a backdrop interaction should dismiss the lead modal.
 * Requires the press to both start and end on the backdrop element itself so
 * text selection that begins in a field and ends on the overlay does not close.
 */
export function shouldCloseLeadModalOnBackdropClick(options: {
	pointerDownStartedOnBackdrop: boolean;
	clickTargetIsBackdrop: boolean;
}): boolean {
	return options.pointerDownStartedOnBackdrop && options.clickTargetIsBackdrop;
}
