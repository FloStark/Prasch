import type { MediaReplacement } from "@/lib/content";

export function applyMediaReplacements(html: string, media: MediaReplacement[] = []): string {
  const withMedia = media.reduce((currentHtml, item) => {
    if (!item.originalSrc || !item.src) return currentHtml;

    const escapedOriginal = item.originalSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let nextHtml = currentHtml.replace(new RegExp(`(src=["'])${escapedOriginal}(["'])`, "g"), `$1${item.src}$2`);
    nextHtml = nextHtml.replace(new RegExp(`(url\\(["']?)${escapedOriginal}(["']?\\))`, "g"), `$1${item.src}$2`);

    if (item.alt !== undefined) {
      const sourceIndex = nextHtml.indexOf(`src=\"${item.src}\"`);
      if (sourceIndex !== -1) {
        const tagStart = nextHtml.lastIndexOf("<", sourceIndex);
        const tagEnd = nextHtml.indexOf(">", sourceIndex);
        if (tagStart !== -1 && tagEnd !== -1) {
          const tag = nextHtml.slice(tagStart, tagEnd + 1);
          const replacement = tag.includes("alt=")
            ? tag.replace(/alt="[^"]*"/, `alt="${escapeAttribute(item.alt)}"`)
            : tag.replace(/>$/, ` alt="${escapeAttribute(item.alt)}">`);
          nextHtml = `${nextHtml.slice(0, tagStart)}${replacement}${nextHtml.slice(tagEnd + 1)}`;
        }
      }
    }

    return nextHtml;
  }, html);

  return withMedia.replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/g, 'href="/$1$2"');
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
