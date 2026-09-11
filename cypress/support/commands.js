import LoginPage from "../pages/LoginPage";

/**
 * cy.loginAs(userKey)
 *
 * A custom command that logs in using a named user from the fixtures file,
 * e.g. cy.loginAs('standardUser'). This keeps specs declarative - a spec
 * reads "log in as the standard user" rather than repeating raw credential
 * strings, and it means the login flow (visit -> type -> type -> click) is
 * defined in exactly one place (LoginPage), reused everywhere.
 *
 * Throwing explicitly when a key isn't found is a deliberate choice over
 * letting it fail silently with `undefined` values typed into the form -
 * a silent failure here would produce a confusing "wrong username/password"
 * assertion failure that hides the real bug (a typo in the fixture key).
 */
Cypress.Commands.add("loginAs", (userKey) => {
  cy.fixture("users").then((users) => {
    const user = users[userKey];
    if (!user) {
      throw new Error(
        `cy.loginAs: no fixture entry found for user key "${userKey}". ` +
          `Check cypress/fixtures/users.json for valid keys.`
      );
    }
    LoginPage.visit().login(user.username, user.password);
  });
});
