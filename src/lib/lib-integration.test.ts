// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { fromMock, getSupabaseAuthMock, getSupabaseMock } = vi.hoisted(() => ({
  fromMock: vi.fn(),
  getSupabaseAuthMock: vi.fn(),
  getSupabaseMock: vi.fn(),
}));

getSupabaseAuthMock.mockImplementation(() => ({ from: fromMock }));
getSupabaseMock.mockImplementation(() => ({ from: fromMock }));

vi.mock('./supabase-auth', () => ({
  getSupabaseAuth: getSupabaseAuthMock,
}));

vi.mock('./supabase', () => ({
  getSupabase: getSupabaseMock,
  isSupabaseConfigured: true,
}));

import { listProjects } from './admin-queries';
import { consumeRateLimit, formatRetryDelay, normalizeAdminEmail } from './admin-security';
import { renderMarkdown } from './markdown';
import { getPublishedProjects } from './queries';
import { withBase } from './url';

function createPublicProjectsBuilder(data: Record<string, unknown>[]) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data, error: null }),
  };
}

function createAdminProjectsBuilder(data: Record<string, unknown>[]) {
  return {
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data, error: null }),
  };
}

describe('lib integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('normalizes admin emails before applying login rate limits', () => {
    const email = normalizeAdminEmail('  Editor@Example.org ');
    const first = consumeRateLimit({
      key: `admin-login:${email}`,
      limit: 3,
      windowMs: 15 * 60 * 1000,
      message: 'Too many sign-in requests.',
    });

    expect(first.allowed).toBe(true);
    expect(email).toBe('editor@example.org');
    expect(formatRetryDelay(45_000)).toContain('second');
  });

  it('renders markdown and preserves base-path aware links', async () => {
    const html = await renderMarkdown('Read more at [projects](/projects).');
    expect(html).toContain('projects');
    expect(withBase('/projects')).toMatch(/\/projects\/?$/);
  });

  it('loads public and admin project collections through the same Supabase client', async () => {
    const publicRow = {
      id: 'project-public',
      title: 'Public Project',
      slug: 'public-project',
      project_status: 'active',
      is_deployed: true,
      image_url: null,
      display_order: 1,
    };
    const adminRow = {
      id: 'project-admin',
      title: 'Admin Project',
      slug: 'admin-project',
      description: 'Admin listing row',
      project_status: 'active',
      is_deployed: false,
      is_featured: false,
      image_url: null,
      display_order: 2,
      status: 'published',
    };

    fromMock
      .mockReturnValueOnce(createPublicProjectsBuilder([publicRow]))
      .mockReturnValueOnce(createAdminProjectsBuilder([adminRow]));

    const publicResult = await getPublishedProjects();
    const adminResult = await listProjects();

    expect(getSupabaseMock).toHaveBeenCalled();
    expect(getSupabaseAuthMock).toHaveBeenCalled();
    expect(publicResult.data[0]?.slug).toBe('public-project');
    expect(adminResult.data[0]?.slug).toBe('admin-project');
  });
});
