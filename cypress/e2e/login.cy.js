const byTestId = (id) => cy.get(`[data-testid="${id}"]`);

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows an error when both fields are empty", () => {
    byTestId("login-button").click();

    byTestId("login-message").should("have.text", "Username and password are required.");
  });

  it("shows an error for invalid credentials", () => {
    byTestId("username-input").type("demo");
    byTestId("password-input").type("wrong-password");
    byTestId("login-button").click();

    byTestId("login-message").should("have.text", "Invalid username or password.");
  });

  it("logs in with valid credentials", () => {
    byTestId("username-input").type("demo");
    byTestId("password-input").type("demo-password");
    byTestId("login-button").click();

    byTestId("welcome-heading").should("have.text", "Welcome, demo!");
    byTestId("login-button").should("not.be.visible");
  });

  it("logs out and shows the login form again", () => {
    byTestId("username-input").type("demo");
    byTestId("password-input").type("demo-password");
    byTestId("login-button").click();
    byTestId("logout-button").click();

    byTestId("login-button").should("be.visible");
    byTestId("welcome-heading").should("not.be.visible");
  });
});
