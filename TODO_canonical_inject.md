# TODO: Dynamic self-referencing canonical injection

## Information Gathered
- `avantika/src/app/layout.js` currently exports `metadata.alternates.canonical = './'` and also renders a manual `<head>` element (which can conflict with Next metadata).
- Several page components (notably client components under `src/app/**/[slug]/page.jsx`) set their own canonical using `window.location.href` or hardcoded canonical values.
- Root page `src/app/page.js` sets canonical to `https://avantikatravels.com/`.
- Dynamic sitemap generator already uses `https://avantikatravels.com` and includes routes like `/packages/${slug}`.

## Plan
1. Add a single canonical URL generator utility that:
   - Normalizes to `https://www.avantikatravels.com` (www included).
   - Removes trailing slash (except root) to match sitemap structure exactly.
   - Produces exact pathname for canonical, including dynamic slugs.
2. Add a small shared component (or Next `generateMetadata` helper) that injects `<link rel="canonical" href="..." />` for every page.
3. Ensure the injection works for dynamic routes including:
   - `/packages/[slug]`
   - `/places/[slug]`
   - `/gallery/[slug]`
   - `/blogs/[slug]`
   - and common static routes.
4. Remove/override conflicting per-page canonical tags where needed.
5. Update `avantika/src/app/layout.js` metadata so it no longer sets `alternates.canonical: './'`.
6. Run `npm run build` to ensure metadata/canonical injection compiles.
7. Sanity check canonical output for a few routes.

## Dependent Files to be edited
- `avantika/src/app/layout.js`
- Dynamic route pages that currently set canonical with `window.location.href`.
- Add new util/component files under `avantika/src/components/seo/` (or `src/utils/`).

## Followup Steps
- Build the Next app.
- Manually verify canonical HTML in the browser for:
  - `/`
  - `/packages/<slug>`
  - `/places/<slug>`
  - `/blogs/<slug>`


