'use client';

import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';
import { useToastPortalRoot } from '@/hooks';
import { TOAST_LAYER_Z_INDEX } from '@/lib/portal';

export function SiteToaster() {
	const portalRoot = useToastPortalRoot();
	if (!portalRoot) return null;

	return createPortal(
		<Toaster
			position="bottom-right"
			theme="dark"
			closeButton
			offset={20}
			style={{ zIndex: TOAST_LAYER_Z_INDEX }}
			toastOptions={{ duration: 3200 }}
		/>,
		portalRoot,
	);
}
