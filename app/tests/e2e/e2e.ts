// Import commands.js using ES2015 syntax:
import './support/commands'

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom commands here
    }
  }
}
