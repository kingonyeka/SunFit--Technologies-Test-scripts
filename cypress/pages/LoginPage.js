/**
 * LoginPage
 *
 * Encapsulates every selector and interaction on the saucedemo login page.
 * Specs should never contain a raw `cy.get('[data-test="..."]')` for this
 * page - they call methods on this class instead. That way, if the app's
 * markup changes, exactly one file needs updating, not every spec that
 * touches login.
 *
 * Selector strategy: saucedemo exposes stable `data-test` attributes on its
 * interactive elements. These are used in preference to CSS classes or
 * element tags, because classes are often reused for styling and can change
 * without the underlying functionality changing - a `data-test` attribute
 * exists specifically as a contract for automation and is far less likely
 * to shift under a QA engineer's feet.
 */
class LoginPage {
  visit() {
    cy.visit("/");
    return this;
  }

  get usernameInput() {
    return cy.get('[data-test="username"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  /**
   * Logs in with the given credentials.
   * `{ log: false }` on the password type suppresses the password value
   * from appearing in the Cypress Command Log / video recording -
   * a small but deliberate habit carried over from the security
   * considerations in the test plan (don't leak credentials into artifacts
   * that get shared, e.g. this assessment's execution video).
   */
  login(username, password) {
    this.usernameInput.clear().type(username);
    this.passwordInput.clear().type(password, { log: false });
    this.loginButton.click();
    return this;
  }
}

export default new LoginPage();
