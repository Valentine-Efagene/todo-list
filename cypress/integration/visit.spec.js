// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Excluding-and-Including-Tests

beforeEach(() => {
  cy.visit('http://localhost:3000')
})

describe('Visit  app URL', () => {
  it('loads', () => {
    cy.contains('Dapp University | Todo List')
  })
})
