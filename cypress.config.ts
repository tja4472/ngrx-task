import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({
  defaultCommandTimeout: 10000,

  e2e: {
    supportFile: 'cypress/support/e2e.ts',

    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);

      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      config.env = config.env || {};
      config.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
      config.env.FIREBASE_AUTH_EMULATOR_HOST =
        process.env.FIREBASE_AUTH_EMULATOR_HOST;

      return config;
    },
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
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            outputPath: 'dist/angular',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'tsconfig.cypress.json',
            inlineStyleLanguage: 'css',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: [
              './node_modules/@angular/material/prebuilt-themes/indigo-pink.css',
              'src/styles.css',
            ],
            scripts: [],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true,
          },
        },
      },
    },
    specPattern: '**/*.cy.ts',
  },
});
