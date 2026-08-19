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

  it('links to the primary public sections without service subnavigation', () => {
    expect(source).toContain("label: 'How we work'");
    expect(source).toContain("label: 'Our projects'");
    expect(source).toContain("label: 'Our services'");
    expect(source).not.toContain('serviceSubLinks');
    expect(source).not.toContain('aria-haspopup');
    expect(source).toContain("label: 'Publications'");
    expect(source).toContain("label: 'Team'");
    expect(source).toContain("label: 'Contact'");
    expect(source).not.toContain('Header request support');
  });
});
