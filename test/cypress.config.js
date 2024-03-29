const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      
    },
    chromeWebSecurity: false,
    baseUrl: "http://localhost:4242",
    video : false,
    screenshotsFolder: "cypress/results/screenshots",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      reportFilename : "stripechallengetestreport-individual",
      overwrite: false,
      html: false,
      reportTitle: "Stripe Developer",
      json: true
    }
  },
});