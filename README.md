# SunFi QA Engineer Assessment — Cypress Automation

Automates the login and add-to-cart flow on [saucedemo.com](https://www.saucedemo.com/) as required by Section C of the SunFi Technologies QA Engineer assessment.

## What this covers

A single spec (`cypress/e2e/login-add-to-cart.cy.js`) that:

1. Visits the login page
2. Logs in using `standard_user` credentials
3. Verifies successful login (URL + visible page title)
4. Adds one item to the cart
5. Asserts the cart badge count updates correctly

Built with the **Page Object Model** and a **fixture-driven (data-driven)** approach — both bonus criteria from the assessment brief.

## Project structure

```
sunfi-cypress-automation/
├── cypress/
│   ├── e2e/
│   │   └── login-add-to-cart.cy.js   # the required test spec
│   ├── fixtures/
│   │   └── users.json                # all 4 provided test accounts
│   ├── pages/
│   │   ├── LoginPage.js              # login page selectors & actions
│   │   ├── InventoryPage.js          # product listing / cart badge
│   │   └── CartPage.js               # cart view (ready for future tests)
│   └── support/
│       ├── commands.js               # cy.loginAs() custom command
│       └── e2e.js                    # global config, loaded before every spec
├── cypress.config.js
├── package.json
└── .gitignore
```

## Prerequisites

- **Node.js** v18 or later ([download here](https://nodejs.org/)) — check your version with `node -v`
- **npm** (bundled with Node.js) — check with `npm -v`
- No global Cypress install needed; it's a local project dependency

## Setup — run these in order

```bash
# 1. Unzip this project and move into it
cd sunfi-cypress-automation

# 2. Install dependencies (downloads Cypress + its browser binary — this
#    step needs an internet connection and can take a few minutes the
#    first time)
npm install

# 3. Open the interactive Cypress Test Runner (recommended for your
#    "explaining your code" video — you can watch it click through live)
npm run cypress:open
#    -> Choose "E2E Testing" -> choose a browser -> click on
#       "login-add-to-cart.cy.js" to run it

# 4. OR run it headlessly from the terminal (recommended for your
#    "execution" video, since it prints clear pass/fail output and
#    records a video automatically to cypress/videos/)
npm run test
```

## What to expect when it runs

- A browser (real or Electron, depending on how you run it) opens saucedemo.com
- It logs in as `standard_user`
- It lands on the product listing page
- It clicks "Add to cart" on the Sauce Labs Backpack
- The cart icon shows a badge with "1"
- Terminal output (headless mode) shows `1 passing`

If you run it headlessly, a recording is automatically saved to `cypress/videos/login-add-to-cart.cy.js.mp4` — useful raw footage if you want to splice it into your execution-proof video rather than re-recording your screen from scratch.

## Design decisions worth knowing for your interview

- **Selectors use `data-test` attributes**, not CSS classes or element tags — saucedemo exposes these specifically as automation contracts, and they're far less likely to change than styling classes.
- **Credentials live in `cypress/fixtures/users.json`**, never hardcoded inline in a spec — this is the data-driven half of the bonus criteria, and it means rotating a password later means editing one file, not hunting through every spec.
- **`cy.loginAs('standardUser')` is a custom command**, not a raw sequence of `cy.get().type()` calls in the spec — this keeps the spec declarative and reusable across every future test that needs to start from a logged-in state.
- **No hard waits (`cy.wait(5000)`)** anywhere in this project. Cypress's built-in retry-ability means assertions like `.should('have.text', '1')` automatically re-check the DOM until they pass or time out — trusting that mechanism instead of fighting it with arbitrary sleeps is one of the clearest signals of Cypress fluency versus someone translating Selenium habits into Cypress syntax.
- **The `uncaught:exception` handler in `support/e2e.js` is scoped and commented**, not a blanket "ignore everything" habit — it exists because saucedemo's `problem_user`/`performance_glitch_user` accounts are deliberately seeded with front-end quirks by Sauce Labs, unrelated to the flow under test.


