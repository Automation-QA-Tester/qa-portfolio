const byTestId = (id) => cy.get(`[data-testid="${id}"]`);

function login() {
  cy.visit("/");
  byTestId("username-input").type("demo");
  byTestId("password-input").type("demo-password");
  byTestId("login-button").click();
}

function addTask(text) {
  byTestId("todo-input").type(text, { delay: 0 });
  byTestId("todo-add-button").click();
}

describe("Todo list", () => {
  beforeEach(() => {
    login();
  });

  it("shows an empty state when there are no tasks", () => {
    byTestId("todo-item").should("have.length", 0);
    byTestId("todo-counter").should("have.text", "No tasks yet.");
  });

  it("adds a task", () => {
    addTask("Buy milk");

    byTestId("todo-item").should("have.length", 1);
    byTestId("todo-text").should("have.text", "Buy milk");
    byTestId("todo-input").should("have.value", "");
    byTestId("todo-counter").should("have.text", "1 task left");
  });

  it("shows an error when the task is empty", () => {
    byTestId("todo-add-button").click();

    byTestId("todo-error").should("have.text", "Task cannot be empty.");
    byTestId("todo-item").should("have.length", 0);
  });

  it("shows an error when the task contains only spaces", () => {
    addTask("     ");

    byTestId("todo-error").should("have.text", "Task cannot be empty.");
    byTestId("todo-item").should("have.length", 0);
  });

  it("accepts a task with exactly 100 characters", () => {
    addTask("a".repeat(100));

    byTestId("todo-error").should("have.text", "");
    byTestId("todo-item").should("have.length", 1);
  });

  it("rejects a task with 101 characters", () => {
    addTask("a".repeat(101));

    byTestId("todo-error").should("have.text", "Task is too long (max 100 characters).");
    byTestId("todo-item").should("have.length", 0);
  });

  it("marks a task as done and unmarks it again", () => {
    addTask("Buy milk");

    byTestId("todo-checkbox").click();
    byTestId("todo-checkbox").should("be.checked");
    byTestId("todo-item").should("have.class", "completed");
    byTestId("todo-counter").should("have.text", "0 tasks left");

    byTestId("todo-checkbox").click();
    byTestId("todo-checkbox").should("not.be.checked");
    byTestId("todo-item").should("not.have.class", "completed");
    byTestId("todo-counter").should("have.text", "1 task left");
  });

  it("updates the counter when several tasks are added", () => {
    addTask("First task");
    addTask("Second task");

    byTestId("todo-item").should("have.length", 2);
    byTestId("todo-counter").should("have.text", "2 tasks left");
  });

  it("deletes a task", () => {
    addTask("First task");
    addTask("Second task");

    byTestId("todo-delete-button").first().click();

    byTestId("todo-item").should("have.length", 1);
    byTestId("todo-text").should("have.text", "Second task");
    byTestId("todo-counter").should("have.text", "1 task left");
  });

  it("clears the tasks after logout and login", () => {
    addTask("Buy milk");

    byTestId("logout-button").click();
    byTestId("username-input").type("demo");
    byTestId("password-input").type("demo-password");
    byTestId("login-button").click();

    byTestId("todo-item").should("have.length", 0);
    byTestId("todo-counter").should("have.text", "No tasks yet.");
  });
});
