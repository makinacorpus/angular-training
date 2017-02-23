*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported Selenium2Library.
Library           Selenium2Library

*** Variables ***
${SERVER}         localhost:4200
${BROWSER}        Firefox
${DELAY}          0
${LOGIN URL}      http://${SERVER}/
${BACKEND_DELAY}  3000milliseconds

*** Keywords ***
    # Import library  DebugLibrary
    # Debug
    # Import library  Dialogs
    # Pause execution

Open Application
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Set Selenium Speed    ${DELAY}

Home page should be displayed
    Wait Until Page Contains Element    css=app-home
    Page should contain element    css=ul

I can see ${name}
    Wait Until Element is not visible    css=div.loader
    Page should contain    ${name}

I click on ${name}
    Click Link    ${name}

I see ${name} details
    Wait Until Element is not visible    css=div.loader
    Element should contain    css=h2   ${name}
