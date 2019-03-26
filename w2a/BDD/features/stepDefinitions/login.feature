Feature: Login
    In order to perform succesful Login
    As a user
    I want to enter correct username and password

    Scenario: In order to verify login to facebook as a Valid user

        Given user navigates to facebook website
        When user validates the homepage title
        Then user entered "valid" username
        Then user entered "valid" password
        Then user should "be" successfully logged in

 Scenario: In order to verify login to facebook as Invalid user

        Given user navigates to facebook website
        When user validates the homepage title
        Then user entered "invalid" username
        Then user entered "invalid" password
        Then user should "not" successfully logged in