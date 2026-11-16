# NEPS Static Site to Next.js — Implementation Plan

## Goal and constraints

Convert the supplied NEPS static production export into a complete, deployable, maintainable Next.js App Router project. Preserve the supplied routes, page copy, remaining editorial placeholders, logo, favicon, original public images, metadata intent, and the original visual system/font stack. The archive contains 18 rendered pages and three homepage placeholder-news links without detail pages; those generic cards are replaced by three company-supplied Word-document stories, whose full text and four embedded photos appear in article pages and whose lead photos appear in both news listings. No participant data or private/internal files are to be introduced. Retain the source privacy boundary: no database or application backend, and no remote enquiry submission. Keep indexing disabled by default until editorial approval.

## Implementation approach

Use Next.js 16 App Router, React, and TypeScript with static export and trailing-slash routes. Build pages from readable per-route HTML fragments and a JSON manifest; keep page copy separate from reusable navigation, layout, and metadata. Use React components for the responsive shared header, footer, skip link, and 404 shell. A small public browser script enhances the contact form's explicit local draft-download button and team directory filters; it performs no network or storage calls. Keep the original stylesheet and source logo, favicon, news photos, and all other supplied public assets.

## Design

Reuse the supplied NEPS site's original editorial visual language and compiled design tokens rather than invent a new style. Preserve its deep-teal/green palette, original responsive spacing, system sans-serif stack, and visual logo. The typeface is the source's system-font stack; no standalone font binaries were present in the uploaded archive. Keep those declarations unchanged in the retained stylesheet.

## Project structure

- `app/`: App Router root layout, home route, generated catch-all routes, robots/sitemap metadata routes, and not-found page.
- `app/components/`: reusable responsive header, footer, and source-HTML renderer.
- `app/content/pages/`: readable route HTML fragments; the primary location for editorial copy updates.
- `app/content/routes.json` and `app/content/site.ts`: route/title/description data, navigation, footer links, and route helpers.
- `app/styles/source-site.css` and `overrides.css`: preserved design system and a separate future customization layer.
- `public/`: source logo, favicon, article images, route manifest, and privacy-preserving interactions script.
- `scripts/import_static_source.py`: repeatable source-page/asset import that excludes git/build caches and preserves missing-linked placeholders.
- `README.md`, `PLACEHOLDERS.md`, `.env.example`, `TODO.md`: contributor instructions, editorial handover, and safe launch configuration.

## Runtime and deployment

Use Node.js 20.9 or newer with patched Next.js 16.4.6. Support `npm run dev`, `npm run build`, `npm start`, `npm run lint`/type-check, and formatting checks. Static deployments use `output: "export"` and the generated `out/` directory. Do not introduce a backend, database, user login, analytics, or external delivery for contact submissions. `NEXT_PUBLIC_SITE_READY` remains false by default; only a production build with explicit approval and `NEXT_PUBLIC_SITE_URL` enables crawling and a populated sitemap.
