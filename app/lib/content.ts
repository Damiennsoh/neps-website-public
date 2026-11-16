import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { SiteRoute } from "@/app/content/site";

const siteReady = process.env.NEXT_PUBLIC_SITE_READY === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export function readPageContent(route: SiteRoute): string {
  return readFileSync(join(process.cwd(), "app", "content", "pages", route.content), "utf8");
}

export function pageMetadata(route: SiteRoute): Metadata {
  const pageUrl = siteUrl ? new URL(route.path, `${siteUrl}/`).toString() : undefined;
  return {
    title: route.title,
    description: route.description,
    robots:
      siteReady && !route.noindex ? { index: true, follow: true } : { index: false, follow: false },
    alternates: pageUrl ? { canonical: pageUrl } : undefined,
    openGraph: {
      title: route.title,
      description: route.description,
      url: pageUrl,
      siteName: "NEPS",
      locale: "en_GB",
      type: route.path.startsWith("/news/") && route.path !== "/news/" ? "article" : "website",
    },
    twitter: {
      card: "summary",
      title: route.title,
      description: route.description,
    },
  };
}
