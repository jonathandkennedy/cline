/** Class strings merged onto glyph CSS module keys (Agent/Web `globals` pattern). */
export const globals: Record<string, string> = {
	shell: 'container-x',
	card: 'card card-static',
	avatarShape: 'inline-block shrink-0 select-none overflow-hidden rounded-full',
	avatarImageWrap: 'bg-surface-2',
	avatarImage: 'size-full object-cover object-top',
	avatarFallback:
		'inline-flex items-center justify-center border border-line bg-surface-2 font-display font-semibold leading-none text-muted',
	avatarSize28: 'avatar-28',
	avatarSize36: 'avatar-36',
	avatarSize40: 'avatar-40',
	avatarSize48: 'avatar-48',
	avatarSize64: 'avatar-64',
	backdropToolPageRoot: 'backdrop',
	backdropToolPageStandalone: 'backdrop--standalone',
	backdropMegaMenu: 'mega-menu-backdrop',
	markerRoot: 'pointer-events-none h-px w-px',
	progressRoot: 'scroll-progress',
	topRoot: 'site-back-to-top',
	checklistItemRoot: 'flex gap-3',
	checklistItemIconWrap:
		'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-recovery/15',
	checklistItemIcon: 'text-recovery',
	checklistItemText: 'text-[15px] leading-relaxed text-fg/90',
	toolCardRoot: 'tool-card group relative flex h-full flex-col p-7 md:p-8',
	toolCardFeaturedRing: '',
	toolCardIndex:
		'pointer-events-none absolute right-5 top-2 select-none font-display text-[100px] font-extrabold leading-none text-white/[0.035]',
	toolCardHeaderRow: 'relative flex items-start justify-between',
	toolCardIconWrap:
		'flex h-13 w-13 items-center justify-center rounded-2xl border border-line bg-ink/80 motion-ui transition-[border-color,background-color] group-hover:border-gold/60 group-hover:bg-ink',
	toolCardBadgeGold: 'badge badge-gold',
	toolCardBadgeNeutral: 'badge badge-neutral',
	toolCardTitle: 'relative mt-8 text-[23px] font-semibold leading-tight tracking-[-0.01em] text-fg',
	toolCardDescription: 'relative mt-3.5 flex-1 text-[14.5px] leading-relaxed text-muted',
	toolCardFooter:
		'relative mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 border-t border-line pt-5 md:pt-8',
	toolCardCta:
		'motion-ui inline-flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[15px] font-semibold leading-snug text-cta transition-[gap] group-hover:gap-x-2.5',
	toolCardMinutes:
		'inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap pt-0.5 text-[12.5px] text-faint',
	toolShellRoot: 'flex flex-col',
	toolShellStandalone: 'tool-shell--standalone',
	toolShellIntro: 'tool-shell--intro',
	toolShellBgBase: 'bg-base',
	toolShellWithBg: 'has-tool-bg tool-shell--surface',
	toolShellPageRoot: 'tool-page flex flex-col',
	toolShellPageIntro: 'tool-page--intro',
	toolShellPageWorkbench: 'tool-page--workbench',
	brandLogoRoot: 'group inline-flex items-center transition-opacity hover:opacity-90',
	brandLogoFitHeight: 'inline-flex items-center',
	brandLogoAlignStart: 'inline-flex items-center',
	brandLogoAlignEnd: 'inline-flex items-center justify-end',
	logoImageBlock: 'block shrink-0',
	eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gold',
	captureBackdrop:
		/* ABRE-81: z-60 — keep below `TOAST_LAYER_Z_INDEX` so file errors are not blurred behind this overlay. */
		'fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:p-4',
	captureDialog:
		'modal relative flex w-full min-h-0 max-w-[960px] flex-col overflow-hidden md:flex-row md:items-stretch',
	capturePanel:
		'relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-5 pb-[7.25rem] sm:p-7 md:min-h-full md:p-8 md:pb-[6.5rem] [-webkit-overflow-scrolling:touch]',
	capturePanelBody: 'my-auto w-full min-h-0 shrink-0',
	captureTrustShell:
		'pointer-events-none absolute inset-x-0 bottom-0 z-10 rounded-b-[calc(var(--radius-lg)-1px)] border-t border-line/70 bg-gradient-to-t from-[var(--color-surface)] via-[color-mix(in_oklab,var(--color-surface)_96%,transparent)] to-[color-mix(in_oklab,var(--color-surface)_90%,transparent)] shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md md:inset-x-auto md:left-1/2 md:w-1/2 md:rounded-bl-none',
	captureClose:
		'absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 hover:text-white md:right-5 md:top-5 md:bg-transparent md:text-subtle md:backdrop-blur-none md:hover:bg-transparent md:hover:text-fg',
	/* Media rail: edge-to-edge cover on md+ as a half-width column.
	   Asset is a bust portrait (face/shoulders dominant with headroom).
	   ABRE-88: hide below md — a short stacked band object-covers to a
	   sliver (412×915 showed only the eyes). ABRE-57: do not revive the
	   prior ~46dvh / 21rem phone band. */
	captureHero:
		'relative isolate hidden w-full shrink-0 overflow-hidden bg-[#0b1220] md:block md:h-auto md:min-h-0 md:w-1/2 md:self-stretch',
	captureHeroImage: 'absolute inset-0 !h-full !w-full max-w-none object-cover object-[center_16%]',
	captureHeroGradient:
		'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5',
	captureHeroLogo:
		'pointer-events-none absolute bottom-0 left-0 z-[1] p-6 [&_img]:!h-auto [&_img]:!w-[9rem]',
	capturePill: 'pill w-fit max-w-full self-start',
	captureHeading:
		'mt-3 font-display text-[24px] font-extrabold leading-[1.15] tracking-tight sm:mt-4 sm:text-[27px]',
	captureInlineRoot:
		'relative z-10 w-full rounded-xl border border-line/85 bg-surface/92 p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-5',
	captureInlineHeading:
		'mt-2.5 font-display text-[19px] font-extrabold leading-[1.12] tracking-tight sm:mt-3 sm:text-[21px]',
	captureLead: 'mt-2 text-[14px] leading-relaxed text-muted sm:text-[14.5px]',
	captureInlineLead: 'mt-2 text-[12px] leading-snug text-muted',
	captureEstimateCard: 'card-inset mt-5 p-4',
	captureEstimateLabel: 'text-[10.5px] font-semibold uppercase tracking-[0.16em] text-subtle',
	captureEstimateValue: 'tabular mt-1 text-[34px] font-bold leading-none text-recovery',
	captureEstimateHint: 'mt-1.5 text-[11.5px] text-faint',
	captureVehicleGrid: 'grid grid-cols-3 gap-1.5',
	captureVehicleTile:
		'tile flex min-h-[44px] items-center justify-center gap-1 px-1.5 py-2.5 text-[11px] font-medium leading-tight text-fg sm:px-2 sm:text-[12px]',
	captureInput: 'input px-4 py-3',
	captureTextarea: 'input resize-y px-4 py-3',
	captureSubmit: 'btn btn-primary btn-lg w-full',
	captureSubmitCompact: 'btn btn-primary btn-md w-full',
	captureFootnote: 'pb-4 text-center text-[11.5px] text-faint',
	captureFootnoteCompact: 'pb-1 text-center text-[11px] text-faint',
	captureTrustRow:
		'flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 pb-2 text-[11px] text-faint',
	captureTrustItem: 'flex items-center gap-1.5',
	captureSuccessRoot: 'flex flex-col px-1 py-2 text-center md:py-6',
	captureSuccessIcon:
		'mx-auto mb-5 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-gold/25 bg-gradient-to-br from-gold/15 via-ink/80 to-ink shadow-[0_12px_32px_-16px_rgba(0,0,0,0.65)]',
	captureSuccessCheck: 'h-9 w-9 text-gold-soft',
	captureSuccessPhone:
		'mx-auto mt-8 flex max-w-sm flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-line/35 bg-ink/45 px-4 py-3 text-[13.5px]',
	captureSuccessPill: 'pill mx-auto w-fit max-w-full',
	captureSuccessSubmit: 'btn btn-secondary btn-md mx-auto mt-9 w-full max-w-sm',
	captureAttachmentsCard: 'card-inset p-3.5',
	captureAttachmentsLabel: 'text-[10.5px] font-semibold uppercase tracking-[0.14em] text-subtle',
	captureAttachmentsHeader: 'flex items-center justify-between gap-3',
	captureAttachmentsAdd:
		'inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 text-[12.5px] font-semibold text-cta transition hover:text-gold',
	captureAttachmentsCheck: 'text-gold',
	captureAttachmentsSpinner: 'animate-spin text-gold',
	captureAttachmentsCount:
		'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold/15 px-1.5 text-[11px] font-bold tabular text-gold',
	captureAttachmentsStatus: 'sr-only',
	captureAttachmentsList: 'mt-2.5 space-y-1.5 border-t border-line/60 pt-2.5',
	captureAttachmentsRow: 'flex items-center justify-between gap-2',
	captureAttachmentsName: 'truncate text-[12.5px] font-medium text-fg',
	captureAttachmentsSize: 'text-[11px] text-faint tabular',
	captureAttachmentsStep: 'mt-1 text-[11px] font-medium text-muted transition-colors',
	captureAttachmentsProgressTrack: 'mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2',
	captureAttachmentsProgressBar:
		'h-full rounded-full bg-gold transition-[width] duration-150 ease-out',
	captureAttachmentsProgressBarFailed:
		'h-full rounded-full bg-danger transition-[width] duration-150 ease-out',
	captureAttachmentsRemove:
		'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-subtle transition hover:text-danger',
	fieldError: 'ml-1 mt-1.5 text-xs text-danger',
	trustRoot:
		'flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 pt-2 pb-2.5 sm:flex-nowrap sm:gap-2.5 sm:px-5 sm:pb-3',
	trustRating: 'text-[11.5px] leading-snug text-muted sm:text-[12.5px]',
	trustCopy: 'font-semibold text-fg',
	trustRatingValue: 'shrink-0 pl-1',
	sectionEyebrow: 'eyebrow',
	homeMinW0: 'min-w-0',
	homeFullHeight: 'h-full',
	homeIconWellGold: 'icon-well icon-well-gold',
	homeSectionH2:
		'display mt-2.5 max-w-[22ch] text-balance text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.12]',
	homeSectionBody: 'mt-3 max-w-xl text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	homeSectionGridMt: 'mt-10 md:mt-12',
	homeSectionHeaderRow:
		'flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8',
	homeSectionEligibilityLink:
		'inline-flex min-h-[44px] shrink-0 items-center gap-1.5 text-[13px] font-semibold text-gold-soft transition hover:gap-2 hover:text-gold',
	homeHeroRoot:
		'home-hero relative isolate flex min-h-0 flex-1 flex-col justify-center overflow-hidden',
	homeHeroImage: 'z-0 object-cover object-[72%_center] sm:object-[78%_center] md:object-right',
	homeHeroMobileGradientWrap: 'pointer-events-none absolute inset-0 z-[1] md:hidden',
	homeHeroDesktopGradientWrap: 'pointer-events-none absolute inset-0 z-[1] hidden md:block',
	homeHeroRadialWrap: 'pointer-events-none absolute inset-0 z-[1]',
	homeHeroBottomFade:
		'pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-base via-base/32 to-transparent',
	homeHeroBottomBar:
		'pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-base to-transparent',
	homeHeroTexture:
		"pointer-events-none absolute inset-0 z-[1] bg-[url('/images/textures/topo.svg')] bg-[length:130%] bg-center opacity-[0.16] mix-blend-soft-light",
	homeHeroGlowGold:
		'glow pointer-events-none absolute z-[1] -left-32 top-0 h-[20rem] w-[20rem] bg-gold/22',
	homeHeroGlowCta:
		'glow pointer-events-none absolute z-[1] -right-28 bottom-[-4rem] h-72 w-72 bg-cta/12',
	homeHeroInner:
		'container-x home-hero__inner relative z-[2] grid min-h-0 flex-1 items-center gap-5 sm:gap-6 md:gap-7 lg:grid-cols-[1.32fr_1fr] lg:gap-8',
	homeHeroFadeUp: 'fade-up',
	homeHeroPill: 'pill shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-gold)_12%,transparent)]',
	homeHeroPillIcon: 'text-gold-soft',
	homeHeroHeadline:
		'home-hero__headline mt-4 max-w-[28ch] text-balance text-[clamp(1.05rem,2.2vw,1.35rem)] font-semibold leading-tight tracking-[-0.02em] text-fg lg:mt-5',
	homeHeroTitle:
		'display home-hero__title mt-4 max-w-[16ch] text-balance text-[clamp(1.85rem,4.6vw,3.65rem)] leading-[1.04] tracking-[-0.03em] sm:max-w-[17ch] lg:mt-5',
	homeHeroTitleAccent: 'gold-grad relative text-balance',
	homeHeroLede:
		'home-hero__lede mt-5 max-w-xl text-[15px] leading-[1.65] text-fg/85 lg:mt-5 lg:text-[16px]',
	homeHeroCtaRow: 'mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch lg:mt-6',
	homeHeroPrimaryCta:
		'btn btn-primary btn-lg min-h-[44px] w-full max-w-full justify-center shadow-[0_12px_36px_-12px_rgba(188,143,13,0.65)] sm:min-h-[48px] sm:w-auto',
	homeHeroPhoneCta: 'min-h-[44px] w-full justify-center sm:min-h-[48px] sm:w-auto',
	homeHeroTrust:
		'home-hero__trust mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center sm:mt-5 sm:justify-start sm:gap-x-0 sm:text-left',
	homeHeroTrustItem: 'inline-flex items-center text-[12.5px] text-subtle sm:text-[13px]',
	homeHeroTrustSep: 'mx-2.5 hidden h-3.5 w-px bg-line sm:inline-block',
	homeHeroProps: 'home-hero__props fade-up hidden min-h-0 flex-col gap-2.5 lg:flex',
	homeHeroPropCard:
		'card card-static flex items-center gap-3.5 border-line/85 bg-surface/70 p-4 backdrop-blur-md',
	homeHeroPropIconWrap:
		'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/22 bg-gold/[0.08] sm:h-11 sm:w-11 sm:rounded-xl',
	homeHeroPropIcon: 'text-gold',
	homeHeroPropTitle: 'text-[15px] font-semibold tracking-tight text-fg sm:text-[15.5px]',
	homeHeroPropBody: 'mt-1 text-[13px] leading-relaxed text-muted sm:text-[13.5px]',
	homeSocialProofRoot: 'home-social-proof shrink-0 rule-y bg-ink/55',
	homeSocialProofInner: 'container-x py-2 max-md:flex max-md:flex-col max-md:gap-4 max-md:py-10',
	homeSocialProofRow: 'flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5',
	homeSocialProofLeadRow:
		'flex min-w-0 items-center justify-center gap-4 md:justify-between lg:contents',
	homeSocialProofReviewsLink:
		'group flex min-w-0 shrink-0 items-center gap-5 py-0.5 transition-opacity hover:opacity-95 max-md:w-full max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-4 md:gap-3.5',
	homeSocialProofReviewsMeta:
		'min-w-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center',
	homeSocialProofRatingRow: 'flex items-center gap-1.5 whitespace-nowrap',
	homeSocialProofRatingValue: 'text-[13px] font-semibold tabular text-gold-soft',
	homeSocialProofCaption:
		'mt-0.5 max-w-[9.75rem] text-[11.5px] leading-snug text-subtle transition-colors group-hover:text-muted max-md:mt-0 max-md:max-w-none max-md:text-center sm:max-w-[11.5rem] md:max-w-none md:text-[12px] md:whitespace-nowrap',
	homeSocialProofExploreMd: 'hidden shrink-0 md:block lg:hidden',
	homeSocialProofDivider:
		'hidden h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-line to-transparent lg:block',
	homeSocialProofTickerWrap: 'min-w-0 flex-1',
	homeSocialProofExploreLg: 'hidden shrink-0 lg:block',
	homeSocialProofMobileCta: 'home-social-proof__mobile-cta mt-2 mb-1 flex justify-center md:hidden',
	homeStatsRoot: 'rule-y bg-ink/30',
	homeStatsGrid: 'grid-gap grid min-w-0 grid-cols-2 md:grid-cols-4',
	homeStatsCell:
		'card card-static group relative min-w-0 overflow-hidden px-2.5 py-6 text-center motion-ui sm:px-3 md:py-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
	homeStatsCellHoverLine:
		'pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 transition group-hover:opacity-100',
	homeStatsValue:
		'display tabular text-[clamp(1.55rem,2.8vw,2.15rem)] tracking-[-0.04em] text-fg transition group-hover:text-gold-soft',
	homeStatsLabel:
		'mt-2 break-words text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] text-subtle sm:tracking-[0.12em] md:text-[11.5px] md:tracking-[0.14em]',
	homeBrandsRoot: 'rule-y bg-ink/30',
	homeBrandsIntro: 'container-x section-y-sm flex flex-col items-center gap-4 text-center md:gap-5',
	homeBrandsEyebrow: 'text-[11px] font-semibold uppercase tracking-[0.18em] text-subtle',
	homeBrandsCtaRow:
		'flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center',
	homeBrandsSecondaryCta: 'btn btn-secondary btn-md',
	homeBrandsPrimaryCta: 'btn btn-primary btn-md',
	homeClosingSection: 'rule-y',
	homeClosingInner: 'container-x section-y',
	homeFounderRoot: 'rule-y bg-ink/30',
	homeFounderGrid:
		'container-x section-y grid items-center gap-8 md:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12',
	homeFounderPortraitWrap: 'relative mx-auto w-full max-w-sm',
	homeFounderGlow: 'glow absolute -inset-6 -z-10 bg-gold/12',
	homeFounderCard: 'card overflow-hidden border-gold/20 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]',
	homeFounderImageAspect: 'relative aspect-[4/5]',
	homeFounderImage: 'object-cover object-top',
	homeFounderImageOverlay:
		'absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent',
	homeFounderImageCaption: 'absolute inset-x-0 bottom-0 p-5 pt-16',
	homeFounderName:
		'font-display text-[19px] font-extrabold leading-tight tracking-tight text-white',
	homeFounderRole: 'mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-soft',
	homeFounderParagraphMuted:
		'mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	homeFounderStatsGrid: 'mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5',
	homeFounderStatCard: 'card-inset border-line p-3 transition hover:border-gold/25',
	homeFounderStatValue: 'display text-[18px] tracking-tight text-fg md:text-[19px]',
	homeFounderStatLabel: 'mt-1 text-[11px] leading-snug text-subtle',
	homeFounderCtaRow: 'mt-8 flex flex-wrap gap-2 md:mt-9',
	homeFounderPrimaryCta: 'btn btn-primary btn-md',
	homeFounderLinksRow:
		'mt-6 flex flex-col items-center gap-y-5 border-t border-dashed border-line pb-0 pt-14 text-center text-[13px] sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-4 sm:gap-y-2 sm:border-t-0 sm:py-0 sm:text-left md:mt-18',
	homeFounderResourceLink:
		'inline-flex min-h-11 items-center justify-center font-semibold text-cta transition hover:text-gold-soft',
	homeFounderLinkSep: 'hidden h-3 w-px bg-line sm:inline-block',
	homePathRoot: 'rule-y bg-ink/20',
	homePathInner: 'container-x section-y',
	homePathGrid: 'grid-gap grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
	homePathTileLink:
		'group card card-static flex h-full flex-col overflow-hidden transition-colors hover:border-gold/40',
	homePathTileMedia:
		'relative aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-line/80 bg-ink/45',
	homePathTileImage: 'object-cover object-center transition duration-500 group-hover:scale-[1.03]',
	homePathTilePlaceholder:
		'absolute inset-0 bg-gradient-to-br from-ink/70 via-surface/30 to-ink/50',
	homePathTileOverlay: 'pointer-events-none absolute inset-0 bg-ink/60',
	homePathTileBody: 'resource-tile-body card-pad flex min-h-0 flex-1 flex-col',
	homePathTileTitle:
		'mt-4 text-[15px] font-semibold tracking-tight text-fg group-hover:text-gold-soft md:text-[16px]',
	homePathTileBodyText: 'mt-2 flex-1 text-[13.5px] leading-relaxed text-muted md:text-[14px]',
	homePathTileCta: 'mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cta',
	homePathTileCtaIcon: 'transition group-hover:translate-x-0.5',
	homeProcessRoot: 'relative isolate overflow-hidden rule-y bg-ink/30',
	homeProcessTexture:
		"pointer-events-none absolute inset-0 -z-10 bg-[url('/images/textures/topo.svg')] bg-cover bg-center opacity-45",
	homeProcessGlow: 'glow pointer-events-none absolute -left-24 top-1/3 h-64 w-64 bg-gold/10',
	homeProcessInner: 'container-x section-y',
	homeProcessGrid: 'grid-gap grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
	homeProcessStepCard:
		'card card-static group relative flex h-full flex-col overflow-hidden border-line bg-surface/55 p-5 backdrop-blur-sm md:p-6',
	homeProcessStepCardFeatured: 'border-gold/25',
	homeProcessStepHitArea: 'absolute inset-0 z-0 cursor-pointer rounded-[inherit]',
	homeProcessStepOverlay: 'hidden',
	homeProcessStepBody: 'pointer-events-none relative z-[1] flex h-full flex-col',
	homeProcessStepHeader: 'flex items-center gap-3',
	homeProcessStepNumber: 'display text-[13px] font-bold tabular tracking-[-0.5px] text-gold',
	homeProcessStepConnector:
		'hidden h-px flex-1 bg-gradient-to-r from-gold/35 via-line to-transparent lg:block',
	homeProcessStepTitle:
		'mt-5 text-[16.5px] font-semibold tracking-tight text-fg transition group-hover:text-gold-soft md:text-[17px]',
	homeProcessStepBodyText: 'mt-2 flex-1 text-[13.5px] leading-relaxed text-muted md:text-[14px]',
	homeProcessStepCta:
		'mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cta transition-[gap,color] group-hover:gap-2 group-hover:text-gold-soft',
	homeProcessEligibilityLink: 'sm:pt-0.5',
	homePromptRoot: 'rule-y',
	homePromptInner: 'container-x section-y',
	homePromptCard:
		'card card-static relative flex flex-col gap-8 overflow-hidden border-line p-6 sm:p-8 md:flex-row md:items-center md:gap-12 md:p-10 lg:gap-14',
	homePromptGlowWrap: 'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
	homePromptTopLine:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent',
	homePromptCoverLink: 'group relative mx-auto block shrink-0 transition md:mx-0 md:self-center',
	homePromptCoverImage:
		'h-auto w-[8.5rem] drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)] transition duration-300 group-hover:opacity-95 sm:w-36 md:w-[10.25rem]',
	homePromptContent:
		'relative flex min-w-0 flex-1 flex-col items-center gap-4 md:items-start md:gap-5 md:py-1',
	homePromptPill: 'pill mx-auto w-fit md:mx-0',
	homePromptTitle: 'mt-0 max-w-[28ch] text-pretty text-center md:text-left sm:max-w-none',
	homePromptBody: 'mt-0 max-w-xl self-stretch text-left',
	homePromptCtaRow:
		'flex flex-col items-center gap-2 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start md:pt-3',
	homePromptPrimaryCta: 'btn btn-primary btn-md inline-flex shrink-0',
	homePromptSecondaryCta:
		'inline-flex min-h-11 items-center gap-1.5 px-1 text-[13px] font-semibold text-cta transition hover:gap-2 hover:text-gold-soft',
	homeQualifyRoot: 'rule-y',
	homeQualifyInner: 'container-x section-y',
	homeQualifyGrid: 'grid items-center gap-10 lg:grid-cols-2 lg:gap-14',
	homeQualifyList: 'mt-7 space-y-3.5',
	homeQualifyCtaRow: 'mt-10 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-11',
	homeQualifyPrimaryCta: 'btn btn-primary btn-md',
	homeQualifySecondaryCta: 'btn btn-secondary btn-md',
	homeQualifyRecoveryCard:
		'card card-static relative overflow-hidden border-gold/20 p-6 shadow-[0_30px_80px_-40px_rgba(188,143,13,0.35)] md:p-8',
	homeQualifyRecoveryTopLine:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent',
	homeQualifyRecoveryGlowRecovery: 'glow -right-16 -top-16 h-56 w-56 bg-recovery/18',
	homeQualifyRecoveryGlowGold: 'glow -left-20 bottom-0 h-40 w-40 bg-gold/10',
	homeQualifyRecoveryRelative: 'relative',
	homeQualifyRecoveryValue:
		'tabular mt-2.5 text-[clamp(2.5rem,6vw,3.75rem)] font-bold leading-none tracking-[-0.03em] text-recovery',
	homeQualifyRecoveryNote: 'mt-3 max-w-md text-[13px] leading-relaxed text-muted md:text-[13.5px]',
	homeQualifyBreakdownGrid: 'mt-6 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3',
	homeQualifyBreakdownCell: 'card-inset min-w-0 border-line p-3 text-center',
	homeQualifyBreakdownValue: 'tabular text-[16.5px] font-semibold tracking-tight text-fg',
	homeQualifyBreakdownKey: 'mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-subtle',
	homeIntroVideoRoot: 'rule-y bg-ink/20',
	homeIntroVideoInner: 'container-x section-y',
	homeIntroVideoGrid: 'grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-14',
	homeIntroVideoTitle:
		'display max-w-[20ch] text-balance text-[clamp(1.45rem,3vw,2.15rem)] leading-[1.1] tracking-tight md:max-w-none',
	homeIntroVideoTitleAccent: 'gold-grad',
	homeIntroVideoFrame:
		'relative mt-6 aspect-video overflow-hidden rounded-xl border border-line bg-ink/60 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)]',
	homeIntroVideoIframe: 'absolute inset-0 h-full w-full border-0',
	homeIntroVideoCopy: 'flex flex-col gap-4 md:gap-5 lg:pt-1',
	homeIntroVideoParagraph: 'text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	homeToolsRoot: 'rule-y',
	homeToolsInner: 'container-x section-y',
	homeToolsHeadlineWrap: 'min-w-0 flex-1',
	homeToolsHeadline: 'max-w-none text-pretty text-balance',
	homeToolsGrid:
		'mt-4 grid-gap grid min-w-0 grid-cols-1 sm:mt-10 md:mt-12 md:auto-rows-fr lg:grid-cols-3',
	homeToolsFooter: 'mt-14 flex flex-wrap items-center justify-center gap-2 md:mt-[4.5rem]',
	homeToolsGuidebookCta: 'btn btn-primary btn-md',
	homeToolsLearnCta: 'btn btn-secondary btn-md',
	resource_prose: 'resource-prose text-[16px] leading-[1.75] text-muted md:text-[16.5px]',
	resource_asideSectionLabel: 'text-[11px] font-semibold uppercase tracking-[0.16em] text-gold',
	resource_sectionTitle:
		'display min-w-0 flex-1 text-balance text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.15]',
	resource_sectionBody: 'mt-3.5 text-[15px] leading-relaxed text-muted md:text-[15.5px]',
	resource_bandGrid: 'grid-gap mt-10 grid sm:grid-cols-2 md:mt-12',
	resource_grid: 'grid-gap grid w-full min-w-0',
	resource_readingColumn: 'mx-auto w-full max-w-3xl',
	resource_narrativeColumn: 'mx-auto w-full max-w-[42rem]',
	resource_indexedBody: 'mt-6 space-y-5 sm:mt-7',
	resource_supportingText: 'text-[14.5px] leading-relaxed text-muted',
	resource_bleedMain: 'bg-ink/15',
	resource_bleedAlt: 'bg-ink/28',
	resource_faqIntroStickyAside: 'faq-intro-sticky',
	resource_bannerCtaRow:
		'flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6',
	resource_bannerCtaRowDual:
		'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3',
	resource_bannerCtaRowAsideStack: 'flex w-full flex-col gap-3',
	resource_bannerCtaRowCentered:
		'flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6',
	resource_faqAnswerSpine: 'w-full max-w-3xl',
	resource_statuteLinkCard:
		'card card-static group flex h-full items-start gap-3 p-4 transition hover:border-gold/30',
	resource_statuteLinkIcon:
		'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink/70 text-gold transition group-hover:border-gold/35',
	resource_statuteLinkLabel:
		'block text-[14px] font-medium leading-snug text-fg transition group-hover:text-gold-soft',
	resource_statuteLinkAction:
		'mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-subtle',
	resource_categoryPill:
		'inline-flex w-fit items-center rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold',
	resource_categoryDivider: 'hidden h-3 w-px shrink-0 bg-line/80 sm:block',
	resource_bandPy: 'section-y',
	resource_bandPyCompact: 'section-y-sm',
	resource_bandPyMatch: 'section-pad-match',
	resource_heroInset: 'pb-9 md:pb-10',
	resource_heroInsetCompact: 'pb-6 md:pb-8',
	resource_heroBannerTop: 'pt-4 md:pt-5',
	resource_heroCopyShell: 'container-x relative z-10 max-w-3xl border-b border-dashed border-line',
	resource_heroCopyShellPhoto: 'container-x relative z-10 max-w-3xl',
	resource_heroCopyShellWide:
		'container-x relative z-10 max-w-4xl border-b border-dashed border-line',
	resource_crumbPy: 'pt-3 pb-2 md:pt-4',
	resource_heroDetailCrumbDivider: 'border-b border-dashed border-white/[0.06] max-md:border-b-0',
	resource_heroDetailCrumbDividerGapDefault: 'pb-0 mb-3 md:pb-3.5 md:mb-4',
	resource_heroDetailCrumbDividerGapCompact: 'pb-0 mb-3 md:pb-4 md:mb-5',
	resource_heroCopyTopDefault: 'pt-6 md:pt-7',
	resource_heroCopyBodyTopDefault: 'pt-3 md:pt-7',
	resource_heroCopyBodyTopCompact: 'pt-3 md:pt-4',
	resource_heroHubCrumbWrap:
		'border-b border-dashed border-white/[0.06] pb-0 md:pb-4 max-md:border-b-0',
	resource_cardPad: 'card-pad',
	trail_crumbPy: 'pt-4 pb-2 md:pt-5 md:pb-3',
	trail_list: 'flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-subtle',
	trail_item: 'inline-flex items-center gap-2',
	trail_separator: 'text-line',
	trail_current: 'font-medium text-muted',
	trail_link: 'inline-flex min-h-11 items-center px-2 -mx-2 transition-colors hover:text-gold-soft',
	tools_sectionLabel: 'section-label',
	tools_sectionLabelGold: 'section-label !text-gold',
	mastheadRoot:
		'shell sticky top-0 z-40 w-full overflow-visible border-b border-line motion-ui transition-colors',
	mastheadRootMegaOpen: 'z-[60]',
	mastheadPlaceholder:
		'shell h-(--header-h) shrink-0 border-b border-line bg-base/85 backdrop-blur-xl',
	mastheadInner: 'header-inner relative',
	mastheadRow: 'flex h-(--header-h) w-full flex-nowrap items-center gap-2.5 md:gap-3.5',
	mastheadBrand: 'header-brand',
	mastheadBrandTool: 'header-brand--tool',
	mastheadActions: 'header-actions ml-auto flex shrink-0 items-center gap-2',
	mastheadPhone: 'header-phone hidden h-11 min-h-[44px] lg:inline-flex',
	mastheadCompactRoot:
		'shell sticky top-0 z-40 w-full border-b border-line bg-base/80 backdrop-blur-md',
	mastheadCompactRow: 'header-inner flex h-(--header-h) items-center justify-between',
	mastheadCompactPhone:
		'flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-cta',
	navPill:
		'header-nav-pill motion-ui inline-flex min-h-[44px] items-center rounded-full px-4 py-2.5 text-[13.5px] font-medium hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
	navPillGap: 'gap-1.5',
	navPillOpen: 'text-fg',
	navPillClosed: 'text-muted',
	navChevron: 'motion-ui transition-transform',
	navChevronOpen: 'rotate-180 text-gold',
	navPrimary: 'hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex',
	navLinkCluster: 'flex items-center gap-0.5',
	navToolBack:
		'tool-back-inline header-control mr-1 h-11 w-11 shrink-0 rounded-full border border-line text-muted transition hover:border-gold/40 hover:text-fg',
	navMenuToggle:
		'header-menu-toggle header-control w-10 rounded-lg border border-line text-muted transition hover:text-fg lg:hidden',
	flyoutRoot: 'tools-megamenu',
	flyoutPanel:
		'tools-megamenu-panel overflow-hidden rounded-2xl border border-line bg-base/95 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl',
	flyoutToolsGrid: 'grid grid-cols-3 divide-x divide-line',
	flyoutFooterBar:
		'flex items-center justify-between gap-4 border-t border-line bg-ink/40 px-6 py-2',
	flyoutFooterNote: 'text-[12px] text-subtle',
	flyoutFooterCta:
		'motion-ui inline-flex min-h-11 items-center gap-1.5 text-[12.5px] font-semibold text-cta transition-[gap,color] hover:gap-2.5 hover:text-gold-soft',
	scrimRoot: 'fixed inset-0 top-(--header-outer-h) z-30 bg-black/55 backdrop-blur-[2px] lg:hidden',
	mobileRoot:
		'collapsible-rows relative z-50 grid overflow-hidden border-line bg-base/95 backdrop-blur-xl transition-[grid-template-rows] motion-ui lg:hidden',
	mobileRootOpen: 'border-t',
	mobileSectionLabel:
		'px-3 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-subtle first:pt-1',
	mobileItemTools:
		'header-mobile-nav-item flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition hover:bg-surface',
	mobileItemLink:
		'header-mobile-nav-item flex min-h-11 items-center rounded-xl px-3 py-3 text-[15px] font-medium transition hover:bg-surface',
	mobileItemActive: 'bg-surface text-gold-soft',
	mobileItemIdle: 'text-fg',
	mobileToolIconWrap:
		'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink',
	mobileIconGold: 'text-gold',
	mobileFooter:
		'header-mobile-menu-dock container-x mt-0 flex flex-col gap-2 border-t border-line pb-4 pt-4',
	mobilePhoneBtn:
		'flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-medium transition hover:border-gold/50 hover:bg-surface hover:text-gold-soft',
	mobilePhoneIconGold: 'text-gold',
	mobileCaseReviewCta: 'btn btn-primary btn-md',
	catalogGrid:
		'grid md:grid-cols-2 lg:grid-cols-3 [&>*]:border-line max-md:[&>*:not(:last-child)]:border-b md:max-lg:[&>*:nth-child(-n+4)]:border-b md:max-lg:[&>*:not(:nth-child(2n))]:border-r lg:[&>*:nth-child(-n+3)]:border-b lg:[&>*:not(:nth-child(3n))]:border-r',
	catalogCard:
		'flex h-full min-h-[10.5rem] flex-col p-6 motion-ui transition-colors hover:bg-surface/60',
	catalogIconWrap:
		'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink transition group-hover/card:border-gold/50 group-hover/card:bg-gold/5',
	catalogTitle: 'text-[15px] font-semibold leading-snug text-fg',
	catalogDescription: 'mt-1.5 text-[12.5px] leading-relaxed text-muted',
	catalogCta:
		'mt-3 motion-ui inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cta transition-[gap] group-hover/card:gap-2.5',
	megaCard:
		'relative flex h-full min-h-[10.5rem] flex-col gap-4 p-5 motion-ui transition-colors hover:bg-surface/70 md:p-6',
	megaCardAccent:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 transition group-hover/card:opacity-100',
	megaIconWrap:
		'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-ink transition group-hover/card:border-gold/50 group-hover/card:bg-gold/8 group-hover/card:shadow-[0_0_20px_-8px_rgba(188,143,13,0.45)]',
	megaTitle: 'text-[14.5px] font-semibold leading-tight tracking-tight text-fg',
	megaMinutes: 'text-[11px] text-subtle',
	megaPreviewWrap: 'mega-preview-wrap',
	megaBlurb: 'text-[12.5px] leading-relaxed text-muted',
	megaCardCta:
		'mt-auto motion-ui inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cta transition-[gap,color] group-hover/card:gap-2.5 group-hover/card:text-gold-soft',
	motionCardShell: 'group/card min-h-0 h-full',
	motionCardInner: 'h-full',
	motionLink: 'block h-full min-h-0',
	previewFrame:
		'flex h-[86px] flex-col justify-center rounded-xl border border-line bg-ink/60 p-3.5',
	previewFrameGap: 'gap-2',
	previewRailLabel: 'text-[9.5px] font-medium uppercase tracking-wide text-subtle',
	previewChip: 'rounded-full border border-line bg-surface px-2 py-0.5 text-[9.5px] text-muted',
	previewChipRow: 'mt-2.5 flex flex-wrap gap-1.5',
	previewProgressTrack: 'mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2',
	previewProgressBar: 'mega-preview-bar h-full w-[82%] rounded-full bg-recovery',
	previewRecoveryAmount: 'tabular mt-1 text-[22px] font-bold leading-none text-recovery',
	previewSegmentStack:
		'mega-preview-stack mt-2.5 flex h-2 overflow-hidden rounded-full bg-surface-2',
	previewCheckRow: 'mega-preview-row flex items-center gap-2',
	previewCheckBoxDone: 'border-recovery bg-recovery text-ink',
	previewCheckBoxIdle: 'border-line bg-surface',
	previewCheckLabel: 'text-[11px] text-muted',
	logoTextColumn: 'min-w-0 flex-col gap-0 border-l border-line pl-2 leading-none',
	logoTextStack: 'flex min-w-0 flex-col gap-0',
	logoRoot: 'flex min-w-0 items-center gap-2 overflow-hidden',
	logoRootLinked: 'group',
	logoInner: 'flex min-h-11 min-w-0 items-center gap-2',
	logoButtonInner: 'text-left cursor-pointer',
	routeRoot: 'route-transition',
	routeLayer: 'route-transition__layer',
	resourceUiAnswerK001:
		'flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1.5',
	resourceUiAnswerK002:
		'display mt-2.5 max-w-none text-balance text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1] sm:mt-3',
	resourceUiAnswerK003: 'mt-3 max-w-prose border-l-2 border-gold/40 pl-3.5 sm:pl-4 md:mt-4 md:pl-5',
	resourceUiAnswerK004: 'text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90',
	resourceUiAnswerK005:
		'mt-2 text-[14.5px] leading-relaxed text-muted sm:text-[15px] md:text-[15.5px]',
	resourceUiAnswerK006: 'mt-5 grid gap-7 sm:grid-cols-2 sm:gap-8',
	resourceUiAnswerK007: 'opacity-70 transition group-hover:opacity-100',
	resourceUiAnswerK008: 'max-lg:border-t max-lg:border-line/25 max-lg:pt-14 max-lg:md:pt-18',
	resourceUiAnswerK009:
		'mt-5 inline-flex min-h-11 w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-cta transition hover:text-gold-soft',
	resourceUiAnswerK010: 'space-y-7 sm:space-y-8',
	resourceUiSharedK001: 'min-w-0 flex-1',
	resourceUiSharedK002: 'text-[14px] leading-relaxed text-muted',
	resourceUiSharedK003: 'inline-flex items-center gap-1.5',
	resourceUiSharedK004: 'icon-well icon-well-gold shrink-0',
	resourceUiSharedK005: 'sr-only',
	resourceUiSharedK006: 'min-w-0',
	resourceUiSharedK007: 'text-[11px] font-semibold uppercase tracking-[0.16em] text-gold',
	resourceUiSharedK008:
		'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10',
	resourceUiSharedK009: 'text-[15px] font-semibold tracking-tight text-fg',
	resourceUiSharedK010: 'mt-1.5 text-[14.5px] leading-relaxed text-muted',
	resourceUiSharedK011:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent',
	resourceUiSharedK012: 'flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-3.5',
	resourceUiSharedK013: 'mt-3 max-w-prose text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	resourceUiSharedK014: 'mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2',
	resourceUiSharedK015:
		'inline-flex items-center rounded-full border border-gold/35 bg-gold/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold',
	resourceUiSharedK016: 'hidden text-faint sm:inline',
	resourceUiSharedK017: 'inline-flex items-center gap-1.5 text-[12.5px] text-subtle',
	resourceUiSharedK018: 'shrink-0 text-gold/75',
	resourceUiSharedK019: 'space-y-10 sm:space-y-12 md:space-y-14',
	resourceUiSharedK020: 'block min-w-0',
	resourceUiSharedK021: 'text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/75',
	resourceUiSharedK022:
		'mt-1 block font-display text-[1.05rem] font-bold leading-snug text-fg transition group-hover:text-gold-soft md:text-[1.125rem]',
	resourceUiSharedK023:
		'flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle',
	resourceUiSharedK024: 'h-full min-w-0',
	resourceUiSharedK025:
		'display mt-2 text-[clamp(1.65rem,3.2vw,2.35rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-fg',
	resourceUiSharedK026:
		'group relative flex aspect-square items-center justify-center bg-surface px-2 py-3 transition-colors hover:bg-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-base sm:px-1.5 sm:py-2 lg:px-2.5 lg:py-3',
	resourceUiSharedK027:
		'relative h-9 w-full max-w-[5.75rem] sm:h-24 sm:max-w-[11rem] lg:h-10 lg:max-w-[6rem]',
	resourceUiSharedK028: 'hidden lg:block',
	resourceUiSharedK029: 'scroll-mt-[calc(var(--header-h,62px)+1.5rem)]',
	resourceUiSharedK030:
		'btn btn-primary btn-md relative z-[1] min-h-[44px] w-full justify-center sm:w-auto sm:min-w-[11rem]',
	resourceUiSharedK031: 'h-full',
	resourceUiSharedK032:
		'card card-static card-pad flex flex-col gap-5 border-gold/20 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:text-left',
	resourceUiSharedK033: 'min-w-0 max-w-xl',
	resourceUiSharedK034: 'display mt-3 text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.12]',
	resourceUiSharedK035: 'mt-3 text-[15px] leading-relaxed text-muted',
	resourceUiSharedK036: 'btn btn-secondary btn-md shrink-0 justify-center self-center',
	resourceUiSharedK037: 'mt-5 flex justify-center sm:justify-start',
	resourceUiSharedK038: 'relative isolate overflow-hidden',
	resourceUiSharedK039: 'text-[11px] font-semibold uppercase tracking-[0.18em] text-gold',
	resourceUiSharedK040: 'transition group-hover:translate-x-0.5',
	resourceUiArticleK001: 'mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5',
	resourceUiArticleK002: 'relative shrink-0',
	resourceUiArticleK003:
		'absolute -inset-1 rounded-full bg-gradient-to-br from-gold/35 via-gold/10 to-transparent blur-[2px]',
	resourceUiArticleK004: 'relative ring-2 ring-gold/30 ring-offset-2 ring-offset-base',
	resourceUiArticleK005: 'flex flex-wrap items-center gap-2.5',
	resourceUiArticleK006: 'display mt-2 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1]',
	resourceUiArticleK007:
		'mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-subtle md:text-[14.5px]',
	resourceUiArticleK008: 'mt-3 max-w-xl text-[11.5px] leading-relaxed text-faint',
	resourceUiArticleK009: 'mt-3 border-t border-line pt-3',
	resourceUiBlocksK001: 'flex items-center gap-3 sm:gap-4',
	resourceUiBlocksK002: 'icon-well icon-well-gold h-10 w-10 shrink-0',
	resourceUiBlocksK003:
		'h-px min-w-[1.5rem] flex-1 bg-gradient-to-r from-gold via-gold/55 to-transparent',
	resourceUiBlocksK004:
		'font-display text-[1.65rem] font-extrabold leading-none tabular tracking-tight text-gold/85 sm:text-[1.85rem] md:text-[2rem]',
	resourceUiBlocksK005:
		'card card-static relative mt-4 overflow-hidden border-gold/25 bg-gradient-to-br from-ink/70 via-ink/50 to-surface/40 p-5 md:p-6',
	resourceUiBlocksK006: 'mt-3 text-[16.5px] font-medium leading-relaxed text-fg md:text-[17.5px]',
	resourceUiBlocksK007: 'mt-3.5 text-[12.5px] font-medium tracking-wide text-subtle',
	resourceUiBlocksK008: 'flex flex-wrap gap-2',
	resourceUiBlocksK009:
		'inline-flex items-center gap-2 rounded-full border border-line bg-surface/55 px-3 py-1.5 text-[12px] font-medium text-muted shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]',
	resourceUiBlocksK010:
		'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10',
	resourceUiBlocksK011:
		'inline-flex w-fit max-w-full self-start items-center rounded-full border border-recovery/35 bg-recovery/10 px-3.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-recovery-soft',
	resourceUiBlocksK012:
		'card card-static relative mt-7 overflow-hidden border-gold/25 bg-gradient-to-br from-ink/80 via-ink/55 to-surface/25 p-5 md:p-6',
	resourceUiBlocksK013:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent',
	resourceUiBlocksK014: 'display mt-1.5 text-[clamp(1.55rem,3vw,2.1rem)] leading-none text-fg',
	resourceUiBlocksK015: 'mt-2.5 max-w-prose text-[12.5px] leading-relaxed text-faint',
	resourceUiBlocksK016: 'relative aspect-[21/9] w-full overflow-hidden border-y border-line',
	resourceUiBlocksK017: 'object-cover object-center brightness-[1.04] contrast-[1.02]',
	resourceUiBlocksK018: 'absolute inset-0 bg-gradient-to-t from-base/85 via-base/20 to-base/35',
	resourceUiBlocksK019:
		'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent',
	resourceUiBlocksK020:
		'card-inset flex items-center gap-3 p-3.5 text-[14px] leading-relaxed text-muted transition-colors hover:border-gold/20',
	resourceUiBlocksK021: 'text-[10.5px] font-semibold uppercase tracking-[0.16em] text-subtle',
	resourceUiBlocksK022:
		'absolute left-[17px] top-9 bottom-0 w-px bg-gradient-to-b from-gold/45 via-line to-line',
	resourceUiBlocksK023:
		'pointer-events-none absolute -right-3 top-[2.125rem] hidden h-px w-6 bg-gradient-to-r from-gold/40 to-transparent lg:block',
	resourceUiBlocksK024:
		'group card card-static relative flex h-full flex-col overflow-hidden p-0 transition duration-300 hover:border-gold/40 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_22px_48px_-28px_rgba(0,0,0,0.75)]',
	resourceUiBlocksK025: 'flex flex-1 flex-col p-5 md:p-6',
	resourceUiBlocksK026: 'mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-muted',
	resourceUiBlocksK027: 'mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cta',
	resourceUiBlocksK028: 'transition duration-300 group-hover:translate-x-0.5',
	resourceUiBlocksK029: 'relative aspect-[16/9] w-full overflow-hidden border-b border-line',
	resourceUiBlocksK030:
		'object-cover object-center brightness-[1.04] transition duration-500 group-hover:scale-[1.04]',
	resourceUiBlocksK031: 'absolute inset-0 bg-gradient-to-t from-base/70 via-base/15 to-transparent',
	resourceUiBlocksK032: 'transition duration-200 group-hover:translate-x-0.5',
	resourceUiBlocksK033: 'flex items-start gap-3',
	resourceUiBlocksK034:
		'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.85rem] border border-gold/30 bg-gradient-to-br from-gold/15 via-ink/90 to-ink text-gold shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_8px_20px_-12px_rgba(0,0,0,0.55)]',
	resourceUiBlocksK035: 'font-display text-[1.05rem] font-bold text-fg',
	resourceUiBlocksK036:
		'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-10',
	resourceUiBlocksK037: 'min-w-0',
	resourceUiBlocksK038: 'max-w-prose text-[15.5px] leading-[1.75] text-muted md:text-[16px]',
	resourceUiBlocksK039: 'min-w-0',
	resourceUiBlocksK040:
		'relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] border border-line lg:mx-0 lg:max-w-none',
	resourceUiBlocksK041: 'object-cover object-top brightness-[1.03]',
	resourceUiBlocksK042: 'absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-base/15',
	resourceUiBlocksK043:
		'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent',
	resourceUiBlocksK044: 'mt-7 grid min-w-0 gap-4 md:grid-cols-3',
	resourceUiBlocksK045:
		'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent',
	resourceUiBlocksK046: 'mt-5 space-y-2.5',
	resourceUiBlocksK047: 'flex items-center gap-3 text-[14.5px] leading-relaxed text-muted',
	resourceUiBlocksK048:
		'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-recovery/30 bg-recovery/10',
	resourceUiBlocksK049:
		'card card-static relative overflow-hidden border-gold/20 bg-gradient-to-b from-ink/70 to-ink/45 p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_48px_-24px_rgba(0,0,0,0.55)] md:p-7',
	resourceUiBlocksK050:
		'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:items-start lg:gap-10 xl:gap-12',
	resourceUiBlocksK051: 'space-y-0 divide-y divide-line/70',
	resourceUiBlocksK052: 'py-3 first:pt-0 last:pb-0',
	resourceUiBlocksK053: 'text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle',
	resourceUiBlocksK054: 'mt-1 text-[15px] font-medium text-fg',
	resourceUiBlocksK055: 'max-w-none scroll-mt-[calc(var(--header-h,62px)+1rem)]',
	resourceUiBlocksK056: 'card card-static border-gold/25',
	resourceUiBlocksK057: 'flex flex-col gap-6',
	resourceUiBlocksK058: 'grid gap-3 sm:grid-cols-3 sm:gap-4',
	resourceUiBlocksK059:
		'rounded-xl border bg-surface/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-[1.125rem]',
	resourceUiBlocksK060:
		'mt-1.5 font-display text-[1.15rem] font-bold leading-snug text-fg md:text-[1.2rem]',
	resourceUiBlocksK061:
		'relative z-[1] flex shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink font-bold tabular text-gold shadow-[0_0_0_4px_rgba(188,143,13,0.08)]',
	resourceUiBlocksK062:
		'font-display text-[1.05rem] font-bold leading-snug text-fg transition-colors group-hover:text-gold-soft md:text-[1.1rem]',
	resourceUiBlocksK063: 'overflow-hidden bg-transparent',
	resourceUiBlocksK064: 'grid gap-3 sm:gap-4',
	resourceUiBlocksK065:
		'card card-static relative mt-7 overflow-hidden border-gold/25 bg-gradient-to-br from-ink/60 via-ink/45 to-surface/30 p-5 md:p-6',
	resourceUiBlocksK066:
		'card card-static relative overflow-hidden border-gold/20 bg-gradient-to-br from-ink/60 via-ink/45 to-surface/25 p-5 md:p-6',
	resourceUiChapterK001:
		'display max-w-none text-balance text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1] sm:max-w-[28ch]',
	resourceUiChapterK002: 'scroll-mt-[calc(var(--header-h,62px)+1rem)]',
	resourceUiChapterK003: 'hidden lg:block lg:pt-1',
	resourceUiChapterK004:
		'flex min-h-[44px] items-center gap-2.5 py-2.5 text-[13px] leading-snug text-muted transition hover:text-gold-soft',
	resourceUiChapterK005: 'tabular shrink-0 font-semibold text-gold/85',
	resourceUiChapterK006: 'text-gold/75 transition group-hover:-translate-x-0.5',
	resourceUiChapterK007: 'hidden md:block',
	resourceUiChapterK008: 'text-gold/75 transition group-hover:translate-x-0.5',
	resourceUiChapterK009: 'grid items-start md:grid-cols-2',
	resourceUiDirectoryK001: 'grid grid-gap grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
	resourceUiDirectoryK002:
		'group hub-mfr-card relative overflow-hidden card card-static card-pad flex h-full min-h-[11rem] min-w-0 w-full flex-col items-start gap-3.5 text-left transition-colors hover:border-gold/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-base',
	resourceUiDirectoryK003: 'line-clamp-3 text-[14px] leading-relaxed text-muted',
	resourceUiDirectoryK004:
		'mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] font-semibold text-cta transition group-hover:text-gold-soft',
	resourceUiFaqlinksK001: 'min-w-0 flex-1 pt-0.5',
	resourceUiFaqlinksK002:
		'mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-subtle md:mt-1.5 md:text-[12px]',
	resourceUiFaqlinksK003:
		'flex shrink-0 items-center justify-center rounded-lg border border-line/35 bg-ink/30 font-semibold tabular-nums tracking-wide text-subtle transition duration-200 group-hover:border-gold/30 group-hover:bg-gold/[0.08] group-hover:text-gold-soft',
	resourceUiFaqlinksK004:
		'flex h-full flex-col overflow-hidden border border-line/25 bg-surface/[0.06]',
	resourceUiFaqlinksK005: 'flex items-start border-b border-line/20',
	resourceUiFaqlinksK006: 'font-display font-semibold leading-snug tracking-tight text-fg',
	resourceUiFaqlinksK007: 'h-full min-h-0',
	resourceUiFirmK001: 'grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-12',
	resourceUiFirmK002: 'order-2 min-w-0 lg:order-1 lg:col-span-4',
	resourceUiFirmK003: 'order-1 min-w-0 lg:order-2 lg:col-span-8',
	resourceUiFirmK004:
		'display mt-2 max-w-2xl text-[clamp(1.65rem,3.2vw,2.35rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-fg lg:max-w-none',
	resourceUiFirmK005:
		'mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted md:text-[15.5px] lg:max-w-none',
	resourceUiFirmK006:
		'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:items-stretch',
	resourceUiFirmK007:
		'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-b from-gold/18 to-gold/5',
	resourceUiFirmK008: 'text-[15.5px] font-semibold tracking-tight text-fg sm:text-[16px]',
	resourceUiFirmK009: 'mt-1.5 text-[13.5px] leading-relaxed text-muted sm:mt-2 sm:text-[14px]',
	resourceUiFirmK010: 'grid items-center gap-8 md:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12',
	resourceUiFirmK011: 'relative mx-auto w-full max-w-sm',
	resourceUiFirmK012: 'glow absolute -inset-6 -z-10 bg-gold/12',
	resourceUiFirmK013:
		'card overflow-hidden border-gold/20 shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]',
	resourceUiFirmK014: 'relative aspect-[4/5]',
	resourceUiFirmK015: 'object-cover object-top',
	resourceUiFirmK016: 'absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent',
	resourceUiFirmK017: 'absolute inset-x-0 bottom-0 p-5 pt-16',
	resourceUiFirmK018:
		'font-display text-[19px] font-extrabold leading-tight tracking-tight text-white',
	resourceUiFirmK019: 'mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-soft',
	resourceUiFirmK020: 'mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5',
	resourceUiFirmK021: 'card-inset border-line p-3 transition hover:border-gold/25',
	resourceUiFirmK022: 'display text-[18px] tracking-tight text-fg md:text-[19px]',
	resourceUiFirmK023: 'mt-1 text-[11px] leading-snug text-subtle',
	resourceUiFirmK024: 'mt-8 flex flex-wrap gap-2',
	resourceUiFirmK025: 'grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12',
	resourceUiFirmK026: 'mt-4 max-w-xl text-[15px] leading-relaxed text-muted',
	resourceUiFirmK027: 'grid gap-2 sm:grid-cols-2',
	resourceUiFirmK028: 'card-inset flex items-start gap-3 border-line p-4',
	resourceUiFirmK029: 'mt-0.5 shrink-0 text-gold',
	resourceUiFirmK030: 'text-[14px] font-medium text-fg',
	resourceUiFirmK031:
		'card card-static card-pad flex h-full min-h-[9.5rem] gap-3.5 transition hover:border-gold/25 sm:min-h-0 sm:flex-col sm:gap-4',
	resourceUiFirmK032: 'max-w-xl text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	resourceUiFramingK001: 'relative flex min-h-screen flex-col bg-base mobile-dock-pad lg:pb-0',
	resourceUiFramingK002: 'relative z-[1] flex flex-1 flex-col',
	resourceUiGridK001:
		'overflow-hidden rounded-2xl border border-line ring-1 ring-inset ring-gold/10 bg-line shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
	resourceUiGridK002: 'grid grid-cols-3 gap-px',
	resourceUiGridK003:
		'pointer-events-none absolute bottom-1.5 left-1/2 z-20 max-w-[calc(100%-0.5rem)] -translate-x-1/2',
	resourceUiNarrativeK001: 'mt-6 space-y-2.5 sm:mt-7',
	resourceUiNarrativeK002:
		'mt-5 inline-flex min-h-11 items-center text-[13px] font-semibold text-cta transition hover:text-gold-soft',
	resourceUiNarrativeK003:
		'display max-w-none text-balance text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1] sm:max-w-[26ch]',
	resourceUiNarrativeK004: 'mt-4 max-w-prose text-[11.5px] leading-relaxed text-faint',
	resourceUiNarrativeK005:
		'scroll-mt-[calc(var(--header-h,62px)+1.5rem)] border-t border-dashed border-line/25 pt-10 sm:pt-12 md:pt-14',
	resourceUiNarrativeK006: 'mt-4 text-[11.5px] leading-relaxed text-faint',
	resourceUiNarrativeK007:
		'mt-14 space-y-12 border-t border-dashed border-line/20 pt-12 sm:mt-16 sm:space-y-14 sm:pt-14',
	resourceUiNarrativeK008:
		'card-inset flex items-center gap-3 p-4 transition-colors hover:border-gold/20',
	resourceUiPairedK001:
		'inline-flex min-h-11 items-center text-[14px] font-semibold text-gold-soft underline-offset-4 transition hover:text-gold hover:underline',
	resourceUiProfileK001: 'max-w-2xl pb-1',
	resourceUiProfileK002: 'mb-4 flex h-10 w-full max-w-md items-center',
	resourceUiProfileK003: 'h-9 w-full max-w-[11rem] text-fg/90 sm:h-10 sm:max-w-[18rem]',
	resourceUiProfileK004: 'mb-3 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold',
	resourceUiProfileK005: 'display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-[1.1]',
	resourceUiProfileK006: 'mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	resourceUiProfileK007: 'mt-7 flex flex-wrap gap-2.5 md:mt-8',
	resourceUiProfileK008:
		'inline-flex min-h-[44px] max-w-full items-center whitespace-nowrap rounded-full border border-line/80 bg-surface/40 px-3.5 py-2 text-[13px] font-medium leading-snug text-fg/90 transition hover:border-gold/30 hover:bg-surface/55',
	resourceUiProfileK009: 'mt-8 grid gap-3.5 md:mt-9 md:grid-cols-3 md:gap-4',
	resourceUiProfileK010: 'group relative card card-static h-full overflow-hidden card-pad',
	resourceUiProfileK011:
		'pointer-events-none absolute -right-1 -top-2 select-none font-display text-[72px] font-extrabold leading-none text-white/[0.035] transition group-hover:text-gold/[0.06]',
	resourceUiProfileK012: 'relative flex items-center gap-3',
	resourceUiProfileK013:
		'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ink text-[12.5px] font-bold tabular text-gold',
	resourceUiProfileK014: 'hidden h-px flex-1 bg-gradient-to-r from-line to-transparent md:block',
	resourceUiProfileK015:
		'relative mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold',
	resourceUiProfileK016: 'relative mt-2 text-[14.5px] leading-relaxed text-muted',
	resourceUiProfileK017:
		'grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch',
	resourceUiProfileK018: 'flex h-full flex-col justify-center',
	resourceUiProfileK019: 'min-w-0 max-w-sm text-left',
	resourceUiProfileK020:
		'btn btn-primary btn-md min-h-[44px] w-full shrink-0 justify-center sm:w-auto sm:min-w-[11rem]',
	resourceUiProfileK021:
		'card card-static relative h-full overflow-hidden border-gold/20 bg-gradient-to-br from-ink/90 via-ink/70 to-ink/45 p-5 shadow-[0_20px_56px_rgba(0,0,0,0.4)] md:p-7',
	resourceUiProfileK022: 'mt-4 space-y-3',
	resourceUiQuestionsK001: 'grid w-full gap-4 sm:grid-cols-2 md:gap-5',
	resourceUiRatingsK001:
		'mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] leading-relaxed text-faint md:mb-7',
	resourceUiRatingsK002: 'inline-flex flex-wrap items-center gap-x-1.5 gap-y-1 text-subtle',
	resourceUiRatingsK003: 'font-semibold text-fg',
	resourceUiSpotlightK001:
		'-z-20 object-cover object-[72%_center] sm:object-[78%_center] md:object-right',
	resourceUiSpotlightK002: 'pointer-events-none absolute inset-0 -z-[19] md:hidden',
	resourceUiSpotlightK003: 'pointer-events-none absolute inset-0 -z-[19] hidden md:block',
	resourceUiSpotlightK004:
		'pointer-events-none absolute inset-0 -z-[18] bg-gradient-to-t from-base/82 via-base/48 to-base/50',
	resourceUiSpotlightK005:
		'pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-base via-base/96 to-base',
	resourceUiSpotlightK006:
		'pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_15%_0%,color-mix(in_srgb,var(--color-gold)_9%,transparent),transparent_65%)]',
	resourceUiSpotlightK007: 'eyebrow mt-1',
	resourceUiSpotlightK008: 'mt-3 md:mt-3.5',
	resourceUiSpotlightK009: 'glow -left-28 top-0 h-80 w-80 md:-left-32 md:h-[22rem] md:w-[22rem]',
	resourceUiSpotlightK010: 'glow -right-24 bottom-[-3rem] h-64 w-64 md:-right-28 md:h-72 md:w-72',
	resourceUiStripK001:
		'grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-end lg:gap-8 xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]',
	resourceUiStripK002: 'min-w-0 max-w-sm',
	resourceUiStripK003:
		'display mt-2 text-balance text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.15]',
	resourceUiStripK004: 'mt-2 text-[14px] leading-snug text-muted md:text-[14.5px]',
	resourceUiStripK005: 'min-w-0 overflow-hidden rounded-2xl border border-line',
	resourceUiStripK006:
		'grid auto-rows-fr grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0',
	resourceUiStripK007: 'min-w-0 bg-surface',
	resourceUiStripK008:
		'group flex h-full min-h-[44px] w-full items-start gap-3 p-4 transition-colors hover:bg-ink/25 sm:gap-3.5 sm:p-5',
	resourceUiStripK009: 'icon-well icon-well-gold h-9 w-9 shrink-0',
	resourceUiStripK010: 'flex min-w-0 flex-1 flex-col gap-1.5',
	resourceUiStripK011:
		'text-[14.5px] font-semibold leading-snug tracking-tight text-fg transition-colors group-hover:text-gold-soft sm:text-[15px]',
	resourceUiStripK012: 'line-clamp-2 text-[13px] leading-snug text-muted sm:text-[13.5px]',
	resourceUiStripK013:
		'inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cta sm:text-[13px]',
	resourceUiStripK014: 'shrink-0 transition group-hover:translate-x-0.5',
	resourceUiStudiesK001:
		'display mt-2.5 text-balance text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.12]',
	resourceUiStudiesK002: 'mt-3 text-[12.5px] leading-relaxed text-faint md:text-[13px]',
	resourceUiTileK001:
		'group card card-static relative flex h-full flex-col overflow-hidden p-0 transition-colors hover:border-gold/35',
	resourceUiTileK002: 'absolute inset-0 z-0 rounded-[inherit]',
	resourceUiTileK003: 'object-cover object-center',
	resourceUiTileK004: 'card-pad relative z-[1] flex min-h-0 flex-1 flex-col pointer-events-none',
	resourceUiTileK005: 'mt-3 flex-1 text-[14px] leading-[1.65] text-fg/90 line-clamp-4',
	resourceUiTileK006: 'mt-6 flex flex-wrap items-center gap-3',
	resourceUiTileK007: 'ring-2 ring-base',
	resourceUiTileK008: 'text-[15px] font-semibold leading-tight text-fg',
	resourceUiTileK009: 'text-[12px] text-subtle',
	resourceUiTileK010: 'mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-faint',
	resourceUiTileK011:
		"pointer-events-auto relative z-[2] inline-flex items-center font-medium text-subtle transition hover:text-gold-soft after:absolute after:inset-[-12px] after:content-['']",
	resourceUiTileK012:
		'mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-cta',
	resourceUiTileK013: 'flex h-full min-h-0 w-full',
	resourceUiTileK014:
		'group card card-static relative flex h-full w-full min-h-[17.5rem] flex-col justify-between card-pad text-left transition-colors hover:border-gold/35',
	resourceUiTileK015:
		'flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
	resourceUiTileK016:
		'mt-3 font-display text-[1.05rem] font-bold leading-snug tracking-tight text-fg transition-colors group-hover:text-gold-soft md:text-[1.125rem]',
	resourceUiTileK017: 'mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-muted',
	resourceUiTileK018: 'relative z-[2] mt-5 flex min-h-8 items-end justify-between gap-4',
	resourceUiTileK019:
		'inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-cta',
	resourceUiTileK020: 'pointer-events-none flex h-8 w-[7.5rem] shrink-0 items-center justify-end',
	resourceUiTileK021: 'h-8 w-[7.5rem] shrink-0',
	resourceUiTocK001: 'sticky top-[calc(var(--header-outer-h)/1.1)] z-30 bg-base lg:hidden',
	resourceUiTocK002: 'relative',
	resourceUiTocK003: 'hidden',
	resourceUiTocK004: 'hidden',
	resourceUiTocK005:
		'relative flex items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
	resourceUiTocK006: 'card card-static hidden border-line/30 bg-ink/35 p-5 lg:block',
	resourceUiTocK007: 'mt-3 space-y-1.5',
	resourceUiTocK008:
		'flex min-h-[44px] items-center rounded-md py-1.5 text-[13px] text-muted transition hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35',
	resourceUiTocK009:
		'inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full border px-2.5 py-0 text-[12px] font-medium leading-none transition',
	resourceUiVolumeK001:
		'display mt-2.5 max-w-[28ch] text-pretty text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.12] sm:max-w-none',
	resourceUiVolumeK002: 'mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted md:text-[15px]',
	resourceUiVolumeK003: 'mt-8 md:mt-10',
	resourceUiVolumeK004: 'card card-static list-none divide-y divide-line overflow-hidden p-0',
	resourceUiVolumeK005:
		'group flex gap-4 card-pad text-left transition-colors hover:bg-ink/25 sm:gap-5',
	resourceUiVolumeK006: 'icon-well icon-well-gold h-11 w-11 shrink-0 sm:h-12 sm:w-12',
	resourceUiVolumeK007: 'flex flex-wrap items-baseline gap-x-2 gap-y-0.5',
	resourceUiVolumeK008: 'hidden text-line sm:inline',
	resourceUiVolumeK009: 'inline-flex items-center gap-1 text-[12px] text-subtle',
	resourceUiVolumeK010:
		'mt-1.5 font-display text-[1.05rem] font-bold leading-snug tracking-tight text-fg transition-colors group-hover:text-gold-soft sm:text-[1.125rem]',
	resourceUiVolumeK011: 'mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-muted',
	resourceUiVolumeK012: 'mt-2.5 text-[12.5px] leading-relaxed text-gold/70',
	resourceUiVolumeK013:
		'flex shrink-0 flex-col items-end justify-center gap-1 self-center text-cta',
	resourceUiVolumeK014: 'flex flex-col gap-5',
	resourceUiVolumeK015:
		'mt-5 inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-cta transition hover:gap-2 hover:text-gold-soft',
	resourceUiVolumeK016:
		'mt-4 flex min-h-11 w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-cta transition hover:text-gold-soft',
	captureAttachmentsInput: 'sr-only',
	captureAttachmentsMinW0: 'min-w-0',
	catalogCardRow: 'flex items-center gap-3.5',
	catalogCardCopy: 'min-w-0 flex-1',
	captureSuccessParagraph: 'mx-auto mt-3 max-w-[36ch] text-[14.5px] leading-relaxed text-muted',
	captureSuccessClockIcon: 'shrink-0 text-gold-soft',
	captureSuccessPhoneLink: 'font-semibold text-cta transition hover:text-gold-soft',
	captureSuccessPhoneMuted: 'text-subtle',
	captureHeadingFg: 'text-fg',
	formVehicleSection: 'mt-5 space-y-3.5',
	formVehicleSectionCompact: 'mt-3.5 space-y-2.5',
	formStarIcon: 'shrink-0 text-current opacity-50',
	formTruncate: 'truncate',
	formGridTwo: 'grid grid-cols-1 gap-3 sm:grid-cols-2',
	/** Phone + email: always stacked (email under phone). Never side-by-side. */
	formGridContact: 'flex w-full flex-col gap-3',
	formTrustIconRecovery: 'text-recovery',
	homePromptGlow: 'glow -left-20 top-0 h-56 w-56 bg-gold/15',
	megaCardHeaderRow: 'flex items-center gap-3',
	megaCardCopy: 'min-w-0',
	megaBadgeRow: 'flex items-center gap-2',
	megaBadgeGold: 'text-[10px] badge badge-gold',
	megaBadgeNeutral: 'text-[9px] badge badge-neutral',
	mobileOverflow: 'header-mobile-menu-panel',
	mobileMenuScroll: 'header-mobile-menu-scroll',
	mobileMenuInner: 'container-x flex flex-col gap-1 py-4',
	navHeaderCta: 'btn btn-primary btn-sm hidden h-11 min-h-[44px] lg:inline-flex',
	previewFrameHeader: 'flex items-center justify-between',
	previewRecoveryBadge: 'badge badge-recovery text-[10px]',
	previewCheckBox: 'flex h-4 w-4 items-center justify-center rounded border',
	trustLeadRow: 'flex min-w-0 items-center gap-2.5 sm:gap-3',
};
