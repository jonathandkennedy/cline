'use client';

import { useSyncExternalStore } from 'react';
import { useIsClientMounted } from '@/kit/ui';
import { getDockPortalRoot, getModalPortalRoot, getToastPortalRoot } from '@/lib/portal';

export { useIsClientMounted };

function subscribeNoop() {
	return () => {};
}

export function useModalPortalRoot() {
	return useSyncExternalStore(subscribeNoop, getModalPortalRoot, () => null);
}

export function useToastPortalRoot() {
	return useSyncExternalStore(subscribeNoop, getToastPortalRoot, () => null);
}

export function useDockPortalRoot() {
	return useSyncExternalStore(subscribeNoop, getDockPortalRoot, () => null);
}
