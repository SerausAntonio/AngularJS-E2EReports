Feature: Login
    In order to perform succesful Login
    As a user
    I want to enter correct username and password

    Background:
        Given user navigates to facebook website
        When user validates the homepage title        

    Scenario: In order to verify login to facebook as a Valid user
        
        Then user entered "valid" username
        Then user entered "valid" password
        Then user should "be" successfully logged in

 Scenario: In order to verify login to facebook as Invalid user

        
        Then user entered "invalid" username
        Then user entered "invalid" password
        Then user should "not" successfully logged in