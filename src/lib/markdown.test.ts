import { describe, expect, it } from 'vitest';

import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('escapes raw html before rendering markdown', async () => {
    const html = await renderMarkdown('<script>alert(1)</script>**safe**');

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('<strong>safe</strong>');
  });

  it('neutralizes unsafe href protocols', async () => {
    const html = await renderMarkdown('[click me](javascript:alert(1))');

    expect(html).toContain('href="#"');
    expect(html).not.toContain('javascript:alert(1)');
  });

  it('strips dangerous inline event handlers from rendered html', async () => {
    const html = await renderMarkdown('&lt;img src="https://example.com/x.png" onerror="alert(1)"&gt;');

    expect(html).not.toContain('<img ');
    expect(html).toContain('&amp;lt;img');
  });

  it('preserves safe data image sources', async () => {
    const html = await renderMarkdown('![safe image](data:image/png;base64,AAAA)');

    expect(html).toContain('src="data:image/png;base64,AAAA"');
  });
});
