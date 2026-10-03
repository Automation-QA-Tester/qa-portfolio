const { test, expect } = require("@playwright/test");

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows an error when both fields are empty", async ({ page }) => {
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-message")).toHaveText(
      "Username and password are required."
    );
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    await page.getByTestId("username-input").fill("demo");
    await page.getByTestId("password-input").fill("wrong-password");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-message")).toHaveText(
      "Invalid username or password."
    );
  });

  test("logs in with valid credentials", async ({ page }) => {
    await page.getByTestId("username-input").fill("demo");
    await page.getByTestId("password-input").fill("demo-password");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("welcome-heading")).toHaveText("Welcome, demo!");
    await expect(page.getByTestId("login-button")).toBeHidden();
  });

  test("logs out and shows the login form again", async ({ page }) => {
    await page.getByTestId("username-input").fill("demo");
    await page.getByTestId("password-input").fill("demo-password");
    await page.getByTestId("login-button").click();
    await page.getByTestId("logout-button").click();

    await expect(page.getByTestId("login-button")).toBeVisible();
    await expect(page.getByTestId("welcome-heading")).toBeHidden();
  });
});
