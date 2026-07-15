import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

const pageSources: { path: string; checks: (source: string) => void }[] = [
  {
    path: 'src/pages/index.astro',
    checks: (source) => {
      expect(source).toContain('BaseLayout');
      expect(source).toContain('StatsCards');
      expect(source).toContain('FeaturedProjects');
    },
  },
  {
    path: 'src/pages/admin.astro',
    checks: (source) => {
      expect(source).toContain('AdminApp');
      expect(source).toContain('client:only="react"');
      expect(source).toContain("'unsafe-inline'");
    },
  },
  {
    path: 'src/pages/about.astro',
    checks: (source) => {
      expect(source).toContain('BaseLayout');
      expect(source).toContain('<h1');
    },
  },
  {
    path: 'src/pages/contact.astro',
    checks: (source) => {
      expect(source).toContain('mailto:sdgailab@undp.org');
      expect(source).toContain('BaseLayout');
    },
  },
  {
    path: 'src/pages/team.astro',
    checks: (source) => {
      expect(source).toContain('PeopleGrid');
      expect(source).toContain('groupType="team"');
    },
  },
  {
    path: 'src/pages/partners.astro',
    checks: (source) => {
      expect(source).toContain('PartnerLogos');
      expect(source).toContain('BaseLayout');
    },
  },
  {
    path: 'src/pages/volunteer.astro',
    checks: (source) => {
      expect(source).toContain('BaseLayout');
    },
  },
  {
    path: 'src/pages/404.astro',
    checks: (source) => {
      expect(source).toContain('404');
      expect(source).toContain('withBase');
    },
  },
  {
    path: 'src/pages/news/index.astro',
    checks: (source) => {
      expect(source).toContain('NewsList');
      expect(source).toContain('client:load');
    },
  },
  {
    path: 'src/pages/news/detail.astro',
    checks: (source) => {
      expect(source).toContain('NewsDetail');
      expect(source).toContain('client:load');
    },
  },
  {
    path: 'src/pages/projects/index.astro',
    checks: (source) => {
      expect(source).toContain('ProjectList');
      expect(source).toContain('client:load');
    },
  },
  {
    path: 'src/pages/projects/detail.astro',
    checks: (source) => {
      expect(source).toContain('ProjectDetail');
      expect(source).toContain('client:load');
    },
  },
];

describe('Astro pages (unit source contracts)', () => {
  it.each(pageSources)('$path exposes expected structure', ({ path, checks }) => {
    checks(readSource(path));
  });
});
