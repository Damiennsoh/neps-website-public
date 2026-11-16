# NEPS public website — Next.js

This is a complete Next.js App Router conversion of the supplied NEPS static site. The original routes, rendered page copy, published news images, NEPS logo, favicon, placeholder wording, metadata descriptions, and site stylesheet are included. The visual system continues to use the source's system sans-serif font stack; the archive did not contain separate font files.

The project is intentionally static: it has no database, API server, authentication, analytics, or remote enquiry submission. The contact form validates in the browser and downloads a plain-text enquiry draft locally. Team directory filters and responsive navigation run in the browser. No contact content is sent to or saved by the website.

## Requirements and local development

- Node.js 20.9 or newer
- npm

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site is marked `noindex` by default. A review build is not access control; use access-controlled hosting if the site should remain private.

## Production build and deploy

```bash
npm run typecheck
npm run build
npm start
```

`npm run build` creates a fully static export in `out/`. `npm start` serves that export locally on port 3000. Deploy the **contents of `out/`** to a static host such as Vercel, Netlify, Cloudflare Pages, or an institutional web server. Use `npm run build` as the build command and `out` as the output/publish directory. The exported site includes static route folders and a custom 404 page.

Before enabling public indexing:

1. Work through [`PLACEHOLDERS.md`](./PLACEHOLDERS.md), including institutional contacts, acknowledgements, news, resources, publications, safeguarding wording, and launch approvals.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
3. Set `NEXT_PUBLIC_SITE_READY=true` **only after** the relevant content and approvals are complete, then rebuild and redeploy. When unset or false, page metadata requests `noindex,nofollow`, `robots.txt` allows crawlers to read those page-level directives, and the generated sitemap is empty. The three supplied Word-document stories appear in both news listings and are eligible for indexing once the site-ready flag is enabled; add `noindex: true` to a route manifest entry if a page must remain excluded.

These flags control search indexing only; they do not provide authentication or hide a public site.

## Where to make updates

- **Page wording and placeholder copy:** edit the corresponding HTML fragment in [`app/content/pages/`](./app/content/pages/). Files are organized by route (`news/foo/` lives in `news/foo.html`). Keep semantic headings, links, accessible labels, and existing placeholders until their owners approve replacements.
- **Page titles/descriptions and route list:** edit [`app/content/routes.json`](./app/content/routes.json). `public/manus-routes.json` mirrors the route manifest for platform tooling.
- **Header/footer links:** edit [`app/content/site.ts`](./app/content/site.ts).
- **Logo, favicon, and photography:** replace the relevant files in [`public/`](./public/) while preserving filenames or update their references.
- **Design tokens and responsive styles:** the supplied original is retained in [`app/styles/source-site.css`](./app/styles/source-site.css). Add deliberate project changes in [`app/styles/overrides.css`](./app/styles/overrides.css). The type family is the same system-font stack from the original site.
- **Editorial launch checklist:** update [`PLACEHOLDERS.md`](./PLACEHOLDERS.md); it is carried forward from the supplied package.

Keep `app/content/routes.json` and `public/manus-routes.json` synchronized when adding/removing routes. The App Router statically generates every route listed in the content manifest.

## Re-importing the supplied static export

The original archive is not needed to build this project. The importer is a migration/restore tool, not a routine editing workflow: running it against the original archive overwrites page fragments, assets, and the editorial checklist with the original static-site version, and does not import these newer Word-document stories. Use it only when intentionally restoring the original source copy and after making a backup. If a clean content/assets re-import is ever required, install the optional Python migration dependency and run:

```bash
python3 -m pip install -r scripts/requirements.txt
python3 scripts/import_static_source.py /path/to/NEPS-website-static
```

The migration script imports route fragments, metadata, public assets, the original stylesheet, and `PLACEHOLDERS.md`. Do not copy `.git`, `.next`, or generated JavaScript build chunks into the application.
