// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  // Reset any previous state
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})
