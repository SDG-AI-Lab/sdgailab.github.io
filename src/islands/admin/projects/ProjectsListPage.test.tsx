// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

const {
  listProjectsMock,
  archiveProjectMock,
  deleteProjectMock,
  showToastMock,
} = vi.hoisted(() => ({
  listProjectsMock: vi.fn(),
  archiveProjectMock: vi.fn(),
  deleteProjectMock: vi.fn(),
  showToastMock: vi.fn(),
}));

let latestTableProps: any = null;
let latestDialogProps: any = null;

vi.mock('../../../lib/admin-queries', () => ({
  listProjects: listProjectsMock,
  archiveProject: archiveProjectMock,
  deleteProject: deleteProjectMock,
}));

vi.mock('../layout/Toast', () => ({
  useToast: () => ({ showToast: showToastMock }),
}));

vi.mock('../shared/ContentTable', () => ({
  ContentTable: (props: any) => {
    latestTableProps = props;
    return <div data-testid="content-table">{props.error ?? `rows:${props.data.length}`}</div>;
  },
}));

vi.mock('../shared/ConfirmDialog', () => ({
  ConfirmDialog: (props: any) => {
    latestDialogProps = props;
    return props.isOpen ? <button type="button" onClick={props.onConfirm}>Confirm Delete</button> : null;
  },
}));

import ProjectsListPage from './ProjectsListPage';

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe('ProjectsListPage', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    latestTableProps = null;
    latestDialogProps = null;
    listProjectsMock.mockResolvedValue({
      data: [{ id: 'project-1', title: 'Project', project_status: 'active', is_featured: false, is_deployed: true, status: 'draft', display_order: 1 }],
      error: null,
    });
    archiveProjectMock.mockResolvedValue({ error: null });
    deleteProjectMock.mockResolvedValue({ error: null });

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('loads projects into the table', async () => {
    await act(async () => {
      root.render(<ProjectsListPage />);
    });
    await flushEffects();

    expect(listProjectsMock).toHaveBeenCalled();
    expect(latestTableProps.data).toHaveLength(1);
  });

  it('archives a project and refreshes the list', async () => {
    await act(async () => {
      root.render(<ProjectsListPage />);
    });
    await flushEffects();

    await act(async () => {
      await latestTableProps.onArchive('project-1');
    });
    await flushEffects();

    expect(archiveProjectMock).toHaveBeenCalledWith('project-1');
    expect(showToastMock).toHaveBeenCalledWith('Project archived', 'success');
    expect(listProjectsMock).toHaveBeenCalledTimes(2);
  });

  it('confirms project deletion and refreshes the list', async () => {
    await act(async () => {
      root.render(<ProjectsListPage />);
    });
    await flushEffects();

    act(() => {
      latestTableProps.onDelete('project-1');
    });

    const confirmButton = container.querySelector('button') as HTMLButtonElement;

    await act(async () => {
      confirmButton.click();
    });
    await flushEffects();

    expect(deleteProjectMock).toHaveBeenCalledWith('project-1');
    expect(showToastMock).toHaveBeenCalledWith('Project deleted permanently', 'success');
    expect(listProjectsMock).toHaveBeenCalledTimes(2);
  });
});
