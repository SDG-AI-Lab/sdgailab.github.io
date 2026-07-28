import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Header.astro source', () => {
  const source = readFileSync(
    resolve(process.cwd(), 'src/components/layout/Header.astro'),
    'utf8'
  );

  it('includes accessible main navigation markup', () => {
    expect(source).toContain('aria-label="Main navigation"');
    expect(source).toContain('SDG AI Lab');
  });

  it('includes a mobile menu toggle with an accessible label', () => {
    expect(source).toContain('aria-label="Toggle navigation menu"');
    expect(source).toContain('aria-expanded');
  });

  it('links to the primary public sections', () => {
    expect(source).toContain("label: 'Projects'");
    expect(source).toContain("label: 'Services'");
    expect(source).toContain("label: 'News'");
    expect(source).toContain("label: 'Contact'");
  });
});
