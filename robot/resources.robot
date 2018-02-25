*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library

*** Variables ***
${SERVER}         localhost:4200
${BROWSER}        Chrome
${DELAY}          2
${URL}            http://${SERVER}/
${BACKEND_DELAY}  3000milliseconds

*** Keywords ***
    # Import library  DebugLibrary
    # Debug
    # Import library  Dialogs
    # Pause execution

Open Application
    ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method    ${options}    add_argument      disable-web-security
    Call Method    ${options}    add_argument      allow-running-insecure-content

    Create WebDriver  Chrome    chrome_options=${options}
    Go To    ${URL}
    Set Selenium Speed    ${DELAY}

Home page should be displayed
    Wait Until Page Contains Element    css=.mat-nav-list
    Page should contain element    css=.mat-nav-list

I can see ${name}
    Wait Until Element is not visible    css=div.loader
    Page should contain    ${name}

I click on ${name}
    Click Link    ${name}

I see ${name} details
    Wait Until Element is not visible    css=div.loader
    Element should contain    css=.mat-card-title   ${name}
