import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('index page source', () => {
  const source = readFileSync(resolve(process.cwd(), 'src/pages/index.astro'), 'utf8');

  it('composes the public homepage with the base layout and Marina hero', () => {
    expect(source).toContain('BaseLayout');
    expect(source).toContain('marina-live-hero');
    expect(source).toContain('Digital technologies');
    expect(source).toContain('marina-live-title-sustainable">Sustainable');
    expect(source).toContain('marina-live-title-goals">Development Goals.');
  });

  it('includes the supplied work gallery, impact indicators, and partner marks', () => {
    expect(source).toContain('partnerLogos');
    expect(source).toContain('marina-live-gallery');
    expect(source).toContain('marina-live-partner-marks');
    expect(source).toContain('impactStats');
  });

  it('keeps the supplied hero accessible and links to the working-method page', () => {
    expect(source).not.toContain("withBase('/solutions')");
    expect(source).toContain("withBase('/how-we-work')");
    expect(source).toContain('aria-labelledby="home-hero-heading"');
  });
});
