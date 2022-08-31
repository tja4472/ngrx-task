import { tick } from 'cypress/support/app-actions.util';
import * as AppActionsTestService from 'cypress/support/app-actions.service';
import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

describe('App Actions', () => {
  before(() => {
    cy.viewport('ipad-2', 'landscape');
    cy.visit('/');
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
  beforeEach(() => {
    // Runs before every test block
    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1')).should('be.a', 'number').and('equal', 200);
    cy.wrap(clearUserAccounts('demo-1'))
      .should('be.a', 'number')
      .and('equal', 200);
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
      // expect(user).to.deep.equal({ ... });
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
