*** Settings ***
Documentation     A test suite with basic tests
Resource          resources.robot

*** Test Cases ***
View the pokemon list
    Open Application
    Home page should be displayed
    I can see bulbasaur
    [Teardown]    Close Browser

Display a pokemon
    Open Application
    Home page should be displayed
    I click on bulbasaur
    I see bulbasaur details
    [Teardown]    Close Browser
