import type { Metadata } from "next";
import { PageContent } from "@/app/components/page-content";
import { homeRoute } from "@/app/content/site";
import { pageMetadata, readPageContent } from "@/app/lib/content";

export const metadata: Metadata = pageMetadata(homeRoute);

export default function HomePage() {
  return <PageContent html={readPageContent(homeRoute)} />;
}
