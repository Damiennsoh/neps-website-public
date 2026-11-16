import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContent } from "@/app/components/page-content";
import { getRoute, routes } from "@/app/content/site";
import { pageMetadata, readPageContent } from "@/app/lib/content";

type RouteProps = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routes
    .filter((route) => route.path !== "/")
    .map((route) => ({ slug: route.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRoute(`/${slug.join("/")}/`);
  return route ? pageMetadata(route) : {};
}

export default async function StaticPage({ params }: RouteProps) {
  const { slug } = await params;
  const route = getRoute(`/${slug.join("/")}/`);
  if (!route) notFound();
  return <PageContent html={readPageContent(route)} />;
}
