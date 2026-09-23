'use client';

import { useSyncExternalStore } from 'react';

function subscribeNoop() {
	return () => {};
}

export function useIsClientMounted() {
	return useSyncExternalStore(
		subscribeNoop,
		() => true,
		() => false,
	);
}
