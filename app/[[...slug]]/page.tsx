import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VisualPage } from "@/components/VisualPage";
import { getDesignSettings, getPage, getPathFromSlug, getSiteSettings, pageExists, pageSlugs } from "@/lib/content";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function normalizeSlug(slug?: string[]) {
  const raw = slug?.join("/") || "home";
  return raw.replace(/^\//, "").replace(/\.html$/, "") || "home";
}

export function generateStaticParams() {
  return pageSlugs.flatMap((slug) => {
    if (slug === "home") return [{ slug: [] }];
    return [{ slug: [slug] }, { slug: [`${slug}.html`] }];
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalized = normalizeSlug(slug);
  if (!pageExists(normalized)) return {};
  const page = getPage(normalized);
  const site = getSiteSettings();
  const canonical = page.canonical || `${site.baseUrl}${getPathFromSlug(page.slug)}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    robots: page.robots,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: page.ogTitle || page.title,
      description: page.ogDescription || page.description,
      images: page.ogImage ? [page.ogImage] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle || page.title,
      description: page.ogDescription || page.description,
      images: page.ogImage ? [page.ogImage] : undefined
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const normalized = normalizeSlug(slug);
  if (!pageExists(normalized)) notFound();

  const variables = {
    relativePath: `${normalized}.json`,
    siteRelativePath: "site.json",
    designRelativePath: "design.json"
  };

  const page = getPage(normalized);
  const site = getSiteSettings();
  const design = getDesignSettings();
  const data = {
    page: withDocumentMeta({ ...page, media: page.media?.map((item) => ({ __typename: "PageMedia", ...item })) }, "page", variables.relativePath),
    siteSettings: withDocumentMeta(site, "siteSettings", variables.siteRelativePath),
    designSettings: withDocumentMeta(design, "designSettings", variables.designRelativePath)
  };

  return (
    <VisualPage data={data} variables={variables} />
  );
}

function withDocumentMeta<T extends Record<string, unknown>>(data: T, collection: string, relativePath: string) {
  const filename = relativePath.replace(/\.json$/, "");
  const folder = collection === "page" ? "pages" : "settings";
  return {
    __typename: collection === "page" ? "Page" : collection === "siteSettings" ? "SiteSettings" : "DesignSettings",
    ...data,
    id: `content/${folder}/${relativePath}`,
    _sys: {
      filename,
      basename: filename,
      path: `content/${folder}/${relativePath}`,
      relativePath,
      extension: ".json"
    }
  };
}
