import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('BaseLayout.astro (unit)', () => {
  const source = readSource('src/components/layout/BaseLayout.astro');

  it('defines document metadata slots', () => {
    expect(source).toContain('<title>{title}</title>');
    expect(source).toContain('name="description"');
    expect(source).toContain('<slot />');
  });

  it('applies sitewide security headers', () => {
    expect(source).toContain('Content-Security-Policy');
    expect(source).toContain("connect-src 'self' https://*.supabase.co");
  });
});

describe('Header.astro (unit)', () => {
  const source = readSource('src/components/layout/Header.astro');

  it('declares accessible navigation landmarks', () => {
    expect(source).toContain('aria-label="Main navigation"');
    expect(source).toContain('aria-label="Toggle navigation menu"');
    expect(source).toContain('aria-expanded');
  });

  it('links to primary public sections', () => {
    expect(source).toContain("label: 'Projects'");
    expect(source).toContain("label: 'News'");
    expect(source).toContain("label: 'Contact'");
  });
});
