// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

const {
  listPartnersMock,
  archivePartnerMock,
  deletePartnerMock,
  showToastMock,
} = vi.hoisted(() => ({
  listPartnersMock: vi.fn(),
  archivePartnerMock: vi.fn(),
  deletePartnerMock: vi.fn(),
  showToastMock: vi.fn(),
}));

let latestTableProps: any = null;

vi.mock('../../../lib/admin-queries', () => ({
  listPartners: listPartnersMock,
  archivePartner: archivePartnerMock,
  deletePartner: deletePartnerMock,
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

import PartnersListPage from './PartnersListPage';

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe('PartnersListPage', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    latestTableProps = null;
    listPartnersMock.mockResolvedValue({
      data: [{ id: 'partner-1', name: 'UNDP', logo_url: null, website_url: 'https://undp.org', status: 'draft', display_order: 1 }],
      error: null,
    });
    archivePartnerMock.mockResolvedValue({ error: null });
    deletePartnerMock.mockResolvedValue({ error: null });

    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('loads partners into the table', async () => {
    await act(async () => {
      root.render(<PartnersListPage />);
    });
    await flushEffects();

    expect(listPartnersMock).toHaveBeenCalled();
    expect(latestTableProps.data).toHaveLength(1);
  });

  it('archives a partner', async () => {
    await act(async () => {
      root.render(<PartnersListPage />);
    });
    await flushEffects();

    await act(async () => {
      await latestTableProps.onArchive('partner-1');
    });
    await flushEffects();

    expect(archivePartnerMock).toHaveBeenCalledWith('partner-1');
    expect(showToastMock).toHaveBeenCalledWith('Partner archived', 'success');
  });

  it('deletes a partner after confirmation', async () => {
    await act(async () => {
      root.render(<PartnersListPage />);
    });
    await flushEffects();

    act(() => latestTableProps.onDelete('partner-1'));

    const confirmButton = container.querySelector('button') as HTMLButtonElement;

    await act(async () => {
      confirmButton.click();
    });
    await flushEffects();

    expect(deletePartnerMock).toHaveBeenCalledWith('partner-1');
    expect(showToastMock).toHaveBeenCalledWith('Partner deleted permanently', 'success');
  });
});
