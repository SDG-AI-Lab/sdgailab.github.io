// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

const authState = vi.hoisted(() => ({
  session: null as { user: { email: string } } | null,
  loading: true,
}));

vi.mock('./AuthProvider', () => ({
  useAuth: () => authState,
}));

import AuthCallback from './AuthCallback';

describe('AuthCallback', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    authState.session = null;
    authState.loading = true;
    window.location.hash = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.useRealTimers();
  });

  async function renderCallback() {
    await act(async () => {
      root.render(<AuthCallback />);
    });
    await act(async () => {
      await Promise.resolve();
    });
  }

  it('shows an error when the callback hash has no auth tokens', async () => {
    window.location.hash = '#/login';
    await renderCallback();

    expect(container.textContent).toContain('Invalid or expired link');
    expect(container.querySelector('a[href="#/login"]')).not.toBeNull();
  });

  it('shows a loading state while auth tokens are being processed', async () => {
    window.location.hash = '#access_token=test-token&type=magiclink';
    await renderCallback();

    expect(container.textContent).toContain('Signing you in...');
    expect(container.querySelector('.animate-spin')).not.toBeNull();
  });

  it('redirects to the dashboard when a session becomes available', async () => {
    window.location.hash = '#access_token=test-token&refresh_token=refresh';
    await renderCallback();

    authState.session = { user: { email: 'editor@example.org' } };
    authState.loading = false;

    await act(async () => {
      root.render(<AuthCallback />);
      await Promise.resolve();
    });

    expect(window.location.hash).toBe('#/');
  });

  it('redirects after a timeout when loading completes without a session', async () => {
    window.location.hash = '#access_token=test-token';
    await renderCallback();

    authState.loading = false;

    await act(async () => {
      root.render(<AuthCallback />);
      await Promise.resolve();
    });

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(window.location.hash).toBe('#/');
  });
});
