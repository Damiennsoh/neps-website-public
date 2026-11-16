import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteReady = process.env.NEXT_PUBLIC_SITE_READY === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteReady && siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
