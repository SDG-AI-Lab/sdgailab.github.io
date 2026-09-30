// @vitest-environment jsdom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import EvolutionTimeline from './EvolutionTimeline';
import HeroProjectSpotlight from './HeroProjectSpotlight';
import LatestActivity from './LatestActivity';
import PortfolioGrid from './PortfolioGrid';
import ResearchOutputs from './ResearchOutputs';

const {
  getFeaturedProjectsMock,
  getPublishedEvolutionTimelineMock,
  getPublishedNewsMock,
  getPublishedProjectsMock,
  getPublishedPublicationsMock,
} = vi.hoisted(() => ({
  getFeaturedProjectsMock: vi.fn(),
  getPublishedEvolutionTimelineMock: vi.fn(),
  getPublishedNewsMock: vi.fn(),
  getPublishedProjectsMock: vi.fn(),
  getPublishedPublicationsMock: vi.fn(),
}));

vi.mock('../lib/queries', () => ({
  getFeaturedProjects: getFeaturedProjectsMock,
  getPublishedEvolutionTimeline: getPublishedEvolutionTimelineMock,
  getPublishedNews: getPublishedNewsMock,
  getPublishedProjects: getPublishedProjectsMock,
  getPublishedPublications: getPublishedPublicationsMock,
}));

describe('Marina public islands (unit)', () => {
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

    getPublishedProjectsMock.mockResolvedValue({ data: [], error: null });
    getPublishedPublicationsMock.mockResolvedValue({ data: [], error: null });
    getPublishedEvolutionTimelineMock.mockResolvedValue({ data: [], error: null });
    getPublishedNewsMock.mockResolvedValue({ data: [], error: null });
    getFeaturedProjectsMock.mockResolvedValue({ data: [], error: null });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('PortfolioGrid maps workstreams and shows an empty portfolio message', async () => {
    getPublishedProjectsMock.mockResolvedValue({
      data: [
        {
          id: 'p1',
          title: 'Flood Mapping',
          slug: 'flood-mapping',
          project_status: 'active',
          is_deployed: true,
          image_url: null,
          display_order: 1,
          summary: 'GIS flood risk tool',
          work_stream: 'GIS & GeoAI',
          project_year: 2024,
          implementation_countries: ['Kazakhstan'],
        },
      ],
      error: null,
    });

    await render(<PortfolioGrid />);
    expect(container.textContent).toContain('Flood Mapping');
    expect(container.textContent).toContain('1 product');

    remountEmpty();
    await render(<PortfolioGrid />);
    expect(container.textContent).toContain('0 products');
    expect(container.textContent).toContain('0 of 0 products shown');
  });

  it('ResearchOutputs maps publication type labels in the empty and populated states', async () => {
    await render(<ResearchOutputs />);
    expect(container.textContent).toContain('All outputs');

    act(() => root.unmount());
    root = createRoot(container);
    getPublishedPublicationsMock.mockResolvedValue({
      data: [
        {
          id: 'pub-1',
          title: 'Climate Brief',
          slug: 'climate-brief',
          publication_type: 'brief_white_paper',
          summary: 'Summary',
          source_url: 'https://example.com/brief',
          cover_image_url: null,
          publication_date: '2024-01-01',
          date_label: null,
          authors: null,
          publisher: null,
          display_order: 1,
        },
      ],
      error: null,
    });
    await render(<ResearchOutputs />);
    expect(container.textContent).toContain('Climate Brief');
    expect(container.textContent).toMatch(/Brief/i);
  });

  it('EvolutionTimeline keeps fallback milestones when live data is empty', async () => {
    await render(<EvolutionTimeline />);
    expect(container.textContent).toContain('Foundations');
    expect(container.textContent).toContain('Mainstreaming');
  });

  it('LatestActivity always exposes discovery routes', async () => {
    await render(<LatestActivity />);
    expect(container.textContent).toContain('Publications');
    expect(container.textContent).toContain('News');
    expect(container.querySelector('a[href*="/resources"]')).not.toBeNull();
    expect(container.querySelector('a[href*="/news"]')).not.toBeNull();
  });

  it('HeroProjectSpotlight shows the lab-value panel when no featured projects exist', async () => {
    await render(<HeroProjectSpotlight />);
    expect(container.textContent).toContain('Lorem ipsum dolor sit amet');
    expect(container.getAttribute('aria-label') ?? container.querySelector('[aria-label]')?.getAttribute('aria-label')).toMatch(
      /Hero visual summary/i
    );
  });

  function remountEmpty() {
    act(() => root.unmount());
    root = createRoot(container);
    getPublishedProjectsMock.mockResolvedValue({ data: [], error: null });
  }
});
