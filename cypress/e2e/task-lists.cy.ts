import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('Task Lists', () => {
  beforeEach(() => {
    // Runs before every test block
    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1')).should('be.a', 'number').and('equal', 200);
    cy.wrap(clearUserAccounts('demo-1'))
      .should('be.a', 'number')
      .and('equal', 200);
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AppActionsTestService.callSignUp(user.email, user.password);
    cy.getBySel('sidenav-task-lists').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/lists');
  });

  it('detail-edit: Cancel', () => {
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name')
      .click();
    cy.location('pathname').should('eq', '/tasks/lists/edit/default-list');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-input').type('GGGG');
    cy.getBySel('submit-button').should('be.enabled');
    cy.getBySel('cancel-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists;id=default-list');
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
  });

  it('detail-edit: Submit', () => {
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name')
      .click();
    cy.location('pathname').should('eq', '/tasks/lists/edit/default-list');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-input').type('GGGG');
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists;id=default-list');
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list nameGGGG');
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list nameGGGG');
  });

  it('detail-edit: Remove', () => {
    cy.getBySel('new-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('name-input').type('BBBB');
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 2)
      .should('contain.text', 'default-list name')
      .should('contain.text', 'BBBB');
    cy.contains('a', 'BBBB').should('be.visible').click();
    cy.getBySel('remove-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
  });

  it('detail-new: Cancel', () => {
    cy.getBySel('new-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('name-input').type('BBBB');
    cy.getBySel('cancel-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
  });

  it('detail-new: Submit', () => {
    cy.getBySel('new-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('name-input').type('BBBB');
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 2)
      .should('contain.text', 'default-list name')
      .should('contain.text', 'BBBB');
  });
});
