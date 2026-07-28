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

  it('launch-readiness page is a noindex internal review tracker', () => {
    const source = readSource('src/pages/launch-readiness.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('noindex={true}');
    expect(source).toContain('aria-labelledby="criteria-heading"');
    expect(source).toContain('withBase');
  });



  it('solutions page exposes reusable solution structure', () => {
    const source = readSource('src/pages/solutions.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('Reusable tools, methods and product patterns');
    expect(source).toContain('Responsible AI safeguards');
  });

  it('services page exposes requestable support pathways', () => {
    const source = readSource('src/pages/services.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('Support pathways');
    expect(source).toContain('labServiceLines');
  });

  it('impact page exposes the evidence and geographic layers', () => {
    const source = readSource('src/pages/impact.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('Evidence, reach and learning');
    expect(source).toContain('Geographic layer');
  });

  it('resources page exposes the knowledge hub and CTA links', () => {
    const source = readSource('src/pages/resources.astro');
    expect(source).toContain('BaseLayout');
    expect(source).toContain('Knowledge hub');
    expect(source).toContain("withBase('/news')");
    expect(source).toContain("withBase('/projects')");
  });

  it('research page exposes research and knowledge content', () => {
    const source = readSource('src/pages/research.astro');
    expect(source).toContain('Research & knowledge');
    expect(source).toContain('reports, briefs, blogs');
    expect(source).toContain("withBase('/resources')");
  });

  it('capacity building page exposes learning pathways, not volunteer-only content', () => {
    const source = readSource('src/pages/capacity-building.astro');
    expect(source).toContain('Capacity building');
    expect(source).toContain('Training, mentorship');
    expect(source).toContain("withBase('/volunteer')");
  });

  it('partnerships page exposes collaboration models and partner network content', () => {
    const source = readSource('src/pages/partnerships.astro');
    expect(source).toContain('Partnerships');
    expect(source).toContain('Collaboration model');
    expect(source).toContain('PartnerLogos');
  });

});
