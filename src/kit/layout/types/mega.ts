/** Interface-core types shared with marketing + tool shells. */
import type { RefObject } from 'react';

export type MegaKind = 'tools' | 'resources' | null;

export type MegaBridgeSnapshot = {
	megaFlyoutRef: RefObject<HTMLDivElement | null>;
	megaOpen: boolean;
	activeMega: MegaKind;
	toolsTriggerRef: RefObject<HTMLButtonElement | null>;
	resourcesTriggerRef: RefObject<HTMLButtonElement | null>;
};

export type MegaBridgeContextValue = {
	snapshot: MegaBridgeSnapshot | null;
	publishMegaBridge: (snapshot: MegaBridgeSnapshot | null) => void;
};
