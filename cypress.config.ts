import { defineConfig } from 'cypress';

export default defineConfig({
  defaultCommandTimeout: 10000,

  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    /*
    setupNodeEvents(on, config) {
      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      config.env = config.env || {};

      return config;
    },
*/
    baseUrl: 'http://localhost:4200',
  },

  retries: {
    runMode: 3,
    // openMode: 1,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
