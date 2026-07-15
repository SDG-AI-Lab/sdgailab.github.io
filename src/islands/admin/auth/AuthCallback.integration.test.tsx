// @vitest-environment jsdom

import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type SessionLike = { user: { email?: string | null } } | null;
type AuthCallback = (event: string, session: SessionLike) => void;

const {
  getAuthorizedAdminMock,
  clearAuthorizedAdminCacheMock,
  normalizeAdminEmailMock,
  signOutMock,
  getSessionMock,
  onAuthStateChangeMock,
  subscriptionUnsubscribeMock,
} = vi.hoisted(() => ({
  getAuthorizedAdminMock: vi.fn(),
  clearAuthorizedAdminCacheMock: vi.fn(),
  normalizeAdminEmailMock: vi.fn((email: string) => email.trim().toLowerCase()),
  signOutMock: vi.fn().mockResolvedValue({ error: null }),
  getSessionMock: vi.fn(),
  onAuthStateChangeMock: vi.fn(),
  subscriptionUnsubscribeMock: vi.fn(),
}));

let authStateChangeCallback: AuthCallback | null = null;

vi.mock('../../../lib/admin-security', () => ({
  getAuthorizedAdmin: getAuthorizedAdminMock,
  clearAuthorizedAdminCache: clearAuthorizedAdminCacheMock,
  normalizeAdminEmail: normalizeAdminEmailMock,
}));

vi.mock('../../../lib/supabase-auth', () => ({
  getSupabaseAuth: () => ({
    auth: {
      signOut: signOutMock,
      getSession: getSessionMock,
      onAuthStateChange: onAuthStateChangeMock,
    },
  }),
}));

import AuthCallback from './AuthCallback';
import { AuthProvider } from './AuthProvider';

describe('AuthCallback (integration)', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    vi.clearAllMocks();
    authStateChangeCallback = null;

    getSessionMock.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    onAuthStateChangeMock.mockImplementation((callback: AuthCallback) => {
      authStateChangeCallback = callback;
      return { data: { subscription: { unsubscribe: subscriptionUnsubscribeMock } } };
    });
    getAuthorizedAdminMock.mockResolvedValue({
      data: { email: 'editor@example.org', role: 'editor' },
      error: null,
    });

    window.location.hash = '#access_token=test-token&refresh_token=refresh&type=magiclink';
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  async function renderCallback() {
    await act(async () => {
      root.render(
        <AuthProvider>
          <AuthCallback />
        </AuthProvider>
      );
    });
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  }

  it('redirects to the dashboard when AuthProvider establishes a session', async () => {
    await renderCallback();
    expect(container.textContent).toContain('Signing you in...');

    await act(async () => {
      authStateChangeCallback?.('SIGNED_IN', {
        user: { email: 'editor@example.org' },
      });
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(window.location.hash).toBe('#/');
  });
});
