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

const {
  getFeaturedProjectsMock,
  getPageContentMock,
  getPublishedNewsMock,
  getPublishedPartnersMock,
  getPublishedPeopleMock,
  getPublishedProjectsMock,
  getPublishedStatisticsMock,
  renderMarkdownMock,
} = vi.hoisted(() => ({
  getFeaturedProjectsMock: vi.fn(),
  getPageContentMock: vi.fn(),
  getPublishedNewsMock: vi.fn(),
  getPublishedPartnersMock: vi.fn(),
  getPublishedPeopleMock: vi.fn(),
  getPublishedProjectsMock: vi.fn(),
  getPublishedStatisticsMock: vi.fn(),
  renderMarkdownMock: vi.fn(),
}));

vi.mock('../lib/queries', () => ({
  getFeaturedProjects: getFeaturedProjectsMock,
  getPageContent: getPageContentMock,
  getPublishedNews: getPublishedNewsMock,
  getPublishedPartners: getPublishedPartnersMock,
  getPublishedPeople: getPublishedPeopleMock,
  getPublishedProjects: getPublishedProjectsMock,
  getPublishedStatistics: getPublishedStatisticsMock,
}));

vi.mock('../lib/markdown', () => ({
  renderMarkdown: renderMarkdownMock,
}));

describe('public islands', () => {
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
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    vi.clearAllMocks();
    renderMarkdownMock.mockImplementation(async (markdown: string) => `<p>${markdown}</p>`);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  function remount() {
    act(() => {
      root.unmount();
    });
    root = createRoot(container);
  }

  it('renders live statistics returned from Supabase', async () => {
    getPublishedStatisticsMock.mockResolvedValue({
      data: [{ id: 'stat-1', label: 'Projects', value: '24', icon_name: null, display_order: 1 }],
      error: null,
    });

    await render(<StatsCards />);

    expect(container.textContent).toContain('24');
    expect(container.textContent).toContain('Projects');
    expect(container.querySelector('[aria-label="Projects: 24"]')).not.toBeNull();
  });

  it('falls back to sample statistics when live statistics fail', async () => {
    getPublishedStatisticsMock.mockResolvedValue({ data: [], error: 'network unavailable' });

    await render(<StatsCards />);

    expect(container.textContent).toContain('Live statistics are unavailable');
    expect(container.querySelectorAll('article').length).toBeGreaterThan(0);
  });

  it('renders featured projects from live data', async () => {
    getFeaturedProjectsMock.mockResolvedValue({
      data: [
        {
          id: 'project-1',
          title: 'Forecasting Platform',
          slug: 'forecasting-platform',
          project_status: 'active',
          is_deployed: true,
          image_url: 'https://example.com/forecast.png',
          display_order: 1,
          summary: 'Supports better planning.',
        },
      ],
      error: null,
    });

    await render(<FeaturedProjects />);

    expect(container.textContent).toContain('Forecasting Platform');
    expect(container.textContent).toContain('Supports better planning.');
    expect(container.querySelector('a')?.getAttribute('href')).toContain(
      '/projects/detail/?slug=forecasting-platform'
    );
  });

  it('renders project list warning and sample content when live data errors', async () => {
    getPublishedProjectsMock.mockResolvedValue({ data: [], error: 'RLS denied' });

    await render(<ProjectList />);

    expect(container.textContent).toContain('Live project data is temporarily unavailable');
    expect(container.querySelectorAll('a').length).toBeGreaterThan(0);
  });

  it('renders published news cards with dates and authors', async () => {
    getPublishedNewsMock.mockResolvedValue({
      data: [
        {
          id: 'news-1',
          title: 'New Lab Launch',
          slug: 'new-lab-launch',
          summary: 'Launch summary',
          featured_image_url: 'https://example.com/news.png',
          author_name: 'SDG AI Lab',
          publish_date: '2026-07-15',
        },
      ],
      error: null,
    });

    await render(<NewsList />);

    expect(container.textContent).toContain('New Lab Launch');
    expect(container.textContent).toContain('Launch summary');
    expect(container.textContent).toContain('SDG AI Lab');
    expect(container.textContent).toContain('July 15, 2026');
    expect(container.querySelector('a')?.getAttribute('href')).toContain(
      '/news/detail/?slug=new-lab-launch'
    );
  });

  it('renders people, empty, and error states', async () => {
    getPublishedPeopleMock.mockResolvedValueOnce({
      data: [
        {
          id: 'person-1',
          name: 'Ada Lovelace',
          role_title: 'Research Lead',
          photo_url: null,
          biography: 'Works on AI for development.',
          display_order: 1,
        },
      ],
      error: null,
    });

    await render(<PeopleGrid groupType="team" />);

    expect(container.textContent).toContain('Ada Lovelace');
    expect(container.textContent).toContain('Research Lead');
    expect(container.textContent).toContain('Works on AI for development.');

    remount();
    getPublishedPeopleMock.mockResolvedValueOnce({ data: [], error: null });
    await render(<PeopleGrid groupType="team" />);
    expect(container.textContent).toContain('No members listed yet.');

    remount();
    getPublishedPeopleMock.mockResolvedValueOnce({ data: [], error: 'failed' });
    await render(<PeopleGrid groupType="team" />);
    expect(container.textContent).toContain('Unable to load team information');
  });

  it('renders partner logos and falls back to names when an image fails', async () => {
    getPublishedPartnersMock.mockResolvedValue({
      data: [
        {
          id: 'partner-1',
          name: 'Partner One',
          logo_url: 'https://example.com/logo.png',
          website_url: 'https://partner.example',
          display_order: 1,
        },
        {
          id: 'partner-2',
          name: 'Partner Two',
          logo_url: null,
          website_url: 'https://partner-two.example',
          display_order: 2,
        },
      ],
      error: null,
    });

    await render(<PartnerLogos />);

    const image = container.querySelector('img') as HTMLImageElement;
    expect(image.getAttribute('alt')).toBe('Partner One');
    expect(container.textContent).toContain('Partner Two');

    act(() => {
      image.dispatchEvent(new Event('error', { bubbles: true }));
    });

    expect(image.style.display).toBe('none');
  });

  it('renders page content from markdown and handles empty/error states', async () => {
    getPageContentMock.mockResolvedValueOnce({
      data: { id: 'content-1', body: '**About** body' },
      error: null,
    });

    await render(<PageContent pageSlug="about" sectionSlug="intro" />);

    expect(renderMarkdownMock).toHaveBeenCalledWith('**About** body');
    expect(container.innerHTML).toContain('<p>**About** body</p>');

    remount();
    getPageContentMock.mockResolvedValueOnce({ data: null, error: null });
    await render(<PageContent pageSlug="about" sectionSlug="our-approach" />);
    expect(renderMarkdownMock).toHaveBeenCalledWith(
      expect.stringContaining('one-stop solution approach')
    );

    remount();
    getPageContentMock.mockResolvedValueOnce({ data: null, error: null });
    await render(<PageContent pageSlug="about" sectionSlug="missing" />);
    expect(container.textContent).toContain('No content available yet.');

    remount();
    getPageContentMock.mockResolvedValueOnce({ data: null, error: 'failed' });
    await render(<PageContent pageSlug="about" sectionSlug="intro" />);
    expect(container.textContent).toContain('Unable to load content');
  });
});
