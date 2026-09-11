import InventoryPage from "../pages/InventoryPage";

/**
 *
 * Covers the required flow end to end:
 *   1. Visit the login page
 *   2. Log in using standard_user credentials
 *   3. Verify successful login
 *   4. Add one item to the cart
 *   5. Assert the cart badge count is updated
 *
 * Selectors and login logic live in the Page Object classes and the
 * cy.loginAs custom command - this spec file only orchestrates the flow
 * and makes assertions, which is what keeps specs readable as a suite
 * grows past a handful of tests.
 */
describe("SunFi Assessment - Login and Add to Cart Flow", () => {
  it("logs in as standard_user and adds one item to the cart", () => {
    // Steps 1 & 2: visit login page, log in with standard_user credentials
    cy.loginAs("standardUser");

    // Step 3: verify successful login.
    // Two independent checks, not one, because the URL alone could
    // technically be correct while the page fails to render (e.g. a
    // partial load or a client-side routing bug) - checking for a visible,
    // correctly-labeled page title confirms the page is actually usable,
    // not just that the browser's address bar changed.
    cy.url().should("include", "/inventory.html");
    InventoryPage.pageTitle.should("be.visible").and("contain.text", "Products");

    // Step 4: add one item to the cart.
    // Targeted by product name rather than position, so the test remains
    // correct even if saucedemo reorders its product list.
    const itemName = "Sauce Labs Backpack";
    InventoryPage.addItemToCartByName(itemName);

    // Step 5: assert the cart badge count is updated.
    // .should('have.text', '1') is used over a generic .should('exist')
    // because "the badge appeared" is a weaker claim than "the badge shows
    // the correct count" - the latter is what actually matters to a real
    // user, and it's the assertion a bug in the counting logic would
    // actually catch.
    InventoryPage.cartBadge.should("be.visible").and("have.text", "1");
  });
});
