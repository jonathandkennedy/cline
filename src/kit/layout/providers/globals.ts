'use client';

import { createContextProvider, createProvider } from '@/kit/ui/core/nexus';
import { BridgeEffects } from '@/kit/ui/components/effects/bridge';
import { LayoutContext, MegaBridgeContext } from '../contexts';
import { useLayoutContext } from '../hooks/use-layout';
import { useMegaContext } from '../hooks/use-mega';

export const { provider } = createProvider({
	tree: {
		mega: {
			provider: createContextProvider({
				context: MegaBridgeContext,
				hook: useMegaContext,
			}),
			elements: {
				bridge: BridgeEffects,
			},
		},
		layout: {
			provider: createContextProvider({
				context: LayoutContext,
				hook: useLayoutContext,
			}),
		},
	},
});
