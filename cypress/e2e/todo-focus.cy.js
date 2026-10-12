const byTestId = (id) => cy.get(`[data-testid="${id}"]`);

describe("Todo list focus management", () => {
  beforeEach(() => {
    cy.visit("/");
    byTestId("username-input").type("demo");
    byTestId("password-input").type("demo-password");
    byTestId("login-button").click();

    ["First task", "Second task", "Third task"].forEach((text) => {
      byTestId("todo-input").type(text, { delay: 0 });
      byTestId("todo-add-button").click();
    });
  });

  it("keeps focus on the checkbox after it is checked", () => {
    byTestId("todo-checkbox").eq(2).click();

    byTestId("todo-checkbox").eq(2).should("be.checked");
    byTestId("todo-checkbox").eq(2).should("have.focus");
  });

  it("keeps focus on the checkbox after it is unchecked", () => {
    byTestId("todo-checkbox").eq(2).click();
    byTestId("todo-checkbox").eq(2).should("be.checked");

    byTestId("todo-checkbox").eq(2).click();

    byTestId("todo-checkbox").eq(2).should("not.be.checked");
    byTestId("todo-checkbox").eq(2).should("have.focus");
  });

  it("moves focus to the next task after a task is deleted", () => {
    byTestId("todo-delete-button").eq(1).click();

    byTestId("todo-item").should("have.length", 2);
    byTestId("todo-checkbox").eq(1).should("have.focus");
  });

  it("moves focus to the previous task after the last task is deleted", () => {
    byTestId("todo-delete-button").eq(2).click();

    byTestId("todo-item").should("have.length", 2);
    byTestId("todo-checkbox").eq(1).should("have.focus");
  });

  it("moves focus to the new task field after the last remaining task is deleted", () => {
    [2, 1, 0].forEach((remaining) => {
      byTestId("todo-delete-button").first().click();
      byTestId("todo-item").should("have.length", remaining);
    });

    byTestId("todo-input").should("have.focus");
  });
});
