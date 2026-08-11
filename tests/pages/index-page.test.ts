import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('index page source', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/pages/index.astro'), 'utf8');

  it('composes the public homepage with the base layout and hero', () => {
    expect(source).toContain('BaseLayout');
    expect(source).toContain('landing-hero');
    expect(source).toContain('We help UNDP teams turn complex challenges into AI solutions');
  });

  it('hydrates the featured public islands', () => {
    expect(source).toContain('FeaturedProjects');
    expect(source).toContain('PartnerLogos');
    expect(source).toContain('variant="marquee"');
    expect(source).not.toContain('limit={8}');
  });

  it('includes accessible CTA links to projects and contact', () => {
    expect(source).not.toContain("withBase('/solutions')");
    expect(source).toContain("withBase('/projects')");
    expect(source).toContain("withBase('/contact')");
    expect(source).toContain('focus-visible:');
  });
});
