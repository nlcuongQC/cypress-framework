import { defineConfig } from "cypress";
import { reject, resolve } from "cypress/types/bluebird";

//verify download import
const { isFileExist, findFiles } = require('cy-verify-downloads')

//Excel requirements
const xlsx = require('node-xlsx').default
const fs = require('fs') //for file
const path = require('path') //for file path

//faker
const { faker } = require('@faker-js/faker')

import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  //verify download import
  on('task', { isFileExist, findFiles })

  //Excel
  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const jsonData = xlsx.parse(fs.readFileSync(filePath))
          resolve(jsonData)
        } catch (e) {
          reject(e)
        }
      })
    }
  })

  //mocha report
  require('cypress-mochawesome-reporter/plugin')(on)

  //faker
  on('task', {
    demoUser() {
      let user = {
        username: faker.name.firstName()
      }
      return user
    }
  })
  
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://practice.automationtesting.in",
    setupNodeEvents,
    experimentalSessionAndOrigin: true,
    supportFile: false
  },
  env: {
    qa: "https://practice.automationtesting.in/"
  },
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 60000,
  // viewportHeight: 1080,
  // viewportWidth: 1920,
  // reporter: 'cypress-mochawesome-reporter',
  // reporterOptions: {
  //   charts: true,
  //   reportPageTitle: "Report",
  //   embeddedScreenshots: true,
  //   inlineAssets: true,
  //   saveAllAttempts: false
  // },
  retries: {
    runMode: 2,
    openMode: 1
  },
  video: true,
  screenshotOnRunFailure: true,
  projectId: "9zzhu1",
});
