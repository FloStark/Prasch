import type { PageContent } from "@/lib/content";
import { applyMediaReplacements } from "@/lib/rendering";

type Props = {
  page: PageContent;
};

export function HtmlContent({ page }: Props) {
  const html = applyMediaReplacements(page.bodyHtml, page.media);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
