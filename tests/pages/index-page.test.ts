import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('index page source', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/pages/index.astro'), 'utf8');

  it('composes the public homepage with the base layout and hero', () => {
    expect(source).toContain('BaseLayout');
    expect(source).toContain('ParticlesHero');
    expect(source).toContain('Artificial Intelligence for');
  });

  it('hydrates the featured public islands', () => {
    expect(source).toContain('StatsCards');
    expect(source).toContain('FeaturedProjects');
    expect(source).toContain('PartnerLogos');
  });

  it('includes accessible CTA links to projects and contact', () => {
    expect(source).toContain("withBase('/projects')");
    expect(source).toContain("withBase('/contact')");
    expect(source).toContain('focus-visible:ring-2');
  });
});
