describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('navigates to Pokemon page', () => {
    cy.contains('Pokémon').click()
    cy.url().should('include', '/pokemon')
    cy.contains('h1', 'Pokémon').should('be.visible')
  })

  it('navigates to Rick & Morty page', () => {
    cy.contains('Rick & Morty').click()
    cy.url().should('include', '/rick-and-morty')
    cy.contains('h1', 'Rick & Morty Characters').should('be.visible')
  })

  it('toggles between grid and list views', () => {
    // Go to Pokemon page
    cy.contains('Pokémon').click()

    // Check grid view
    cy.get('div.grid').should('exist')

    // Switch to list view
    cy.contains('List').click()
    cy.get('div.grid').should('not.exist')
    cy.get('div.space-y-4').should('exist')

    // Switch back to grid view
    cy.contains('Grid').click()
    cy.get('div.grid').should('exist')
  })

  it('uses pagination', () => {
    cy.contains('Pokémon').click()

    // Click next page
    cy.get('nav[aria-label="Pagination"]').contains('2').click()
    cy.url().should('include', '/pokemon')

    // Verify page changed
    cy.get('nav[aria-label="Pagination"]').find('.bg-primary-500').should('contain', '2')
  })
})
