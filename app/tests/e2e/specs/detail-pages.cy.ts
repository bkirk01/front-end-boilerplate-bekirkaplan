describe('Detail Pages', () => {
  it('shows Pokemon details', () => {
    cy.visit('/pokemon')

    // Click on first Pokemon
    cy.get('a[href^="/pokemon/"]').first().click()

    // Verify details are shown
    cy.get('h1').should('be.visible')
    cy.get('img').should('be.visible')
    cy.contains('Stats').should('be.visible')
    cy.contains('Abilities').should('be.visible')
  })

  it('shows Rick & Morty character details', () => {
    cy.visit('/rick-and-morty')

    // Click on first character
    cy.get('a[href^="/rick-and-morty/"]').first().click()

    // Verify details are shown
    cy.get('h1').should('be.visible')
    cy.get('img').should('be.visible')
    cy.contains('Status').should('be.visible')
    cy.contains('Species').should('be.visible')
    cy.contains('Episodes').should('be.visible')
  })

  it('navigates back from detail pages', () => {
    // Pokemon
    cy.visit('/pokemon/1')
    cy.contains('Back').click()
    cy.url().should('include', '/pokemon')

    // Rick & Morty
    cy.visit('/rick-and-morty/1')
    cy.contains('Back').click()
    cy.url().should('include', '/rick-and-morty')
  })
})
