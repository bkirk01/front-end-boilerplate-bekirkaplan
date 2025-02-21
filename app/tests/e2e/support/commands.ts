// Custom command to check if element is visible and scrolled into view
Cypress.Commands.add('isVisibleInViewport', { prevSubject: true }, subject => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.lessThan(bottom);
  expect(rect.bottom).to.be.greaterThan(0);
  return subject;
});

// Custom command to check loading state
Cypress.Commands.add('waitForLoadingToDisappear', () => {
  cy.get('.loading-overlay').should('not.exist');
});

// Add more custom commands here as needed
