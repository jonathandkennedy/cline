type ScrollLockSnapshot = {
	scrollY: number;
	body: {
		overflow: string;
		position: string;
		top: string;
		left: string;
		right: string;
		width: string;
		paddingRight: string;
	};
	html: {
		overflow: string;
	};
};

let lockCount = 0;
let snapshot: ScrollLockSnapshot | null = null;

function scrollbarGutterWidth(): number {
	return window.innerWidth - document.documentElement.clientWidth;
}

function applyScrollLock(): void {
	const scrollY = window.scrollY;
	const body = document.body;
	const html = document.documentElement;
	const gutter = scrollbarGutterWidth();

	snapshot = {
		scrollY,
		body: {
			overflow: body.style.overflow,
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			paddingRight: body.style.paddingRight,
		},
		html: {
			overflow: html.style.overflow,
		},
	};

	html.setAttribute('data-scroll-locked', '');
	html.style.overflow = 'hidden';
	body.style.overflow = 'hidden';
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
	body.style.left = '0';
	body.style.right = '0';
	body.style.width = '100%';
	if (gutter > 0) {
		body.style.paddingRight = `${gutter}px`;
	}
}

function releaseScrollLock(): void {
	if (!snapshot) return;

	const body = document.body;
	const html = document.documentElement;
	const { scrollY, body: bodyStyles, html: htmlStyles } = snapshot;
	snapshot = null;

	body.style.overflow = bodyStyles.overflow;
	body.style.position = bodyStyles.position;
	body.style.top = bodyStyles.top;
	body.style.left = bodyStyles.left;
	body.style.right = bodyStyles.right;
	body.style.width = bodyStyles.width;
	body.style.paddingRight = bodyStyles.paddingRight;
	html.style.overflow = htmlStyles.overflow;
	html.removeAttribute('data-scroll-locked');
	window.scrollTo(0, scrollY);
}

export function lockDocumentScroll(): () => void {
	if (typeof document === 'undefined') return () => {};

	lockCount += 1;
	if (lockCount === 1) {
		applyScrollLock();
	}

	return () => {
		lockCount = Math.max(0, lockCount - 1);
		if (lockCount === 0) {
			releaseScrollLock();
		}
	};
}
