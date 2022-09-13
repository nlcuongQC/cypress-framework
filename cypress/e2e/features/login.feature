Feature: My Account - Login

    Background:
        Given A user opens My Account Menu
        
    Scenario: Valid username and password
        When A user login with registered account
        Then user should login successfully