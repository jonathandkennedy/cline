# CLINE APC

Marketing site and interactive tools for Cline APC — Next.js front end, JSON/map-driven CMS under `content/data/`, editorial `.mdc` under `content/collections/`, and shared UI under `src/kit/`.

## Setup

```bash
bun install
bun dev
```

Open [http://localhost:5000](http://localhost:5000).

Other scripts: `bun run build`, `bun run lint`, `bun run typecheck`, `bun format`.

## Layout

| Path                                           | Purpose                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `src/`                                         | Next.js app (`src/app/`), site code, and `@/kit/*` modules                                  |
| `content/data/settings/`                       | Nav, chrome, redirects, copy, tool configs                                                  |
| `content/data/site/`                           | Catalog, builder, and component registry maps                                               |
| `content/data/layouts/`, `content/data/pages/` | Layout trees and hub/page copy (not article bodies)                                         |
| `content/data/items/`                          | Entity indexes (blog, FAQ, reviews, …); editorial indexes are metadata-only                 |
| `content/collections/`                         | Article SSOT (`.mdc` for blog, info, locations); run `bun scripts/syncmdc.ts` after changes |
| `wordpress/cline-apc-tools`                    | WordPress admin plugin                                                                      |
| `scripts/`                                     | Redirect merge, plugin zip, MDC index sync                                                  |

Imports in app code use the `@/data/*` alias, which resolves to `content/data/*`.

Agent-oriented notes: see [AGENTS.md](./AGENTS.md).

## Config

Site chrome, nav, redirects, and legacy blog paths live under `content/data/settings/` (`frame.json`, `redirects.json`, `legacy.json`, etc.). Next.js merges WP and legacy redirects in root `next.config.ts` via `scripts/blog.ts`.
