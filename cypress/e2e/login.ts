import { AccountPage } from '../pages/Account'
import { testData } from './model'

describe('Login', () => {
  beforeEach(() => {
    AccountPage.visit()
  })

  it('Login with valid username and password', () => {
    cy.parseXlsx('cypress/fixtures/exceldata.xlsx').then((jsonData) => {
      let data: [] = jsonData[0].data

      data.forEach((row) => {
        cy.writeFile('cypress/fixtures/exceldata.json', {
          users: [
            {
              username: row[0],
              password: row[1]
            }
          ]
        })
      })
    })

    cy.fixture<{ users: testData[] }>('exceldata').its('users').then((users) => {
      users.forEach(users => {
        cy.loginWith(users.username, users.password)
        AccountPage.wrongUsernameMsgElement.should('contain.text', 'Error: the password you entered for the username ' + users.username +' is incorrect.')
      })
    })
  })
})