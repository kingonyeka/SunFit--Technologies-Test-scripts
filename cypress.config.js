const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Centralizing the base URL here means every cy.visit('/') in the suite
    // resolves against this one value. If SunFi's real staging URL replaces
    // saucedemo.com later, this is the only line that needs to change.
    baseUrl: "https://www.saucedemo.com",

    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",

    viewportWidth: 1280,
    viewportHeight: 720,

    // Cypress already auto-retries assertions internally (its built-in
    // retry-ability), but this config retries an entire *test* on failure -
    // useful for absorbing rare flake from a shared public demo environment
    // without masking a genuinely broken test. Only enabled in run mode
    // (CI/headless), not in the interactive Test Runner, so debugging isn't
    // slowed down by retries you don't want while actively writing a test.
    retries: {
      runMode: 2,
      openMode: 0,
    },

    defaultCommandTimeout: 8000,

    video: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // Reserved for future node-level event listeners (e.g. custom tasks,
      // plugins for reporting). Intentionally left as a clean extension
      // point rather than omitted, since removing it and needing it later
      // would mean restructuring the config file, not just adding a line.
      return config;
    },
  },
});
