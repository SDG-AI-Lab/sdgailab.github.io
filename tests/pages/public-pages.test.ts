import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('Public Astro pages', () => {
  it('news index composes the NewsList island', () => {
    const source = readSource('src/pages/news/index.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('NewsList');
    expect(source).toContain('client:load');
  });

  it('projects index composes the ProjectList island', () => {
    const source = readSource('src/pages/projects/index.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('ProjectList');
    expect(source).toContain('client:load');
  });

  it('team page composes the PeopleGrid island', () => {
    const source = readSource('src/pages/team.astro');
    expect(source).toContain('PeopleGrid');
    expect(source).toContain('groupType="team"');
  });

  it('contact page includes accessible mailto contact details', () => {
    const source = readSource('src/pages/contact.astro');
    expect(source).toContain('mailto:sdgailab@undp.org');
    expect(source).toContain('aria-hidden="true"');
  });

  it('about page uses the shared base layout', () => {
    const source = readSource('src/pages/about.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('<h1');
  });

  it('partners page composes partner content', () => {
    const source = readSource('src/pages/partners.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('PartnerLogos');
  });

  it('volunteer page uses the shared base layout', () => {
    const source = readSource('src/pages/volunteer.astro');
    expect(source).toContain('BaseLayout');
  });

  it('404 page provides a recovery link', () => {
    const source = readSource('src/pages/404.astro');
    expect(source).toContain('404');
    expect(source).toContain('withBase');
  });

  it('news detail page composes the NewsDetail island', () => {
    const source = readSource('src/pages/news/detail.astro');
    expect(source).toContain('NewsDetail');
    expect(source).toContain('client:load');
  });

  it('project detail page composes the ProjectDetail island', () => {
    const source = readSource('src/pages/projects/detail.astro');
    expect(source).toContain('ProjectDetail');
    expect(source).toContain('client:load');
  });
});
