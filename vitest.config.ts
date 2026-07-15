import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      include: ['src/lib/**/*.ts', 'src/islands/**/*.tsx'],
      exclude: [
        'src/**/*.d.ts',
        'src/lib/supabase.ts',
        'src/lib/supabase-auth.ts',
      ],
    },
  },
});
