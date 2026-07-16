import { expect, test } from '@playwright/test';

test.describe('CMS-driven static pages', () => {
  test('about page hydrates page content sections', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByText(/established in 2019/i).first()).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByText(/one-stop solution approach/i)).toBeVisible({
      timeout: 15_000,
    });
  });

  test('volunteer page hydrates page content', async ({ page }) => {
    await page.goto('/volunteer/');
    await expect(page.getByText(/Volunteer Data Scientist Initiative/i)).toBeVisible({
      timeout: 15_000,
    });
  });

  test('team page finishes loading people grid', async ({ page }) => {
    await page.goto('/team/');
    await expect(page.getByRole('status', { name: 'Loading' })).toBeHidden({
      timeout: 15_000,
    });
    await expect(
      page.getByText(/No members listed yet|Unable to load team information/i)
    ).toBeVisible();
  });
});
