import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { AccountPage } from '../../pages/Account'

Given("A user opens My Account Menu", () => {
  AccountPage.visit()
});

When("A user login with registered account", () => {
  AccountPage.loginWith("hello", "there");
});

Then("user should login successfully", (errorMessage) => {
  AccountPage.wrongUsernameMsgElement.should('contain.text', 'Error: the password you entered for the username ' + "hello" +' is incorrect.')

});
