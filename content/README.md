# Content

Everything editorial and CMS-shaped for the site lives under `content/`:

| Path           | Role                                                           |
| -------------- | -------------------------------------------------------------- |
| `collections/` | WordPress-sourced **article SSOT** (`.mdc` bodies)             |
| `data/`        | JSON maps and indexes (nav, layouts, catalog, entity metadata) |

App code reads JSON via `@/data/*`, which resolves to `content/data/*`.

## Collections (`.mdc`)

Canonical editorial files from https://www.lemonlawlawyerscalifornia.com/.

| Folder                   | Source                                      | App routes                        |
| ------------------------ | ------------------------------------------- | --------------------------------- |
| `collections/blog/`      | WP posts                                    | `/blog`, `/blog/[slug]`           |
| `collections/locations/` | City / near-me pages                        | `/locations`, `/locations/[slug]` |
| `collections/info/`      | Other WP pages (fees, how-it-works, guides) | `/info`, `/info/[slug]`           |

WordPress import (when available) should write `.mdc` under `collections/`, then run:

```bash
bun scripts/syncmdc.ts
```

That script writes **indexes** (metadata only — no article body) to `data/items/{blog,locations,editorial}.json` and regenerates `src/lib/cms/content/mdc-bundle.ts`. Article bodies are read from the matching `.mdc` at build/runtime.

## Data (JSON)

Sibling `data/` holds non-article CMS shards, for example:

- `data/settings/` — nav, redirects, legacy paths, chrome
- `data/site/`, `data/layouts/`, `data/pages/` — catalog and hub copy
- `data/items/` — entity indexes (including sync output for collections)

Regenerate collection indexes after editing `collections/`:

```bash
bun scripts/syncmdc.ts
```
