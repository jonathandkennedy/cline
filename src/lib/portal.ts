const MODAL_ROOT_ID = 'cline-modal-root';
const TOAST_ROOT_ID = 'cline-toast-root';
const DOCK_ROOT_ID = 'cline-dock-root';

/** Matches `captureBackdrop` `z-[60]` in the nexus theme. */
export const CAPTURE_BACKDROP_Z_INDEX = 60;

/** Above the case-review modal so errors are not blurred behind the overlay. */
export const TOAST_LAYER_Z_INDEX = 10000;

function requireDocument(): Document {
	if (typeof document === 'undefined') {
		throw new Error('portal roots are client-only');
	}
	return document;
}

export function getModalPortalRoot(): HTMLElement {
	const doc = requireDocument();
	const existing = doc.getElementById(MODAL_ROOT_ID);
	if (existing) return existing;

	const root = doc.createElement('div');
	root.id = MODAL_ROOT_ID;
	doc.documentElement.appendChild(root);
	return root;
}

export function getToastPortalRoot(): HTMLElement {
	const doc = requireDocument();
	const existing = doc.getElementById(TOAST_ROOT_ID);
	if (existing) return existing;

	const root = doc.createElement('div');
	root.id = TOAST_ROOT_ID;
	root.style.position = 'fixed';
	root.style.top = '0';
	root.style.left = '0';
	root.style.width = '0';
	root.style.height = '0';
	root.style.overflow = 'visible';
	root.style.zIndex = String(TOAST_LAYER_Z_INDEX);
	root.style.pointerEvents = 'none';
	doc.documentElement.appendChild(root);
	return root;
}

/** Viewport-fixed mobile tool dock — on body so `.backdrop` cannot cover it. */
export function getDockPortalRoot(): HTMLElement {
	const doc = requireDocument();
	const existing = doc.getElementById(DOCK_ROOT_ID);
	if (existing) return existing;

	const root = doc.createElement('div');
	root.id = DOCK_ROOT_ID;
	root.style.position = 'fixed';
	root.style.left = '0';
	root.style.right = '0';
	root.style.bottom = '0';
	root.style.width = '100%';
	root.style.zIndex = '40';
	root.style.background = 'var(--color-base)';
	root.style.pointerEvents = 'none';
	doc.body.appendChild(root);
	return root;
}
