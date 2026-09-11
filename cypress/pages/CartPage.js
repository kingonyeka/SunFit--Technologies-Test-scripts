/**
 * CartPage
 *
 * Encapsulates the cart view. Not exercised by the assessment's required
 * spec (which only asserts the badge count from the inventory page), but
 * included so the framework is ready to automate the cart-view and
 * checkout-initiation test cases from the Section B test case document
 * (e.g. TC-011, TC-015, TC-017, TC-018) without restructuring anything -
 * a POM should anticipate the next test, not just the one in front of you.
 */
class CartPage {
  get cartItems() {
    return cy.get(".cart_item");
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  removeItemByName(itemName) {
    cy.contains(".cart_item", itemName).find("button").click();
    return this;
  }
}

export default new CartPage();
