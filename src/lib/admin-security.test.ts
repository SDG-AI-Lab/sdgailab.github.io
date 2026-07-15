import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./supabase-auth', () => ({
  getSupabaseAuth: () => ({
    auth: {
      getSession: vi.fn(),
    },
    from: vi.fn(),
  }),
}));

import {
  clearAuthorizedAdminCache,
  consumeRateLimit,
  formatRetryDelay,
  normalizeAdminEmail,
} from './admin-security';

describe('admin-security helpers', () => {
  beforeEach(() => {
    vi.useRealTimers();
    clearAuthorizedAdminCache();
  });

  it('normalizes admin emails', () => {
    expect(normalizeAdminEmail('  Person@Example.COM ')).toBe('person@example.com');
  });

  it('formats retry delays in seconds and minutes', () => {
    expect(formatRetryDelay(1500)).toBe('2 seconds');
    expect(formatRetryDelay(61_000)).toBe('2 minutes');
  });

  it('allows requests until the rate limit is reached', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T00:00:00Z'));

    const config = {
      key: 'test-limit',
      limit: 2,
      windowMs: 60_000,
      message: 'Too many requests.',
    };

    expect(consumeRateLimit(config)).toEqual({ allowed: true });
    expect(consumeRateLimit(config)).toEqual({ allowed: true });

    const blocked = consumeRateLimit(config);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.error).toContain('Too many requests.');
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it('applies cooldowns between rapid requests', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-15T00:00:00Z'));

    const config = {
      key: 'test-cooldown',
      limit: 10,
      windowMs: 60_000,
      cooldownMs: 5_000,
      message: 'Slow down.',
    };

    expect(consumeRateLimit(config)).toEqual({ allowed: true });

    const blocked = consumeRateLimit(config);
    expect(blocked.allowed).toBe(false);
    if (!blocked.allowed) {
      expect(blocked.error).toContain('Slow down.');
      expect(blocked.retryAfterMs).toBeGreaterThan(0);
    }
  });
});
