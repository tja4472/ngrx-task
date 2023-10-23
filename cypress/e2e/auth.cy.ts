import {
  clearDatabase,
  clearUserAccounts,
} from 'cypress/support/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('Auth commands', () => {
  // Runs before every test block
  beforeEach(() => {
    clearDatabase('demo-1');
    clearUserAccounts('demo-1');

    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');

    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
  });

  it('sign-up', () => {
    cy.signUp(user.email, user.password);
  });

  it('sign-out', () => {
    cy.signUp(user.email, user.password);
    cy.signOut();
  });
});

describe('Auth', () => {
  // Runs before every test block
  beforeEach(() => {
    clearDatabase('demo-1');
    clearUserAccounts('demo-1');

    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');

    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AppActionsTestService.callSignUp(user.email, user.password);
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', user.email);
  });

  it('sign-in', () => {
    cy.signOut();
    cy.signIn(user.email, user.password);
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', user.email);
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list name');
    cy.getBySel('sign-out-button').should('be.visible');
  });

  it('sign-in: invalid email', () => {
    cy.signOut();
    cy.signIn('invalid-email', user.password);
    cy.getBySel('message-error')
      .should('be.visible')
      .should('contain.text', 'Firebase: Error (auth/invalid-email).');
  });

  it('sign-in: wrong password', () => {
    cy.signOut();
    cy.signIn(user.email, 'incorrect-password');
    cy.getBySel('message-error')
      .should('be.visible')
      .should('contain.text', 'Firebase: Error (auth/wrong-password).');
  });

  it('auto-sign-in', () => {
    cy.reload(true);
    // Autologin??
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', user.email);
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list name');
  });
});
