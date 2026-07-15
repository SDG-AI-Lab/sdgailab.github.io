import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getSupabaseMock } = vi.hoisted(() => ({
  getSupabaseMock: vi.fn(),
}));

type QueryRow = Record<string, unknown> | null;

function createCollectionBuilder(data: QueryRow[] | null, error: { message: string } | null = null) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data, error }),
  };
}

function createSingleBuilder(data: QueryRow, error: { message: string } | null = null) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data, error }),
  };
}

async function loadQueriesModule(configured: boolean) {
  vi.resetModules();
  vi.doMock('./supabase', () => ({
    getSupabase: getSupabaseMock,
    isSupabaseConfigured: configured,
  }));
  return await import('./queries');
}

describe('queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty published statistics when Supabase is not configured', async () => {
    const { getPublishedStatistics } = await loadQueriesModule(false);

    const result = await getPublishedStatistics();

    expect(result).toEqual({ data: [], error: null });
    expect(getSupabaseMock).not.toHaveBeenCalled();
  });

  it('loads featured projects with the expected published filters', async () => {
    const builder = createCollectionBuilder([{ id: 'p1', title: 'Project One' }]);
    getSupabaseMock.mockReturnValue({
      from: vi.fn().mockReturnValue(builder),
    });
    const { getFeaturedProjects } = await loadQueriesModule(true);

    const result = await getFeaturedProjects();

    expect(result.error).toBeNull();
    expect(result.data).toEqual([{ id: 'p1', title: 'Project One' }]);
    expect(builder.eq).toHaveBeenNthCalledWith(1, 'status', 'published');
    expect(builder.eq).toHaveBeenNthCalledWith(2, 'is_featured', true);
    expect(builder.order).toHaveBeenCalledWith('display_order', { ascending: true });
  });

  it('returns project lookup errors cleanly', async () => {
    const builder = createSingleBuilder(null, { message: 'row level security denied' });
    getSupabaseMock.mockReturnValue({
      from: vi.fn().mockReturnValue(builder),
    });
    const { getProjectBySlug } = await loadQueriesModule(true);

    const result = await getProjectBySlug('demo-project');

    expect(result).toEqual({ data: null, error: 'row level security denied' });
    expect(builder.eq).toHaveBeenNthCalledWith(1, 'slug', 'demo-project');
    expect(builder.eq).toHaveBeenNthCalledWith(2, 'status', 'published');
  });

  it('returns published news ordered by descending publish date', async () => {
    const builder = createCollectionBuilder([{ id: 'n1', title: 'News One' }]);
    getSupabaseMock.mockReturnValue({
      from: vi.fn().mockReturnValue(builder),
    });
    const { getPublishedNews } = await loadQueriesModule(true);

    const result = await getPublishedNews();

    expect(result.error).toBeNull();
    expect(result.data).toEqual([{ id: 'n1', title: 'News One' }]);
    expect(builder.order).toHaveBeenCalledWith('publish_date', { ascending: false });
  });

  it('passes through people group filters for published people', async () => {
    const builder = createCollectionBuilder([{ id: 'person-1', name: 'Ada' }]);
    getSupabaseMock.mockReturnValue({
      from: vi.fn().mockReturnValue(builder),
    });
    const { getPublishedPeople } = await loadQueriesModule(true);

    const result = await getPublishedPeople('team');

    expect(result.error).toBeNull();
    expect(builder.eq).toHaveBeenNthCalledWith(1, 'status', 'published');
    expect(builder.eq).toHaveBeenNthCalledWith(2, 'group_type', 'team');
  });

  it('returns page content and preserves null when no row matches', async () => {
    const builder = createSingleBuilder(null, null);
    getSupabaseMock.mockReturnValue({
      from: vi.fn().mockReturnValue(builder),
    });
    const { getPageContent } = await loadQueriesModule(true);

    const result = await getPageContent('home', 'hero');

    expect(result).toEqual({ data: null, error: null });
    expect(builder.eq).toHaveBeenNthCalledWith(1, 'page_slug', 'home');
    expect(builder.eq).toHaveBeenNthCalledWith(2, 'section_slug', 'hero');
    expect(builder.eq).toHaveBeenNthCalledWith(3, 'status', 'published');
  });
});
