import { Base } from "./Base"

class Account extends Base {
    private username: string = "#username"
    private password: string = "#password"
    private submitBtn: string = "[name = 'login']"
    private wrongUsernameMsg: string = ".woocommerce-error"

    get usernameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.username)
    }

    get passwordElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.password)
    }

    get submitBtnElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.submitBtn)
    }

    get wrongUsernameMsgElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.wrongUsernameMsg)
    }

    loginWith(username: string, password: string): void {
        this.usernameElement.type(username)
        this.passwordElement.type(password)
        this.submitBtnElement.click()
    }

    visit(): void {
        cy.visit(`${Cypress.env("qa")}/my-account/`)
    }
}

export const AccountPage = new Account()