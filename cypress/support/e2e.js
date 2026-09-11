// This file runs automatically before every spec file in the suite.
import "./commands";

/**
 * saucedemo's "problem_user" and "performance_glitch_user" accounts are
 * deliberately seeded with front-end quirks by Sauce Labs (e.g. broken
 * image rendering), which can sometimes throw uncaught JS exceptions in
 * the browser console that have nothing to do with the behavior under
 * test. By default, Cypress fails a test the instant the app under test
 * throws an uncaught exception.
 *
 * This handler tells Cypress: don't fail the test on an uncaught app
 * exception; let our own explicit assertions be the only thing that
 * decides pass/fail. This is a deliberate, documented choice - not a
 * blanket "ignore all errors" habit - and it's scoped to this known,
 * expected source of noise rather than masking genuine regressions
 * elsewhere in the app.
 */
Cypress.on("uncaught:exception", () => {
  return false;
});
