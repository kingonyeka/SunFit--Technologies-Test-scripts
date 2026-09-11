/**
 * InventoryPage
 *
 * Encapsulates the product listing ("inventory") page - the page a user
 * lands on immediately after a successful login, and where add-to-cart
 * interactions happen.
 */
class InventoryPage {
  get pageTitle() {
    return cy.get(".title");
  }

  get cartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  get cartIcon() {
    return cy.get(".shopping_cart_link");
  }

  /**
   * Adds a product to the cart by its visible name, rather than by a
   * hardcoded index (e.g. "the 3rd button on the page"). Matching by name
   * is more resilient: if saucedemo reorders products, a test written
   * against "Sauce Labs Backpack" still targets the correct product,
   * whereas a test written against "item 3" would silently start testing
   * the wrong item.
   */
  addItemToCartByName(itemName) {
    cy.contains(".inventory_item", itemName).find("button").click();
    return this;
  }

  removeItemFromCartByName(itemName) {
    cy.contains(".inventory_item", itemName).find("button").click();
    return this;
  }

  goToCart() {
    this.cartIcon.click();
    return this;
  }
}

export default new InventoryPage();
