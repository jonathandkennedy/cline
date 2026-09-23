'use client';

import { memo, useContext, useLayoutEffect } from 'react';
import { MegaBridgeContext } from '@/kit/layout/contexts';

function BridgeEffectsComponent() {
	const ctx = useContext(MegaBridgeContext);
	const snapshot = ctx?.snapshot;

	useLayoutEffect(() => {
		const node = snapshot?.megaFlyoutRef.current;
		if (!node) return;

		const clearBridge = () => {
			node.style.removeProperty('--mega-bridge-x');
			node.style.removeProperty('--mega-bridge-w');
		};

		if (!snapshot || !snapshot.megaOpen || snapshot.activeMega === null) {
			clearBridge();
			return;
		}

		const triggerRef =
			snapshot.activeMega === 'tools' ? snapshot.toolsTriggerRef : snapshot.resourcesTriggerRef;
		const trigger = triggerRef.current;
		const inner = trigger?.closest('.header-inner');
		if (!trigger || !inner) {
			clearBridge();
			return;
		}

		const syncBridge = () => {
			const innerRect = inner.getBoundingClientRect();
			const triggerRect = trigger.getBoundingClientRect();
			node.style.setProperty('--mega-bridge-x', `${triggerRect.left - innerRect.left}px`);
			node.style.setProperty('--mega-bridge-w', `${triggerRect.width}px`);
		};

		syncBridge();
		const raf = requestAnimationFrame(syncBridge);
		window.addEventListener('resize', syncBridge);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', syncBridge);
			clearBridge();
		};
	}, [snapshot]);

	return null;
}

export const BridgeEffects = memo(BridgeEffectsComponent);
BridgeEffects.displayName = 'BridgeEffects';
