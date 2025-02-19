declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to check if element is visible and scrolled into view
     * @example cy.get('.element').isVisibleInViewport()
     */
    isVisibleInViewport(): Chainable<Element>;

    /**
     * Custom command to wait for loading overlay to disappear
     * @example cy.waitForLoadingToDisappear()
     */
    waitForLoadingToDisappear(): Chainable<Element>;
  }
}
