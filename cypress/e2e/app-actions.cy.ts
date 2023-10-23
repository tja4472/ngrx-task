/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { tick } from 'cypress/support/app-actions.util';
import {
  clearDatabase,
  clearUserAccounts,
} from 'cypress/support/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';

describe('App Actions', () => {
  before(() => {
    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');

    cy.visit('/');

    // Has to be after cy.visit
    AppActionsTestService.getService();
  });

  it('testService', () => {
    AppActionsTestService.getProperty().should(
      'equal',
      'appActionsTestServiceProperty'
    );
    AppActionsTestService.callMethod1('dd').should('equal', 'ddA');
    AppActionsTestService.getProperty().should('equal', 'ddA');
    AppActionsTestService.callPromise1('ee').should('equal', 'eeB');
    tick();
  });
});

describe('Sign Up tests', () => {
  // Runs before every test block
  beforeEach(() => {
    clearDatabase('demo-1');
    clearUserAccounts('demo-1');

    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');

    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
  });

  it('1 - Sign Up', () => {
    (async () => {
      AppActionsTestService.callSignUp('aa.aa@a.com', 'password');
      cy.location('pathname').should('eq', '/home');
      cy.getBySel('user-name')
        .should('be.visible')
        .should('contain.text', 'aa.aa@a.com');
      cy.getBySel('task-list-name')
        .should('be.visible')
        .should('contain.text', 'default-list name');
    })();
  });

  it('2 - Sign Up', () => {
    AppActionsTestService.callSignUp('aa.aa@a.com', 'password');

    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'aa.aa@a.com');
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list name');
  });
});
