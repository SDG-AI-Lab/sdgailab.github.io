// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

const {
  listNewsArticlesMock,
  archiveNewsArticleMock,
  deleteNewsArticleMock,
  showToastMock,
} = vi.hoisted(() => ({
  listNewsArticlesMock: vi.fn(),
  archiveNewsArticleMock: vi.fn(),
  deleteNewsArticleMock: vi.fn(),
  showToastMock: vi.fn(),
}));

let latestTableProps: any = null;

vi.mock('../../../lib/admin-queries', () => ({
  listNewsArticles: listNewsArticlesMock,
  archiveNewsArticle: archiveNewsArticleMock,
  deleteNewsArticle: deleteNewsArticleMock,
}));

vi.mock('../layout/Toast', () => ({
  useToast: () => ({ showToast: showToastMock }),
}));

vi.mock('../shared/ContentTable', () => ({
  ContentTable: (props: any) => {
    latestTableProps = props;
    return <div>{props.error ?? `rows:${props.data.length}`}</div>;
  },
}));

vi.mock('../shared/ConfirmDialog', () => ({
  ConfirmDialog: (props: any) =>
    props.isOpen ? <button type="button" onClick={props.onConfirm}>Confirm Delete</button> : null,
}));

import NewsListPage from './NewsListPage';

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe('NewsListPage', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    latestTableProps = null;
    listNewsArticlesMock.mockResolvedValue({
      data: [{ id: 'news-1', title: 'Article', author_name: 'Author', publish_date: '2026-07-15', status: 'draft' }],
      error: null,
    });
    archiveNewsArticleMock.mockResolvedValue({ error: null });
    deleteNewsArticleMock.mockResolvedValue({ error: null });

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('loads articles into the table', async () => {
    await act(async () => {
      root.render(<NewsListPage />);
    });
    await flushEffects();

    expect(listNewsArticlesMock).toHaveBeenCalled();
    expect(latestTableProps.data).toHaveLength(1);
  });

  it('archives an article', async () => {
    await act(async () => {
      root.render(<NewsListPage />);
    });
    await flushEffects();

    await act(async () => {
      await latestTableProps.onArchive('news-1');
    });
    await flushEffects();

    expect(archiveNewsArticleMock).toHaveBeenCalledWith('news-1');
    expect(showToastMock).toHaveBeenCalledWith('Article archived', 'success');
  });

  it('deletes an article after confirmation', async () => {
    await act(async () => {
      root.render(<NewsListPage />);
    });
    await flushEffects();

    act(() => latestTableProps.onDelete('news-1'));

    const confirmButton = container.querySelector('button') as HTMLButtonElement;

    await act(async () => {
      confirmButton.click();
    });
    await flushEffects();

    expect(deleteNewsArticleMock).toHaveBeenCalledWith('news-1');
    expect(showToastMock).toHaveBeenCalledWith('Article deleted permanently', 'success');
  });
});
