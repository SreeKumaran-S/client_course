Feature: Simple input functionality

    Scenario Outline: Enter name and display greeting
        Given Open the add user page
        When Enter user details "<userName>" "<userEmail>" "<userMobile>" "<userDOB>" "<userGender>"
        And I click "Signup"
        Then I should redirect to homePage

        Examples:
            | userName | userEmail                 | userMobile    | userDOB    | userGender |
            | john     | john.doe@example.com      | +919876543210 | 1990-05-15 | male       |
            | alex     | alex.williams@example.com | +917654321098 | 1988-07-10 | male       |


