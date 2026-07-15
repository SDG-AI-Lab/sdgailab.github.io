import { marked } from 'marked';

const SAFE_DATA_IMAGE_PATTERN = /^data:image\/(gif|jpeg|jpg|png|webp);base64,/i;
const UNSAFE_URL_PATTERN = /^(javascript|vbscript|file|data):/i;

function escapeRawHtml(markdown: string): string {
  return markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function sanitizeHrefAndSrc(html: string): string {
  return html
    .replace(/\s(href)=(['"])(.*?)\2/gi, (_, attribute: string, quote: string, value: string) => {
      const trimmed = value.trim();
      if (UNSAFE_URL_PATTERN.test(trimmed)) {
        return ` ${attribute}=${quote}#${quote}`;
      }
      return ` ${attribute}=${quote}${trimmed}${quote}`;
    })
    .replace(/\s(src)=(['"])(.*?)\2/gi, (_, attribute: string, quote: string, value: string) => {
      const trimmed = value.trim();
      if (SAFE_DATA_IMAGE_PATTERN.test(trimmed)) {
        return ` ${attribute}=${quote}${trimmed}${quote}`;
      }
      if (UNSAFE_URL_PATTERN.test(trimmed)) {
        return ` ${attribute}=${quote}${quote}`;
      }
      return ` ${attribute}=${quote}${trimmed}${quote}`;
    });
}

function sanitizeRenderedHtml(html: string): string {
  return sanitizeHrefAndSrc(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/\son[a-z]+=(["']).*?\1/gi, '');
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const escapedMarkdown = escapeRawHtml(markdown);
  const rendered = marked.parse(escapedMarkdown);
  const html = typeof rendered === 'string' ? rendered : await rendered;
  return sanitizeRenderedHtml(html);
}
