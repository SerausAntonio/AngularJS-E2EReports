Feature: Login
    In order to perform succesful Login
    As a user
    I want to enter correct username and password

    Background:
        Given user navigates to facebook website
        When user validates the homepage title        

    Scenario Outline: In order to verify login to facebook as a Valid user
        
        Then user entered "<username>" username
        Then user entered "<password>" password
        Then user should "<loginstatus>" successfully logged in

  Examples:
  | username | password | loginstatus |
  | Antonio  | password123 | be  |
  | Antonio  | password123 | not |