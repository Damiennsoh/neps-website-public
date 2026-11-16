import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PageContent } from "@/app/components/page-content";

export default function NotFound() {
  const html = readFileSync(
    join(process.cwd(), "app", "content", "pages", "not-found.html"),
    "utf8",
  );
  return <PageContent html={html} />;
}
