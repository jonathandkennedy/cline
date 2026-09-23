# Agents

Use your ~/.agents

## Development

1. Run `bun install`
2. Run `bun dev`
3. Open the site in browser, port 5000.

## Repo map

| Area                                                                 | Role                                                                                                                          |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `src/`                                                               | Next.js 16 app — routes under `src/app/`, components, CMS glue, and `@/kit/*` shared UI/catalog/forms/tools.                  |
| `content/data/settings/`                                             | Nav, chrome, redirects, tool configs (non-article).                                                                           |
| `content/data/site/`, `content/data/layouts/`, `content/data/pages/` | Site catalog, layout trees, hub copy (not article bodies).                                                                    |
| `content/data/items/`                                                | Entity indexes; **blog/locations/editorial JSON is metadata only** (no `blocks`).                                             |
| `content/collections/`                                               | **Article SSOT** — `.mdc` for blog, info, locations. After edits run `bun scripts/syncmdc.ts` (also runs at `bun run build`). |
| `wordpress/`                                                         | `cline-apc-tools` plugin (builder admin); zip via `scripts/plugin.ts`.                                                        |
| `scripts/`                                                           | `syncmdc.ts` (index + runtime bundle from MDC), `plugin.ts`.                                                       |

Single-package layout at repo root (`next.config.ts`, `src/`, `public/`). Tool definitions live under `src/kit/pipeline/`. JSON CMS shards are imported as `@/data/*` → `content/data/*`.

## Naming

Prefer **single-word** file and folder names in application source (`frame.ts`, `leads/`, `chrome/`). Multi-word is fine for JSON config keys, content slugs, and path aliases (`@/kit/catalog`).
