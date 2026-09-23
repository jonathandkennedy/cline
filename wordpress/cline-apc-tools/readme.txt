=== CLINE APC Tools ===
Contributors: clineapc
Tags: lemon-law, embed, shortcode, elementor, lead-form
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.23
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed CLINE APC Lemon Law tools and the free case-review form via shortcodes on any page, post, or popup.

== Description ==

Soft-rollout helper for https://www.lemonlawlawyerscalifornia.com/

The plugin does **not** replace the WordPress site. It inserts iframes that load from the tools app (`https://tools.lemonlawlawyerscalifornia.com` by default). Form submits go to that app’s `/api/case-review` endpoint, which emails Brian via Resend.

= Shortcodes =

* `[cline_form source="header-popup"]` — standalone case-review opt-in
* `[cline_eligibility]` — eligibility checker
* `[cline_buyback]` — buyback calculator
* `[cline_checklist]` — documentation checklist
* `[cline_tool tool="buyback-calculator"]` — generic

Attributes: `height`, `fill` (`1` for ~92% viewport height), `title`, `source`, `start` (`1` to skip tool intro), `chrome` (`no-header`, `no-bg`, `card`), `class`, `id`.

Works in the block editor Shortcode block, Classic editor, widgets, Elementor HTML / shortcode widgets, and popup templates. The loader uses MutationObserver so late-injected popups still mount.

== Installation ==

1. Zip the `cline-apc-tools` folder and upload via Plugins → Add New → Upload Plugin.
2. Activate **CLINE APC Tools**.
3. Settings → CLINE APC Tools — confirm the tools origin.
4. Put `[cline_form source="header-popup"]` in the header “Start Your Free Case Review” popup (or any page).

== Changelog ==

= 1.0.23 =
* Card embeds honor min-height (720/760/820) as a floor and grow with content; workbench fills the slot.

= 1.0.22 =
* Tighten standalone workbench padding; stop centering questions in empty vertical space.

= 1.0.21 =
* Card embeds: same workbench start, hug content height (no 720/760/820 min-height slots).

= 1.0.20 =
* Card chrome: transparent html/body; intro is a single workbench-style card with even padding.

= 1.0.19 =
* Card intro: single pane card with balanced vertical padding (no double radius).

= 1.0.18 =
* Card chrome: intro shows one inset card; active workbench drops outer padding/double radius.

= 1.0.17 =
* Card chrome and all embeds size to content via postMessage RESIZE (no fixed viewport height).

= 1.0.16 =
* Fix card chrome squashing to a thin strip (grid centering, ignore RESIZE shrink).

= 1.0.15 =
* Card chrome embeds fill viewport height and vertically center intro screens (scoped to .cline-apc-embed only).

= 1.0.14 =
* Fix Dashboard → Updates not listing new releases (handle empty update transients, clear stale no_update entries, persist on Plugins/Updates screens).

= 1.0.13 =
* Remove aggressive Elementor layout overrides from the embed loader; iframe height follows postMessage RESIZE only.

= 1.0.12 =
* Card embeds hug RESIZE height (no Elementor height-full leftover) and keep 12px radius on all four corners.

= 1.0.11 =
* Card iframes size to the tool via postMessage RESIZE (no fixed 100dvh floor).

= 1.0.10 =
* Card embeds use a real viewport min-height (100dvh - 16rem) so mobile is not a crushed 480px slot.

= 1.0.9 =
* Card embeds fill the parent height (no clip) and load eagerly so guests/incognito see the widget.

= 1.0.8 =
* Pass the WordPress site home into tool iframes so the logo and extra links open the marketing site, not the tools host.

= 1.0.7 =
* Maintenance release (updater verification).

= 1.0.6 =
* Register updates on both write and read of the WordPress update transient (Plugins + Dashboard → Updates parity with org plugins).

= 1.0.5 =
* Update checks always fetch fresh metadata from the tools host (fixes stale cache when a new zip goes live).
* CLINE → Updates tab shows live tools-host version, errors, and a direct Check for updates now link.

= 1.0.4 =
* Standalone tool iframes fill the iframe viewport (workbench height parity with tools host).
* New `fill="1"` shortcode attribute sizes the iframe to ~92% of the visitor browser height.

= 1.0.3 =
* Visual embed builder under CLINE → Embed Builder (tool, chrome variant, copy shortcode).
* Chrome variants: full standalone, no-header, no-bg, card-only via `chrome` attribute.
* Dashboard → Updates clears the 6-hour update cache automatically.

= 1.0.2 =
* `[cline_eligibility]` opens the workbench directly (no Tap to Start card).

= 1.0.1 =
* Automatic plugin updates from the tools host (no manual zip upload).
* Sandbox WordPress host allowed in iframe CSP.

= 1.0.0 =
* Initial shortcodes for three tools + case-review form.
