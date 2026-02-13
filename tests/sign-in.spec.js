const { test, expect } = require('@playwright/test');

const EMAIL = 'qa.user@example.com';
const PASSWORD = 'InvalidPassword123!';

test.describe('DevMarket sign-in', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('should render sign-in form fields and action', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/required|invalid|email|password/i);
  });

  test('should reject invalid credentials and keep user on sign-in page', async ({ page }) => {
    await page.getByRole('textbox', { name: /email/i }).fill(EMAIL);
    await page.getByPlaceholder(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/sign-in/);
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/invalid|incorrect|not found|error/i);
  });
});
