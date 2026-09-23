'use client';

import {
	type AnimationEvent,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import { BrandLogo } from '@/components';
import { usePrefersReducedMotion } from '@/hooks';

import { cn, Link, startFirmLogoGridWaves } from '@/kit/shared';
import { components } from '@/kit/theme';

import { MANUFACTURER_LOGOS, manufacturerDetailPath } from '@/lib/site';

const SLOT_COUNT = 9;

type LogoManufacturer = (typeof MANUFACTURER_LOGOS)[number];

type LogoSlotState = {
	slotId: string;
	brand: LogoManufacturer;
};

type AnimatedLogoSlotHandle = {
	transitionTo: (brand: LogoManufacturer) => void;
};

function pickNextForSlot(grid: LogoManufacturer[], slotIndex: number): LogoManufacturer {
	const current = grid[slotIndex];
	const taken = new Set<string>();
	for (let index = 0; index < grid.length; index++) {
		if (index !== slotIndex) taken.add(grid[index].slug);
	}

	const uniqueOnGrid = MANUFACTURER_LOGOS.filter(
		(manufacturer) => manufacturer.slug !== current.slug && !taken.has(manufacturer.slug),
	);
	if (uniqueOnGrid.length > 0) {
		return uniqueOnGrid[Math.floor(Math.random() * uniqueOnGrid.length)] as LogoManufacturer;
	}

	const anyOther = MANUFACTURER_LOGOS.filter((manufacturer) => manufacturer.slug !== current.slug);
	if (anyOther.length > 0) {
		return anyOther[Math.floor(Math.random() * anyOther.length)] as LogoManufacturer;
	}

	return current;
}

function cycleOneSlot(prev: LogoSlotState[], slotIndex: number): LogoSlotState[] {
	const nextBrand = pickNextForSlot(
		prev.map((slot) => slot.brand),
		slotIndex,
	);
	if (nextBrand.slug === prev[slotIndex].brand.slug) return prev;
	const next = [...prev];
	next[slotIndex] = { ...next[slotIndex], brand: nextBrand };
	return next;
}

const LOGO_MARK_CLASS =
	'h-8 w-full max-w-[5.25rem] text-fg group-hover:text-gold-soft/90 sm:h-20 sm:max-w-[10.5rem] lg:h-9 lg:max-w-[5.75rem]';

function ManufacturerSlotTooltip({ name }: { name: string }) {
	return (
		<span
			className={cn(
				components.resourceUi.grid.k003,
				'rounded-md border border-line bg-ink/95 px-2 py-0.5 text-center',
				'text-[10.5px] font-medium leading-snug tracking-tight text-fg shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)]',
				'opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-300 ease-out',
				'translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0',
				'group-focus-visible:opacity-100 group-focus-visible:translate-y-0',
			)}
		>
			{name}
		</span>
	);
}

function LogoMark({ manufacturer }: { manufacturer: LogoManufacturer }) {
	return (
		<BrandLogo
			src={manufacturer.logo}
			align="center"
			maskFit="contain"
			className={LOGO_MARK_CLASS}
		/>
	);
}

function StaticLogoSlot({ brand }: { brand: LogoManufacturer }) {
	return (
		<Link
			href={manufacturerDetailPath(brand.slug)}
			className={components.resourceUi.shared.k026}
			aria-label={`${brand.name} Lemon Law`}
		>
			<div className={components.resourceUi.shared.k027}>
				<LogoMark manufacturer={brand} />
			</div>
			<ManufacturerSlotTooltip name={brand.name} />
		</Link>
	);
}

const AnimatedLogoSlot = forwardRef<AnimatedLogoSlotHandle, { initialBrand: LogoManufacturer }>(
	function AnimatedLogoSlot({ initialBrand }, ref) {
		const [display, setDisplay] = useState(initialBrand);
		const [overlay, setOverlay] = useState<LogoManufacturer | null>(null);
		const [dissolve, setDissolve] = useState(false);
		const displaySlugRef = useRef(display.slug);
		const busyRef = useRef(false);
		const queueRef = useRef<LogoManufacturer[]>([]);
		const overlayRef = useRef<LogoManufacturer | null>(null);

		useEffect(() => {
			overlayRef.current = overlay;
		}, [overlay]);

		const runDissolve = (to: LogoManufacturer) => {
			if (to.slug === displaySlugRef.current) {
				busyRef.current = false;
				return;
			}
			busyRef.current = true;
			setDissolve(false);
			setOverlay(to);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setDissolve(true));
			});
		};

		const completeDissolve = () => {
			const settled = overlayRef.current;
			if (!settled) {
				busyRef.current = false;
				return;
			}

			displaySlugRef.current = settled.slug;
			setDisplay(settled);
			setOverlay(null);
			setDissolve(false);
			overlayRef.current = null;

			const queued = queueRef.current;
			queueRef.current = [];
			const next = queued.length > 0 ? queued[queued.length - 1] : null;

			if (next && next.slug !== settled.slug) {
				runDissolve(next);
				return;
			}

			busyRef.current = false;
		};

		function onDissolveAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
			if (event.target !== event.currentTarget) return;
			if (event.animationName !== 'firmDissolveIn') return;
			completeDissolve();
		}

		useImperativeHandle(ref, () => ({
			transitionTo(brand: LogoManufacturer) {
				if (brand.slug === displaySlugRef.current) return;

				if (busyRef.current) {
					if (brand.slug !== displaySlugRef.current) {
						queueRef.current = [...queueRef.current.filter((m) => m.slug !== brand.slug), brand];
					}
					return;
				}

				runDissolve(brand);
			},
		}));

		const active = overlay ?? display;

		return (
			<Link
				href={manufacturerDetailPath(active.slug)}
				className={components.resourceUi.shared.k026}
				aria-label={`${active.name} Lemon Law`}
			>
				<div className={components.resourceUi.shared.k027}>
					<div
						className={cn(
							'firm-logo-stack__layer',
							overlay && dissolve && 'firm-logo-stack__layer--out',
						)}
					>
						<LogoMark manufacturer={display} />
					</div>
					{overlay ? (
						<div
							className={cn(
								'firm-logo-stack__layer firm-logo-stack__layer--front',
								dissolve && 'firm-logo-stack__layer--in',
							)}
							onAnimationEnd={onDissolveAnimationEnd}
						>
							<LogoMark manufacturer={overlay} />
						</div>
					) : null}
				</div>
				<ManufacturerSlotTooltip name={active.name} />
			</Link>
		);
	},
);

function LogoSlot({
	brand,
	animate,
	slotRef,
}: {
	brand: LogoManufacturer;
	animate: boolean;
	slotRef: (instance: AnimatedLogoSlotHandle | null) => void;
}) {
	if (!animate) {
		return <StaticLogoSlot brand={brand} />;
	}
	return <AnimatedLogoSlot ref={slotRef} initialBrand={brand} />;
}

export function FirmManufacturerLogoGrid() {
	const reducedMotion = usePrefersReducedMotion();
	const [slots, setSlots] = useState<LogoSlotState[]>(() =>
		MANUFACTURER_LOGOS.slice(0, SLOT_COUNT).map((brand, index) => ({
			slotId: `firm-slot-${index}`,
			brand,
		})),
	);
	const slotRefs = useRef<(AnimatedLogoSlotHandle | null)[] | null>(null);
	if (slotRefs.current === null) {
		slotRefs.current = Array.from({ length: SLOT_COUNT }, () => null);
	}

	useEffect(() => {
		if (reducedMotion) return undefined;

		return startFirmLogoGridWaves({
			slotCount: SLOT_COUNT,
			onSlotCycle: (slotIndex) => {
				setSlots((prev) => {
					const next = cycleOneSlot(prev, slotIndex);
					const nextBrand = next[slotIndex]?.brand;
					if (nextBrand && nextBrand.slug !== prev[slotIndex]?.brand.slug) {
						slotRefs.current?.[slotIndex]?.transitionTo(nextBrand);
					}
					return next;
				});
			},
		});
	}, [reducedMotion]);

	return (
		<div className={components.resourceUi.grid.k001}>
			<div className={components.resourceUi.grid.k002}>
				{slots.map((slot, index) => (
					<LogoSlot
						key={slot.slotId}
						brand={slot.brand}
						animate={!reducedMotion}
						slotRef={(handle) => {
							if (slotRefs.current) slotRefs.current[index] = handle;
						}}
					/>
				))}
			</div>
		</div>
	);
}
