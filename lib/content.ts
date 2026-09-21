import fs from "node:fs";
import path from "node:path";

export type MediaReplacement = {
  originalSrc: string;
  src: string;
  alt?: string;
};

export type PageContent = {
  slug: string;
  title: string;
  description?: string;
  keywords?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  bodyHtml: string;
  sections?: PageSection[];
  schemaJson?: string[];
  media?: MediaReplacement[];
};

export type PageSection = Record<string, unknown> & {
  _template: string;
};

export type SiteSettings = {
  siteName: string;
  baseUrl: string;
  logo: string;
  logoAlt: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  footerText: string;
  cookieTitle: string;
  cookieText: string;
};

export type DesignSettings = {
  bodyFont: string;
  headingFont: string;
  accentFont?: string;
  primaryColor?: string;
};

const root = process.cwd();

export const pageSlugs = [
  "home",
  "fassadengestaltung",
  "innenmalerei",
  "anstriche",
  "farben-kaufen",
  "referenzen",
  "ueber-uns",
  "team",
  "nachhaltigkeit",
  "standort-graz",
  "standort-studenzen",
  "impressum",
  "datenschutz"
];

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function getPage(slug: string): PageContent {
  const normalized = slug === "" || slug === "/" ? "home" : slug.replace(/\.html$/, "");
  return readJson<PageContent>(path.join(root, "content", "pages", `${normalized}.json`));
}

export function getSiteSettings(): SiteSettings {
  return readJson<SiteSettings>(path.join(root, "content", "settings", "site.json"));
}

export function getDesignSettings(): DesignSettings {
  return readJson<DesignSettings>(path.join(root, "content", "settings", "design.json"));
}

export function getPathFromSlug(slug: string): string {
  return slug === "home" ? "/" : `/${slug}`;
}

export function pageExists(slug: string): boolean {
  const normalized = slug === "" || slug === "/" ? "home" : slug.replace(/\.html$/, "");
  return fs.existsSync(path.join(root, "content", "pages", `${normalized}.json`));
}
