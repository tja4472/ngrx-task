/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
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

// If you use an import or export statement anywhere in the file, it becomes a module.
export {};

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
