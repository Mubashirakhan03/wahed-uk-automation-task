## Wahed UK Pricing Calculator Automation Suite
A robust end-to-end automation framework built from scratch using Playwright to verify the functional and UI integrity of the Wahed UK Pricing Calculator.

## Project Setup & Installation
I initialized this project as a standalone automation suite. Here is how I set it up from scratch:

## 1. Environment Initialization: 
Confirmed Node.js installation and initialized the project directory:


## 2. Playwright Framework Setup:
Installed Playwright with JavaScript configuration:

```
npm init playwright@latest
```

## 3 Dependency Management:
Installed necessary browsers (Chromium) and configured the package.json for custom test scripts.

## 4. Directory Organization:
Manually restructured the project into Pages, Tests, and Data folders to implement a clean architecture.

## Framework Architecture

To ensure this suite is industry-standard, I implemented the following patterns:

- **Page Object Model (POM)**: Encapsulated all UI locators and interactions within the PricingPage.js file. This ensures that if the UI changes, we only need to update the locator in one place.
- **Data-Driven Testing (DDT)**: All test scenarios (investment amounts, strategies, and expected fees) are stored in "Data/pricingData.json". The test script dynamically iterates through these cases.
- **Decoupled Logic**: Separation of test data from test execution logic to allow for easy scaling of test cases without touching the core code.

## What am I Testing in this Project?

This suite covers four major areas of the Wahed UK Pricing page:

##  1. Visual Consistency: 
Verifying that the Navigation bar (UK Flag, Logo), Hero section, FAQ, and Footer load correctly with all expected elements.

## 2. Functional Calculation Logic: 
The core of the test validates the calculator. It selects different strategies (Very Aggressive to Very Conservative), toggles the "Include Pension" option, and asserts if the Total Annual Fee is calculated accurately.

## 3. Interaction & UX: 
Verifying that the FAQ items expand/collapse correctly and that the Information Tooltip appears on hover with the correct descriptive text.

## 4. Input Field Robustness:
Input Field Robustness: Validation of the "I want to invest" field to ensure it correctly handles valid numeric inputs and restricts invalid characters like letters or symbols.


##Running the Automation
Follow these commands to execute and view reports:

## Run all tests in Headless mode:

```
npx playwright test
```


## Run in Headed mode (To see the browser interaction):

```
npx playwright test --headed
```



## Generate and Open HTML Report:

```
npx playwright show-report
```


## Directory Structure:

```
├── Data/
│   └── pricingData.json      # Externalized test scenarios (DDT)
├── Pages/
│   └── PricingPage.js        # Page Object Components (POM)
├── tests/
│   └── pricingPage.spec.js   # Main automation test suite
├── playwright.config.js      # Global configuration
└── package.json              # Project scripts and dependencies
```
