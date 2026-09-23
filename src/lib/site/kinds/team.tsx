'use client';

import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { CaseReviewCtaButton, PhoneCta, Reveal } from '@/components';
import { cn } from '@/kit/ui/functions/cn';
import { TEAM_MEMBERS, TEAM_PAGE } from '@/lib/site';
import { teamMemberPath } from '@/lib/cms/tables/team';
import { Link } from '@/components/link';
import type { SiteComponentKindMap } from '@/kit/catalog';
import { ResourceBand } from '@/kit/blocks/spotlight';

type TeamMember = (typeof TEAM_MEMBERS)[number];

function MemberPortrait({
	member,
	priority = false,
	sizes,
	className,
	grayscale = false,
}: {
	member: TeamMember;
	priority?: boolean;
	sizes: string;
	className?: string;
	grayscale?: boolean;
}) {
	const isSvg = member.image.endsWith('.svg');
	return (
		<Image
			src={member.image}
			alt={member.imageAlt}
			fill
			priority={priority}
			sizes={sizes}
			unoptimized={isSvg}
			className={cn(
				'object-cover object-top transition-[filter,opacity] duration-300',
				grayscale ? 'grayscale opacity-65' : 'grayscale-0 opacity-100',
				className,
			)}
		/>
	);
}

function TeamRosterPanel() {
	const tablistId = useId();
	const panelId = useId();
	const initial =
		TEAM_MEMBERS.find((member) => member.id === TEAM_PAGE.defaultMemberId) ?? TEAM_MEMBERS[0];
	const [selectedId, setSelectedId] = useState(initial.id);
	const selected = TEAM_MEMBERS.find((member) => member.id === selectedId) ?? initial;

	useEffect(() => {
		const applyHash = () => {
			const id = window.location.hash.replace(/^#/, '');
			if (TEAM_MEMBERS.some((member) => member.id === id)) {
				setSelectedId(id);
			}
		};
		applyHash();
		window.addEventListener('hashchange', applyHash);
		return () => window.removeEventListener('hashchange', applyHash);
	}, []);

	return (
		<div className="space-y-10 md:space-y-12">
			{/* Featured: portrait + copy once — no name/role overlay duplication */}
			<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-16">
				<Reveal>
					<div
						id={selected.id}
						className="relative mx-auto aspect-[4/5] w-full max-w-sm scroll-mt-28 overflow-hidden rounded-[var(--radius-card)] border border-line/70 bg-ink/35 lg:mx-0 lg:max-w-none"
					>
						<MemberPortrait member={selected} priority sizes="(max-width: 1024px) 90vw, 440px" />
					</div>
				</Reveal>

				<Reveal delay={80}>
					<div
						id={panelId}
						role="tabpanel"
						aria-labelledby={`${tablistId}-${selected.id}`}
						className="flex max-w-xl flex-col justify-center space-y-5 lg:min-h-[28rem] lg:py-2"
					>
						<div className="space-y-2">
							<span className="eyebrow">{TEAM_PAGE.eyebrow}</span>
							<h2 className="font-display text-[clamp(1.75rem,3vw,2.35rem)] font-semibold tracking-tight text-fg">
								{selected.name}
							</h2>
							<p className="text-[13px] font-medium uppercase tracking-[0.16em] text-gold">
								{selected.role}
							</p>
						</div>

						{selected.bio.length > 0 ? (
							<div className="space-y-3.5 text-[15px] leading-relaxed text-muted md:text-[16px]">
								{selected.bio.map((paragraph) => (
									<p key={paragraph.slice(0, 32)}>{paragraph}</p>
								))}
							</div>
						) : null}

						{selected.profile ? (
							<Link
								href={teamMemberPath(selected.id)}
								className="text-[15px] font-semibold text-gold underline-offset-4 hover:underline"
							>
								Read {selected.name}&rsquo;s full biography
							</Link>
						) : null}

						<div className="flex flex-wrap gap-3 pt-1">
							<CaseReviewCtaButton leadContextId="team" className="btn btn-primary btn-md">
								{TEAM_PAGE.ctaLabel}
							</CaseReviewCtaButton>
							<PhoneCta size="md" />
						</div>
					</div>
				</Reveal>
			</div>

			<nav aria-label="Attorney biographies" className="text-[14px] text-muted">
				<span className="mr-2 font-semibold text-fg">Full biographies:</span>
				{TEAM_MEMBERS.filter((member) => member.profile).map((member, index) => (
					<span key={member.id}>
						{index > 0 ? ' · ' : null}
						<Link href={teamMemberPath(member.id)} className="text-gold hover:underline">
							{member.name}
						</Link>
					</span>
				))}
			</nav>

			{/* Compact portrait selector — lighter than v1 card grid */}
			<div className="space-y-5 border-t border-line/50 pt-8 md:pt-10">
				<Reveal delay={90}>
					<div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
						<span className="eyebrow">{TEAM_PAGE.selectorLabel}</span>
						<p className="max-w-lg text-[14px] leading-relaxed text-muted">{TEAM_PAGE.subhead}</p>
					</div>
				</Reveal>

				<div
					role="tablist"
					aria-label={TEAM_PAGE.selectorLabel}
					className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7 md:gap-3"
				>
					{TEAM_MEMBERS.map((member, index) => {
						const isSelected = member.id === selected.id;
						const delay = index < 2 ? 80 : index < 4 ? 90 : index < 6 ? 160 : 180;
						return (
							<Reveal key={member.id} delay={delay}>
								<button
									type="button"
									role="tab"
									id={`${tablistId}-${member.id}`}
									aria-selected={isSelected}
									aria-controls={panelId}
									tabIndex={isSelected ? 0 : -1}
									onClick={() => setSelectedId(member.id)}
									onKeyDown={(event) => {
										if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
											return;
										}
										event.preventDefault();
										const delta = event.key === 'ArrowRight' ? 1 : -1;
										const nextIndex = (index + delta + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
										setSelectedId(TEAM_MEMBERS[nextIndex].id);
									}}
									className="group flex w-full flex-col gap-2 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
								>
									<span
										className={cn(
											'relative aspect-square w-full overflow-hidden border transition duration-300',
											isSelected
												? 'border-gold shadow-[0_0_0_1px_rgba(212,175,55,0.45)]'
												: 'border-line/60 group-hover:border-gold/40',
										)}
									>
										<MemberPortrait
											member={member}
											sizes="(max-width: 640px) 30vw, 120px"
											grayscale={!isSelected}
											className="group-hover:grayscale-0 group-hover:opacity-100"
										/>
										{isSelected ? (
											<span className="absolute bottom-1.5 left-1.5 rounded-sm bg-base/85 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold">
												{TEAM_PAGE.selectedLabel}
											</span>
										) : null}
									</span>
									<span className="min-w-0 px-0.5">
										<span
											className={cn(
												'block truncate font-display text-[13px] font-semibold tracking-tight sm:text-[14px]',
												isSelected ? 'text-fg' : 'text-fg/85',
											)}
										>
											{member.name}
										</span>
										<span className="mt-0.5 block truncate text-[10px] font-medium uppercase tracking-[0.12em] text-subtle">
											{member.role}
										</span>
									</span>
								</button>
							</Reveal>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export const teamKinds: SiteComponentKindMap = {
	'team.roster': () => (
		<ResourceBand borderTop={false} pad="match">
			<TeamRosterPanel />
		</ResourceBand>
	),
};
