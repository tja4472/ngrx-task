// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// https://docs.cypress.io/api/cypress-api/custom-commands
// https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       *
       * Calls cy.get using [data-test=${dataTestAttribute}]
       * @param dataTestAttribute
       *
       */
      getBySel(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      /**
       *
       * Calls cy.get using [data-test=${dataTestAttribute}]
       * @param dataTestAttribute
       *
       */
      getBySelLike(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      /**
       *
       * Calls cy.parent using [data-test*=${dataTestAttribute}]
       * @param dataTestAttribute
       *
       */
      parentBySel(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
      /**
       * Calls cy.find using [data-test=${dataTestAttribute}]
       * @param selector
       * @example cy.findBySel('list-item')
       */
      findBySel(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;

      signIn(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      signOut(): Chainable<JQuery<HTMLElement>>;
      signUp(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      visitHomePage(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/support/commands.ts
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add(
  'findBySel',
  { prevSubject: 'element' },
  (subject, dataTestAttribute) => {
    return cy.wrap(subject).find(`[data-test=${dataTestAttribute}]`);
  }
);

Cypress.Commands.add(
  'parentBySel',
  { prevSubject: 'element' },
  (subject, dataTestAttribute) => {
    return cy.wrap(subject).parent(`[data-test=${dataTestAttribute}]`);
  }
);

Cypress.Commands.add('signIn', (email, password) => {
  // Home page
  // cy.visit('/');
  cy.getBySel('sidenav-home-page').click();
  cy.location('pathname').should('eq', '/home');
  cy.getBySel('sign-out-button').should('be.visible');

  // cy.visitHomePage();
  cy.getBySel('sidenav-sign-in').click();
  // Sign In page
  cy.location('pathname').should('eq', '/sign-in');
  cy.getBySel('sign-up-button').should('be.visible');
  cy.getBySel('username-field').type(email);
  cy.getBySel('password-field').type(password);
  cy.getBySel('sign-in-button').should('be.enabled').click();
/*  
  // Home page
  cy.location('pathname').should('eq', '/home');
  return cy.getBySel('sign-out-button').should('be.visible');
*/  
});

Cypress.Commands.add('signOut', () => {
  cy.getBySel('sidenav-home-page').should('be.visible').click();
  cy.location('pathname').should('eq', '/home');
  cy.getBySel('sign-out-button').should('be.visible').click();
  // Dialog
  cy.getBySel('ok-button').click();
  cy.location('pathname').should('eq', '/sign-in');
  cy.getBySel('sign-up-button').should('be.visible');
  cy.getBySel('user-name')
    .should('be.visible')
    .should('contain.text', 'Not Signed In');
});

Cypress.Commands.add('signUp', (email, password) => {
  cy.getBySel('sidenav-sign-in').should('be.visible').click();
  // Sign In page
  cy.location('pathname').should('eq', '/sign-in');
  cy.getBySel('sign-up-button').should('be.visible').click();
  // Sign Up page
  cy.location('pathname').should('eq', '/sign-up');
  cy.getBySel('sign-up-button').should('be.visible').and('be.disabled');
  cy.getBySel('username-field').type(email);
  cy.getBySel('password-field').type(password);
  cy.getBySel('sign-up-button').should('be.enabled').click();

  // Home page
  cy.location('pathname').should('eq', '/home');
  cy.getBySel('user-name').should('be.visible').should('contain.text', email);
  cy.getBySel('task-list-name')
    .should('be.visible')
    .should('contain.text', 'default-list name');
});

Cypress.Commands.add('visitHomePage', () => {
  // Home page
  cy.visit('/');
  cy.location('pathname').should('eq', '/home');
  return cy.getBySel('sign-out-button').should('be.visible');
});

// firebaseConfigDev is not available for GitHub actions.
// import { firebaseConfigDev } from './firebase/firebase-config-dev';
import { FirebaseConfig } from './firebase/firebase-config-interface';
import { firebaseConfigEmulatorDemo } from './firebase/firebase-config-emulator-demo';
import { attachCustomCommands } from 'cypress-firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const cypressUseDemoProject = Cypress.env('USE_DEMO_PROJECT');
console.log('cypressUseDemoProject: ', cypressUseDemoProject);

var firebaseConfig: FirebaseConfig;

/*
  if (cypressUseDemoProject) {
    firebaseConfig = firebaseConfigEmulatorDemo;
  } else {
    firebaseConfig = firebaseConfigDev;
  }
  */

firebaseConfig = firebaseConfigEmulatorDemo;

console.log('apiKey:', firebaseConfig.apiKey);
firebase.initializeApp(firebaseConfig);

// const fbInstance = firebase.initializeApp(firebaseConfig);
/* ok
  const fbInstance = firebase.initializeApp({ apiKey: 'AIzaSyCM95TN-IRTj0QCl2xUwNr7Q-LBzfzsT1Y',
   projectId: 'demo-1'});
  */
/*
  const fbInstance = firebase.initializeApp({
    apiKey: 'demo-1-key',
    projectId: 'demo-1',
  });
  */

const firestoreEmulatorHost = Cypress.env('FIRESTORE_EMULATOR_HOST');

if (firestoreEmulatorHost) {
  console.log('firestoreEmulatorHost');
  /*
    firebase.firestore().settings({
      host: 'localhost:8080',
      ssl: false,
      // experimentalForceLongPolling: true,
    });
  */
  firebase.firestore().useEmulator('localhost', 8080);
}

/*
  if (fbInstance) {
    (window as any).fbInstance = fbInstance;
  }
  */
const authEmulatorHost = Cypress.env('FIREBASE_AUTH_EMULATOR_HOST');
if (authEmulatorHost) {
  firebase.auth().useEmulator(`http://${authEmulatorHost}/`);
  console.log(`Using Auth emulator: http://${authEmulatorHost}/`);
}

attachCustomCommands({ Cypress, cy, firebase });
