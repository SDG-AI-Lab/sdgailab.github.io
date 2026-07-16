// @vitest-environment jsdom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import FeaturedProjects from './FeaturedProjects';
import NewsList from './NewsList';
import PageContent from './PageContent';
import PartnerLogos from './PartnerLogos';
import PeopleGrid from './PeopleGrid';
import ProjectList from './ProjectList';
import StatsCards from './StatsCards';
import { renderMarkdown } from '../lib/markdown';

const queryMocks = vi.hoisted(() => ({
  getFeaturedProjects: vi.fn(),
  getPageContent: vi.fn(),
  getPublishedNews: vi.fn(),
  getPublishedPartners: vi.fn(),
  getPublishedPeople: vi.fn(),
  getPublishedProjects: vi.fn(),
  getPublishedStatistics: vi.fn(),
}));

vi.mock('../lib/queries', () => queryMocks);
vi.mock('../lib/markdown', () => ({
  renderMarkdown: vi.fn().mockResolvedValue('<p>preview</p>'),
}));

describe('public islands (unit)', () => {
  let container: HTMLDivElement;
  let root: Root;

  async function render(ui: React.ReactNode) {
    await act(async () => {
      root.render(ui);
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    queryMocks.getPublishedStatistics.mockResolvedValue({ data: [], error: null });
    queryMocks.getFeaturedProjects.mockResolvedValue({ data: [], error: null });
    queryMocks.getPublishedProjects.mockResolvedValue({ data: [], error: null });
    queryMocks.getPublishedNews.mockResolvedValue({ data: [], error: null });
    queryMocks.getPublishedPeople.mockResolvedValue({ data: [], error: null });
    queryMocks.getPublishedPartners.mockResolvedValue({ data: [], error: null });
    queryMocks.getPageContent.mockResolvedValue({ data: null, error: null });
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('StatsCards renders sample statistics by default', async () => {
    await render(<StatsCards />);
    expect(container.textContent).toContain('Impact areas');
  });

  it('FeaturedProjects renders sample project cards', async () => {
    await render(<FeaturedProjects />);
    expect(container.textContent).toContain('AI for Tourism Platform');
  });

  it('ProjectList renders sample project links', async () => {
    await render(<ProjectList />);
    expect(container.querySelectorAll('a').length).toBeGreaterThan(0);
  });

  it('NewsList renders sample news items', async () => {
    await render(<NewsList />);
    expect(container.textContent).toContain('responsible development practice');
  });

  it('PeopleGrid renders the team empty state', async () => {
    await render(<PeopleGrid groupType="team" />);
    expect(container.textContent).toContain('No members listed yet.');
  });

  it('PartnerLogos renders sample partner names', async () => {
    await render(<PartnerLogos />);
    expect(container.textContent).toContain('UNDP');
  });

  it('PageContent renders the empty-state message', async () => {
    await render(<PageContent pageSlug="about" sectionSlug="missing-section" />);
    expect(container.textContent).toContain('No content available yet.');
  });

  it('PageContent renders sample content when live data is unavailable', async () => {
    queryMocks.getPageContent.mockResolvedValue({ data: null, error: null });
    await render(<PageContent pageSlug="volunteer" sectionSlug="main" />);
    expect(vi.mocked(renderMarkdown)).toHaveBeenCalledWith(
      expect.stringContaining('Volunteer Data Scientist Initiative')
    );
  });
});
