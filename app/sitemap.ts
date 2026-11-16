import type { MetadataRoute } from "next";
import { routes } from "@/app/content/site";

export const dynamic = "force-static";

const siteReady = process.env.NEXT_PUBLIC_SITE_READY === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteReady || !siteUrl) return [];
  return routes
    .filter((route) => !route.noindex)
    .map((route) => ({
      url: new URL(route.path, `${siteUrl}/`).toString(),
    }));
}
