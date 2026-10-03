const { test, expect } = require("@playwright/test");

async function login(page) {
  await page.goto("/");
  await page.getByTestId("username-input").fill("demo");
  await page.getByTestId("password-input").fill("demo-password");
  await page.getByTestId("login-button").click();
}

async function addTask(page, text) {
  await page.getByTestId("todo-input").fill(text);
  await page.getByTestId("todo-add-button").click();
}

test.describe("Todo list", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("shows an empty state when there are no tasks", async ({ page }) => {
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
    await expect(page.getByTestId("todo-counter")).toHaveText("No tasks yet.");
  });

  test("adds a task", async ({ page }) => {
    await addTask(page, "Buy milk");

    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByTestId("todo-text")).toHaveText("Buy milk");
    await expect(page.getByTestId("todo-input")).toHaveValue("");
    await expect(page.getByTestId("todo-counter")).toHaveText("1 task left");
  });

  test("shows an error when the task is empty", async ({ page }) => {
    await page.getByTestId("todo-add-button").click();

    await expect(page.getByTestId("todo-error")).toHaveText("Task cannot be empty.");
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });

  test("shows an error when the task contains only spaces", async ({ page }) => {
    await addTask(page, "     ");

    await expect(page.getByTestId("todo-error")).toHaveText("Task cannot be empty.");
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });

  test("accepts a task with exactly 100 characters", async ({ page }) => {
    await addTask(page, "a".repeat(100));

    await expect(page.getByTestId("todo-error")).toHaveText("");
    await expect(page.getByTestId("todo-item")).toHaveCount(1);
  });

  test("rejects a task with 101 characters", async ({ page }) => {
    await addTask(page, "a".repeat(101));

    await expect(page.getByTestId("todo-error")).toHaveText(
      "Task is too long (max 100 characters)."
    );
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });

  test("marks a task as done and unmarks it again", async ({ page }) => {
    await addTask(page, "Buy milk");
    const item = page.getByTestId("todo-item");

    await page.getByTestId("todo-checkbox").click();
    await expect(page.getByTestId("todo-checkbox")).toBeChecked();
    await expect(item).toHaveClass(/completed/);
    await expect(page.getByTestId("todo-counter")).toHaveText("0 tasks left");

    await page.getByTestId("todo-checkbox").click();
    await expect(page.getByTestId("todo-checkbox")).not.toBeChecked();
    await expect(item).not.toHaveClass(/completed/);
    await expect(page.getByTestId("todo-counter")).toHaveText("1 task left");
  });

  test("updates the counter when several tasks are added", async ({ page }) => {
    await addTask(page, "First task");
    await addTask(page, "Second task");

    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByTestId("todo-counter")).toHaveText("2 tasks left");
  });

  test("deletes a task", async ({ page }) => {
    await addTask(page, "First task");
    await addTask(page, "Second task");

    await page.getByTestId("todo-delete-button").first().click();

    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByTestId("todo-text")).toHaveText("Second task");
    await expect(page.getByTestId("todo-counter")).toHaveText("1 task left");
  });

  test("clears the tasks after logout and login", async ({ page }) => {
    await addTask(page, "Buy milk");

    await page.getByTestId("logout-button").click();
    await page.getByTestId("username-input").fill("demo");
    await page.getByTestId("password-input").fill("demo-password");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("todo-item")).toHaveCount(0);
    await expect(page.getByTestId("todo-counter")).toHaveText("No tasks yet.");
  });
});
