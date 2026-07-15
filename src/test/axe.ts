import { axe, toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';

expect.extend(toHaveNoViolations);

export async function expectAccessible(container: HTMLElement) {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}
