import {
  clearDatabase,
  clearUserAccounts,
} from 'cypress/support/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';

import { DataTestIds } from './types';

type DataTestIdNames =
  | 'cancelButton'
  | 'descriptionTextarea'
  | 'isCompleteCheckbox'
  | 'nameInput'
  | 'nameInputError'
  | 'removeButton'
  | 'submitButton';

const dataTestIds: DataTestIds<DataTestIdNames> = {
  cancelButton: 'cancelButton',
  descriptionTextarea: 'descriptionTextarea',
  isCompleteCheckbox: 'isCompleteCheckbox',
  nameInput: 'nameInput',
  nameInputError: 'nameInputError',
  removeButton: 'removeButton',
  submitButton: 'submitButton',
} as const;

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('Task Lists', () => {
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
    cy.getBySel('sidenav-task-lists').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/lists');
  });

  it('detail-edit: Cancel', () => {
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name')
      .click();
    cy.location('pathname').should('eq', '/tasks/lists/edit/default-list');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.nameInput).type('GGGG');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled').click();
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
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.removeButton).should('be.enabled');
    cy.getBySel(dataTestIds.nameInput).type('GGGG');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();
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
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.nameInput).type('BBBB');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 2)
      .should('contain.text', 'default-list name')
      .should('contain.text', 'BBBB');
    cy.contains('a', 'BBBB').should('be.visible').click();
    cy.getBySel(dataTestIds.removeButton).should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
  });

  it('detail-new: Cancel', () => {
    cy.getBySel('new-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.nameInput).type('BBBB');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
  });

  it('detail-new: Submit', () => {
    cy.getBySel('new-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel(dataTestIds.submitButton).should('be.disabled');
    cy.getBySel(dataTestIds.cancelButton).should('be.enabled');
    cy.getBySel(dataTestIds.nameInput).type('BBBB');
    cy.getBySel(dataTestIds.submitButton).should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 2)
      .should('contain.text', 'default-list name')
      .should('contain.text', 'BBBB');
  });
});
