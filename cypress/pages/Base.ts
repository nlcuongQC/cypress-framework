class Base {
    private header: string = '#headerwrap'

    get headerElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.header)
    }
}

export { Base }