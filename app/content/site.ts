import routeData from "./routes.json";

export type SiteRoute = {
  path: string;
  content: string;
  title: string;
  description: string;
  noindex?: boolean;
};

export const routes = routeData as SiteRoute[];
export const homeRoute = routes.find((route) => route.path === "/")!;

export function getRoute(path: string): SiteRoute | undefined {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return routes.find((route) => route.path === normalized);
}

export const navigationGroups = [
  {
    label: "About",
    paths: ["/about/", "/countries/", "/governance/", "/team/"],
    links: [
      { href: "/about/", label: "About NEPS" },
      { href: "/countries/", label: "Country implementation" },
      { href: "/governance/", label: "Governance & consortium" },
      { href: "/team/", label: "Our team" },
    ],
  },
  {
    label: "Research",
    paths: [
      "/research-framework/",
      "/work-packages/",
      "/data-ethics-safeguarding/",
      "/publications/",
    ],
    links: [
      { href: "/research-framework/", label: "Research framework" },
      { href: "/work-packages/", label: "Work packages" },
      { href: "/data-ethics-safeguarding/", label: "Data, ethics & safeguarding" },
      { href: "/publications/", label: "Publications & outputs" },
    ],
  },
  {
    label: "Evidence into action",
    paths: ["/youth-mental-health-manual/", "/creative-art-therapy/", "/policy-and-advocacy/"],
    links: [
      { href: "/youth-mental-health-manual/", label: "Youth mental health manual" },
      { href: "/creative-art-therapy/", label: "Creative Art Therapy" },
      { href: "/policy-and-advocacy/", label: "Policy & advocacy" },
    ],
  },
  {
    label: "Latest & resources",
    paths: ["/news/", "/resources/"],
    links: [
      { href: "/news/", label: "News & updates" },
      { href: "/resources/", label: "Resources" },
    ],
  },
];

export const footerGroups = [
  {
    label: "About",
    links: [
      { href: "/about/", label: "About NEPS" },
      { href: "/countries/", label: "Country implementation" },
      { href: "/governance/", label: "Governance & consortium" },
      { href: "/team/", label: "Our team" },
    ],
  },
  {
    label: "Research",
    links: [
      { href: "/research-framework/", label: "Research framework" },
      { href: "/work-packages/", label: "Work packages" },
      { href: "/data-ethics-safeguarding/", label: "Data, ethics & safeguarding" },
      { href: "/publications/", label: "Publications & outputs" },
    ],
  },
  {
    label: "Evidence into action",
    links: [
      { href: "/youth-mental-health-manual/", label: "Youth mental health manual" },
      { href: "/creative-art-therapy/", label: "Creative Art Therapy" },
      { href: "/policy-and-advocacy/", label: "Policy & advocacy" },
    ],
  },
  {
    label: "Latest & resources",
    links: [
      { href: "/news/", label: "News & updates" },
      { href: "/resources/", label: "Resources" },
    ],
  },
];
