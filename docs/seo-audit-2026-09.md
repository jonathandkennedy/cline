# Pre-launch SEO audit (Legal Leads Group, Sept 17 2026): status

Every finding in the audit and what the codebase now does about it. Items under
**Needs the firm / deployment** can't be finished in code.

## Measured on the production build (host `www.lemonlawlawyerscalifornia.com`)

| Audit metric                                      | Audit                       | Now                                                                                               |
| ------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| Production URLs with a one-hop 301 to a live page | 0 / 319                     | 318 / 319 (the other is `/`, served directly)                                                     |
| Staging host indexable                            | yes                         | `X-Robots-Tag: noindex, nofollow` on every non-production host; no sitemap/Host in its robots.txt |
| Pages rendering the staging hostname              | 375                         | 0                                                                                                 |
| Header links in server HTML                       | 0                           | on every page                                                                                     |
| Stat strip numbers in HTML                        | missing                     | rendered                                                                                          |
| Tool pages, server HTML words                     | 74–84                       | ~900 (guide, formula, worked examples, FAQ)                                                       |
| `/contact` canonical / H1                         | homepage / none             | `/contact` / "Free Lemon Law Case Review"                                                         |
| Headings with raw `**`                            | 220 (233 markers)           | 0                                                                                                 |
| Raw `[text](url)` on page                         | 5                           | 0                                                                                                 |
| Wrong-city copy                                   | 4 known                     | 13 fixed                                                                                          |
| Titles > 60 chars                                 | 187                         | 0                                                                                                 |
| Descriptions > 160 / < 70                         | 209 / 13                    | 0 / 0                                                                                             |
| Pages without og:image                            | 371                         | 0 (plus twitter:image, article times)                                                             |
| aggregateRating / Review markup                   | all pages / 18              | removed                                                                                           |
| articleBody in JSON-LD                            | 293                         | 0                                                                                                 |
| Pages with ≤1 internal link in                    | 192                         | 9                                                                                                 |
| Sitemap distinct lastmod values                   | 1                           | 82 (real content dates; omitted when unknown)                                                     |
| `/blog/page/999`, `/0`, `/abc`                    | 200                         | 404                                                                                               |
| Mixed-case paths                                  | 404                         | 301 to lowercase                                                                                  |
| Keywords meta                                     | every page                  | removed                                                                                           |
| 404 page title                                    | homepage title              | "Page Not Found"                                                                                  |
| nosniff / Referrer-Policy / Permissions-Policy    | missing                     | set                                                                                               |
| Homepage JavaScript                               | 1,110 KB (one 821 KB chunk) | the chunk with every article body is gone (~5.3 MB → 2.1 MB raw)                                  |

Reproduce: `bun run test` (all 319 legacy URLs, one hop, live target) and a crawl of
`bun run build && bun run start` with `Host: www.lemonlawlawyerscalifornia.com`.

## Where things live

- Redirects: `src/lib/redirects.ts` (applied by `src/proxy.ts`), data in
  `content/data/settings/redirects.json` and `legacy.json`. Next's trailing-slash redirect is
  off so nothing takes two hops.
- Canonical host: `SITE_URL` in `src/lib/cms/tables/config.ts` (`NEXT_PUBLIC_SITE_URL`,
  defaults to www).
- Titles/descriptions: `content/data/settings/seo.json`, applied in `src/lib/seo.ts`.
- OG cards: `public/images/og/*` from `scripts/og.ts`.
- Blog topics/brands: `content/data/settings/topics.json`, tagged by `scripts/syncmdc.ts`,
  hubs at `/blog/topics`.
- FAQ: six topical pages at `/faq/<topic>`; guidebook chapters are sections of `/guidebook`.
- Attorney bios: `content/data/items/team.json` (`profile` field) → `/team/<id>`.

## Needs the firm / deployment

1. **Compliance review** (Rule 7.1, B&P 6157–6158.3): the homepage results strip is now
   labelled "Composite example" with the case-study disclosure beside it. Counsel should
   approve that wording, or the composites should be replaced with real, consented results.
   The rating caption reads "Rated 4.9 from 142 Google & Yelp reviews" from `brand.json`,
   so keep `rating` / `reviewCount` current.
2. **Disclaimer & Terms** (`content/collections/info/disclaimer.mdc`) is standard attorney
   advertising and terms language. Have the firm review it before launch.
3. **Measurement:** set `NEXT_PUBLIC_GTM_ID` (GTM-WXN4B2) on the production deployment only.
   In GTM, map the `generate_lead` and `phone_click` dataLayer events to GA4 conversions and
   add call tracking. Verify Search Console by DNS. Once tags are in, extend the CSP with a
   `script-src`.
4. **Hosting:** the `Access-Control-Allow-Origin: *` seen on staging HTML doesn't come from
   this codebase, so check the Vercel project settings. Point the apex domain at the same
   project; the proxy 301s apex → www.
5. **Content depth** (can't be written responsibly without the firm):
   - Manufacturer pages still share one template. Add the models, recalls/TSBs and defect
     patterns the firm has actually litigated. Each page now links its brand's posts.
   - FAQ topical pages are 300–400 words; the audit's target is 800–1,200.
   - Bios for Eric Natenstedt, Diana De La Cruz, Ashley Yaddgo and John Evans don't exist on
     the old site either, so they resolve to `/team#member` until they're written.
   - Office hours aren't in the data, so they aren't on `/contact` or in the schema.
   - Blog posts from 2015–2019: review for outdated law (AB 1755, 2025 changes) and add a
     "Reviewed by" line or prune and redirect.
6. **Author attribution:** posts carry Brian K. Cline as author (Person schema and a visible
   byline), matching the WordPress site. Change `authorRef()` in `src/lib/structured.ts` if
   other attorneys wrote some posts.
7. **Launch day:** follow the audit's section 13 (DNS in a low-traffic hour, spot-check 20
   redirects, submit the sitemap, update the GBP/Yelp/Avvo links, watch Search Console for
   404s daily for a week).

## Further performance work (optional)

Client components import the whole CMS data index (`src/lib/cms/dataindex.ts`), about 830 KB
raw. Splitting it per route would take most of the remaining homepage JavaScript. That's a
structural refactor, so it's left as follow-up.
