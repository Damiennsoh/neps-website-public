# NEPS publication checklist

The working website is a local review build. `NEXT_PUBLIC_SITE_READY=false` requests no indexing; it is not authentication or access control. Use access-controlled hosting for a confidential review copy.

## Complete before public launch

- The programme age range is confirmed as **12–24** by the user on 29 September 2026. Retain this correction; individual recruitment eligibility must follow the relevant protocol.
- Confirm the seven public-facing WP titles, especially the formal WP7 designation, since source workstream terminology varies. WP2–WP6 leads are now supplied; confirm remaining structures, including formal WP1 and WP7 lead designations.
- Co-PI affiliations are supplied for Ghana (KNUST), Sierra Leone (USL) and Tanzania (MUHAS). Confirm wider country teams, settings and approved public ethics/readiness summaries, including references and scope. Pending website confirmation does not mean approvals are absent.
- Twelve named team profiles are now supplied, including Prof Obed Brew’s dual PI/WP3 role, Ghana country designation and USTED/KNUST affiliations. Add biographies and consent-cleared photographs. The six additional WP/management affiliations are supplied: USTED for Dr Asare Kotor, Ms Akosua A. Gyamfuah and Mr Robert Annorhene; KNUST for Dr Linda A Banning, Prof Linda A Fondjo and Rev. (Prof.) Frances Emily Owusu-Ansah; all are in Ghana. Country coordinators are Dr Harrieth Peter Ndumwa (MUHAS, Tanzania) and Mrs Fatmata Bah (USL, Sierra Leone). Advisory boards and remaining appointments are still placeholders.
- Confirm the public contact email and institutional address. The form currently generates a local draft, not a submitted message. No server-side mail service is implemented or required for static hosting.
- Add approved funder acknowledgement, institutional disclaimer and genuine social channel URLs. Social placeholders are text, not dead links.
- The three generic news placeholders have been replaced by full article pages based on the supplied Word documents, with all four embedded photos used in the stories and lead photos shown in the news cards. Confirm public editorial clearance and the November 2026 and July 2026 month labels retained from the existing news list; only the site-visit document states its exact publication date and source.
- Add approved resource files/URLs with version, accessibility, permission and reuse information. No internal source documents are in `public/`.
- Populate publications and outputs only from verified bibliographic records. Dataset access needs its own approval and documented terms.
- Confirm citation dates/version details for internal documents. Do not make draft source material public solely to complete a citation.
- Confirm safeguarding and referral wording with country teams. Public-facing summaries must not expose participant records or private safeguarding contact information.
- Confirm that the proposed co-deployment and separate Creative Art Therapy pathway descriptions remain current. This site makes no efficacy claim.
- Set the production origin, check page metadata, obtain content clearance, then set `NEXT_PUBLIC_SITE_READY=true` and rebuild.

## Source boundaries

No participant data, raw records, budgets, contracts, school lists, unpublished attachments, private emails or private staff records were copied into the site. The supplied NEPS logo, programme-level summaries and user-provided professional names, roles and affiliations were used.

The full publication checklist is an editorial handover, not evidence that the underlying programme has unmet operational requirements.

## Updating this Next.js website

The checklist above is retained from the supplied site package. Page copy and pending editorial text live in `app/content/pages/`; route titles and descriptions live in `app/content/routes.json`; news photographs are in `public/images/news/`. The home and news listings link to the three supplied story pages. Keep other placeholder language visible until the responsible team confirms a replacement. The site remains noindex by default; follow `README.md` before deployment, confirm editorial clearance and publication dates, and leave `NEXT_PUBLIC_SITE_READY=false` until the launch checklist and approvals are complete.
