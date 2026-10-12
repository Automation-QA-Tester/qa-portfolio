const { test, expect } = require("@playwright/test");

test.describe("Todo list keyboard focus", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("username-input").fill("demo");
    await page.getByTestId("password-input").fill("demo-password");
    await page.getByTestId("login-button").click();

    for (const text of ["First task", "Second task", "Third task"]) {
      await page.getByTestId("todo-input").fill(text);
      await page.getByTestId("todo-add-button").click();
    }
  });

  test("keeps focus on the checkbox after it is checked", async ({ page }) => {
    await page.getByTestId("todo-checkbox").nth(2).focus();
    await page.keyboard.press("Space");

    await expect(page.getByTestId("todo-checkbox").nth(2)).toBeChecked();
    await expect(page.getByTestId("todo-checkbox").nth(2)).toBeFocused();
  });

  test("keeps focus on the checkbox after it is unchecked", async ({ page }) => {
    await page.getByTestId("todo-checkbox").nth(2).focus();
    await page.keyboard.press("Space");
    await expect(page.getByTestId("todo-checkbox").nth(2)).toBeChecked();

    await page.getByTestId("todo-checkbox").nth(2).focus();
    await page.keyboard.press("Space");

    await expect(page.getByTestId("todo-checkbox").nth(2)).not.toBeChecked();
    await expect(page.getByTestId("todo-checkbox").nth(2)).toBeFocused();
  });

  test("moves focus to the next task after a task is deleted", async ({ page }) => {
    await page.getByTestId("todo-delete-button").nth(1).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByTestId("todo-checkbox").nth(1)).toBeFocused();
  });

  test("moves focus to the previous task after the last task is deleted", async ({ page }) => {
    await page.getByTestId("todo-delete-button").nth(2).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByTestId("todo-checkbox").nth(1)).toBeFocused();
  });

  test("moves focus to the new task field after the last remaining task is deleted", async ({ page }) => {
    for (let remaining = 3; remaining > 0; remaining--) {
      await page.getByTestId("todo-delete-button").first().focus();
      await page.keyboard.press("Enter");
      await expect(page.getByTestId("todo-item")).toHaveCount(remaining - 1);
    }

    await expect(page.getByTestId("todo-input")).toBeFocused();
  });
});
