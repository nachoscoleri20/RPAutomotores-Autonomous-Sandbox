import { test, expect } from "@playwright/test";

test("demo pública local y paneles deshabilitados", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  for (const route of ["/admin", "/vendedor"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  }
});
