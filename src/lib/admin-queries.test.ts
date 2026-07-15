import { beforeEach, describe, expect, it, vi } from 'vitest';

const { runProtectedAdminActionMock, fromMock, getSupabaseAuthMock } = vi.hoisted(() => ({
  runProtectedAdminActionMock: vi.fn(
    async <T>(_config: unknown, action: () => Promise<T> | T) => await action()
  ),
  fromMock: vi.fn(),
  getSupabaseAuthMock: vi.fn(),
}));

getSupabaseAuthMock.mockImplementation(() => ({
  from: fromMock,
}));

vi.mock('./admin-security', () => ({
  runProtectedAdminAction: runProtectedAdminActionMock,
}));

vi.mock('./supabase-auth', () => ({
  getSupabaseAuth: getSupabaseAuthMock,
}));

import {
  archiveProject,
  createNewsArticle,
  createPageContent,
  createPartner,
  createProject,
  deletePartner,
  getDashboardCounts,
  updateStatistic,
} from './admin-queries';

function createInsertBuilder(returnData: unknown, returnError: { message: string } | null = null) {
  return {
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: returnData, error: returnError }),
    eq: vi.fn().mockReturnThis(),
  };
}

function createListBuilder(returnData: unknown, returnError: { message: string } | null = null) {
  return {
    select: vi.fn().mockResolvedValue({ data: returnData, error: returnError }),
  };
}

describe('admin-queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects invalid project slugs before hitting Supabase', async () => {
    const result = await createProject({
      title: 'Demo Project',
      slug: 'Bad Slug',
      description: 'Description',
      project_status: 'active',
      is_deployed: false,
      is_featured: false,
      image_url: 'https://example.com/image.png',
      display_order: 1,
      status: 'draft',
      published_at: null,
    });

    expect(result.data).toBeNull();
    expect(result.error).toContain('Slug must use lowercase letters, numbers, and hyphens only.');
    expect(fromMock).not.toHaveBeenCalled();
  });

  it('rejects invalid publish dates for news articles', async () => {
    const result = await createNewsArticle({
      title: 'News',
      slug: 'news-item',
      body: 'Body',
      summary: 'Summary',
      featured_image_url: 'https://example.com/news.png',
      author_name: 'Author',
      publish_date: '2026-13-99',
      status: 'draft',
      published_at: null,
    });

    expect(result.data).toBeNull();
    expect(result.error).toContain('Publish date must be a valid date in YYYY-MM-DD format.');
    expect(fromMock).not.toHaveBeenCalled();
  });

  it('rejects invalid partner website URLs', async () => {
    const result = await createPartner({
      name: 'Partner',
      logo_url: 'https://example.com/logo.png',
      website_url: 'javascript:alert(1)',
      display_order: 2,
      status: 'draft',
      published_at: null,
    });

    expect(result.data).toBeNull();
    expect(result.error).toContain('Website URL must use http or https.');
    expect(fromMock).not.toHaveBeenCalled();
  });

  it('adds published_at when creating published page content', async () => {
    const builder = createInsertBuilder({ id: 'page-1' });
    fromMock.mockReturnValue(builder);

    const result = await createPageContent({
      page_slug: 'about',
      section_slug: 'mission-statement',
      body: 'Hello world',
      status: 'published',
      published_at: null,
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({ id: 'page-1' });
    expect(fromMock).toHaveBeenCalledWith('page_content');
    expect(builder.insert).toHaveBeenCalledTimes(1);

    const insertedPayload = builder.insert.mock.calls[0][0] as { published_at: string; page_slug: string };
    expect(insertedPayload.page_slug).toBe('about');
    expect(insertedPayload.published_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('updates statistics after validation and uses protected mutation wrapper', async () => {
    const builder = createInsertBuilder({ id: 'stat-1', label: 'Projects' });
    fromMock.mockReturnValue(builder);

    const result = await updateStatistic('stat-1', {
      label: ' Projects ',
      value: ' 42 ',
      icon_name: ' rocket ',
      display_order: 0,
      status: 'draft',
      published_at: null,
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({ id: 'stat-1', label: 'Projects' });
    expect(runProtectedAdminActionMock).toHaveBeenCalled();
    expect(builder.update).toHaveBeenCalledWith({
      label: 'Projects',
      value: '42',
      icon_name: 'rocket',
      display_order: 0,
      status: 'draft',
      published_at: null,
    });
    expect(builder.eq).toHaveBeenCalledWith('id', 'stat-1');
    expect(runProtectedAdminActionMock).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'update:statistics', message: expect.stringContaining('Too many admin changes') }),
      expect.any(Function)
    );
  });

  it('archives and deletes through protected destructive actions', async () => {
    const archiveBuilder = createInsertBuilder(null, null);
    const deleteBuilder = createInsertBuilder(null, null);
    fromMock
      .mockReturnValueOnce(archiveBuilder)
      .mockReturnValueOnce(deleteBuilder);

    const archiveResult = await archiveProject('project-1');
    const deleteResult = await deletePartner('partner-1');

    expect(archiveResult).toEqual({ data: { id: 'project-1' }, error: null });
    expect(deleteResult).toEqual({ data: { id: 'partner-1' }, error: null });
    expect(archiveBuilder.update).toHaveBeenCalledWith({ status: 'archived' });
    expect(deleteBuilder.delete).toHaveBeenCalled();
    expect(runProtectedAdminActionMock).toHaveBeenCalledTimes(2);
    expect(runProtectedAdminActionMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ key: 'archive:projects', message: expect.stringContaining('destructive') }),
      expect.any(Function)
    );
    expect(runProtectedAdminActionMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ key: 'delete:partners', message: expect.stringContaining('destructive') }),
      expect.any(Function)
    );
  });

  it('computes dashboard counts from table statuses', async () => {
    fromMock
      .mockReturnValueOnce(createListBuilder([{ status: 'draft' }, { status: 'published' }]))
      .mockReturnValueOnce(createListBuilder([{ status: 'published' }]))
      .mockReturnValueOnce(createListBuilder([{ status: 'archived' }, { status: 'archived' }]))
      .mockReturnValueOnce(createListBuilder([]))
      .mockReturnValueOnce(createListBuilder([{ status: 'draft' }, { status: 'draft' }]))
      .mockReturnValueOnce(createListBuilder([{ status: 'published' }, { status: 'archived' }]));

    const result = await getDashboardCounts();

    expect(result.error).toBeNull();
    expect(result.data.statistics).toEqual({ total: 2, draft: 1, published: 1, archived: 0 });
    expect(result.data.projects).toEqual({ total: 1, draft: 0, published: 1, archived: 0 });
    expect(result.data.news_articles).toEqual({ total: 2, draft: 0, published: 0, archived: 2 });
    expect(result.data.people).toEqual({ total: 0, draft: 0, published: 0, archived: 0 });
    expect(result.data.partners).toEqual({ total: 2, draft: 2, published: 0, archived: 0 });
    expect(result.data.page_content).toEqual({ total: 2, draft: 0, published: 1, archived: 1 });
  });

  it('returns Supabase mutation errors without hiding them', async () => {
    const builder = createInsertBuilder(null, { message: 'duplicate key value violates unique constraint' });
    fromMock.mockReturnValue(builder);

    const result = await createProject({
      title: 'Demo Project',
      slug: 'demo-project',
      description: 'Description',
      project_status: 'active',
      is_deployed: false,
      is_featured: false,
      image_url: 'https://example.com/image.png',
      display_order: 1,
      status: 'draft',
      published_at: null,
    });

    expect(result.data).toBeNull();
    expect(result.error).toContain('duplicate key value violates unique constraint');
  });

  it('returns dashboard query errors immediately', async () => {
    fromMock.mockReturnValueOnce(createListBuilder(null, { message: 'permission denied for table statistics' }));

    const result = await getDashboardCounts();

    expect(result.error).toBe('permission denied for table statistics');
    expect(result.data).toEqual({});
  });
});
