# NEPS Public Website (Static Production)

Official static production website for **NEPS: Navigating Educational Pressures and Stressors** — an African-led, multi-country youth mental health and wellbeing research programme across Ghana (KNUST), Sierra Leone (USL), and Tanzania (MUHAS).

---

## 1. Overview & Architecture

This repository contains the standalone, fully pre-rendered static distribution of the NEPS public website. 

```
                       EXTERNAL STAKEHOLDERS
             (Public, Funders, Ethics Boards, Ministries)
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │     NEPS Public Website     │  ◄── [This Repository]
                 │   (Vercel / CDN / Static)   │      Zero database, high speed
                 └─────────────────────────────┘
                                X  STRICT DATA ISOLATION (No connection)
                 ┌─────────────────────────────┐
                 │     NEPS Clinical Core      │  ◄── Internal On-Prem Platform
                 │   (Portal, Backend, DB)     │      (KNUST / CAIH Server)
                 └─────────────────────────────┘
```

### Key Architectural Highlights:
* **Zero Database & Zero Backend Dependencies**: The website requires no SQL database, runtime API, or external server infrastructure. All pages, directories, and assets are statically compiled.
* **Clinical Data Isolation**: Operates entirely separate from the internal clinical surveillance platform (`neps-portal` and `neps-backend`), ensuring zero exposure of participant records, REDCap tokens, or clinical safeguarding systems.
* **Privacy-First Contact Workflow**: The contact form is client-side only. It validates inputs and generates a local downloadable draft or `mailto:` draft. It does not transmit or store private messages on any remote server.
* **Accessibility & Modern Standards**: Built with responsive layouts, semantic HTML5, high contrast compliance (WCAG), and keyboard navigation support.

---

## 2. Directory Structure & Included Pages

The repository contains all 15 pre-rendered pages with standard directory routing:

```
.
├── index.html                   # Home page (Mission, Conceptual Framework, Country Hubs)
├── about/index.html             # Consortium rationale, institutional partners
├── countries/index.html         # Implementation sites (Ghana, Sierra Leone, Tanzania)
├── governance/index.html        # Steering committee, advisory boards, oversight
├── team/index.html              # Investigators & leadership with category/country filters
├── research-framework/index.html# Theory of Change and multi-level model
├── work-packages/index.html     # Scopes and milestones for Work Packages 1–8
├── data-ethics-safeguarding/    # Consent frameworks, protection & responsible AI
├── publications/index.html      # Academic outputs & verified citations
├── youth-mental-health-manual/  # Intervention manual and school co-deployment pilot
├── creative-art-therapy/        # Arts-based non-stigmatising therapy pathway
├── policy-and-advocacy/         # Translation to policy for health and education
├── news/index.html              # News updates & articles
│   ├── listening-to-young-people/
│   ├── research-across-countries/
│   └── school-support-resources/
├── resources/index.html         # Public briefs, toolkits, and documents
├── contact/index.html           # Contact directory & client-side draft creator
├── 404.html                     # Custom accessible 404 page
├── vercel.json                  # Production Vercel routing & caching headers
├── .gitignore                   # Ignore rules for local and Vercel caches
├── PLACEHOLDERS.md              # Editorial checklist before public launch
└── _next/static/                # Compiled CSS bundles, fonts, and JS chunks
```

---

## 3. Local Preview & Testing

To inspect and test the website locally, use any static file server:

### Using Python:
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Using Node.js (`npx serve`):
```bash
npx serve . -p 3000
```

---

## 4. Deploying to Vercel

This repository is pre-configured with `vercel.json` for immediate one-click deployment:

1. **Push this repository to GitHub** (see instructions below).
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." > "Project"**.
3. Import your GitHub repository.
4. **Build and Output Settings**:
   * **Framework Preset**: Select `Other` (or leave default).
   * **Build Command**: Leave empty / disabled.
   * **Output Directory**: Leave empty / `.` (the repository root itself is the deployable site).
5. Click **Deploy**.

Vercel will deploy the site across its global Edge Network with automatic SSL, clean routing (`/about/` -> `about/index.html`), and optimized caching headers.

---

## 5. Alternative Deployment Options

* **Cloudflare Pages**: Connect the GitHub repository; set Build Command to empty and Output directory to `/`.
* **Netlify**: Connect GitHub repository; set Publish directory to `.`.
* **GitHub Pages**: Push to GitHub, go to **Settings > Pages**, and set source to deploy from the `main` branch root.
* **Institutional Nginx (e.g. KNUST On-Prem)**: Copy files to `/var/www/neps` and point Nginx with `try_files $uri $uri/ =404;`.

---

## 6. Pre-Launch Editorial Checklist

Before conducting a formal public launch and enabling search-engine crawling, review [PLACEHOLDERS.md](file:///d:/COMPUTER_SCIENCE/NEPS-PORTAL/NEPS-website-static/PLACEHOLDERS.md) for final approvals regarding institutional contact details, funder acknowledgement phrasing, and verified author biographies.
