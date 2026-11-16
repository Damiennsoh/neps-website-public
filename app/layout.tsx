import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import "@/app/styles/source-site.css";
import "@/app/styles/overrides.css";

const siteReady = process.env.NEXT_PUBLIC_SITE_READY === "true";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  metadataBase: configuredSiteUrl ? new URL(configuredSiteUrl) : undefined,
  title: {
    default: "NEPS | Youth wellbeing. Shared futures.",
    template: "%s",
  },
  description:
    "An African-led, multi-country research programme exploring educational pressure, poverty, stigma and youth mental wellbeing in Ghana, Sierra Leone and Tanzania.",
  robots: siteReady ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: "NEPS",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="/site-interactions.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
