// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
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

  it('does not render when closed', async () => {
    await act(async () => {
      root.render(
        <ConfirmDialog
          isOpen={false}
          title="Delete"
          message="Confirm delete"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      );
    });

    expect(container.textContent).toBe('');
  });

  it('calls cancel on overlay click and escape key', async () => {
    const onCancel = vi.fn();

    await act(async () => {
      root.render(
        <ConfirmDialog
          isOpen={true}
          title="Delete"
          message="Confirm delete"
          onConfirm={() => {}}
          onCancel={onCancel}
        />
      );
    });

    const overlay = container.firstElementChild as HTMLElement;

    await act(async () => {
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(onCancel).toHaveBeenCalledTimes(2);
  });

  it('calls confirm and shows loading state', async () => {
    const onConfirm = vi.fn();

    await act(async () => {
      root.render(
        <ConfirmDialog
          isOpen={true}
          title="Delete"
          message="Confirm delete"
          confirmLabel="Delete now"
          onConfirm={onConfirm}
          onCancel={() => {}}
          loading={true}
        />
      );
    });

    const buttons = container.querySelectorAll('button');
    const confirmButton = buttons[1] as HTMLButtonElement;

    expect(confirmButton.disabled).toBe(true);
    expect(confirmButton.textContent).toContain('Delete now');
  });
});
