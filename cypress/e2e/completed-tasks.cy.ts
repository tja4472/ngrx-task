import {
  clearDatabase,
  clearUserAccounts,
} from 'cypress/support/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';
import {
  currentTask1,
  currentTask2,
  currentTask3,
  newCurrentTask,
  user,
} from './util';

describe('Completed Tasks', () => {
  beforeEach(() => {
    // Runs before every test block
    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');
    clearDatabase('demo-1');
    clearUserAccounts('demo-1');
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    AppActionsTestService.callSignUp(user.email, user.password);
    cy.getBySel('sidenav-current-tasks').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('list-item').should('not.exist');
    cy.getBySel('new-current-task-button').should('be.visible');

    newCurrentTask(currentTask1, true);
    newCurrentTask(currentTask2, true);
    newCurrentTask(currentTask3, true);

    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 3)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name)
      .should('contain.text', currentTask3.name);
    cy.getBySel('vert-menu-button').should('be.visible').click();
    cy.getBySel('clear-completed-button').should('be.visible').click();
    cy.getBySel('list-item').should('not.exist');
    cy.getBySel('new-current-task-button').should('be.visible');
    cy.getBySel('sidenav-completed-tasks').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/completed');
    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 3)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name)
      .should('contain.text', currentTask3.name);
  });

  it('Cancel', () => {
    const nameExtra = 'AAAAA';
    const descriptionExtra = 'BBBBBB';

    cy.getBySel('list-item')
      .should('be.visible')
      .contains(currentTask2.name)
      .parentBySel('list-item')
      .as('listItem');
    cy.get('@listItem').click();
    cy.location('pathname').should('match', /^\/tasks\/completed\/edit/);
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-input').type(nameExtra);
    cy.getBySel('description-textarea').type(descriptionExtra);
    cy.getBySel('submit-button').should('be.enabled');
    cy.getBySel('cancel-button').should('be.enabled').click();
    cy.location('pathname').should('match', /^\/tasks\/completed;id=/);
    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 3)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name)
      .should('contain.text', currentTask3.name);
  });

  it('Submit', () => {
    const nameExtra = 'AAAAA';
    const descriptionExtra = 'BBBBBB';

    cy.getBySel('list-item')
      .should('be.visible')
      .contains(currentTask2.name)
      .parentBySel('list-item')
      .as('listItem');
    cy.get('@listItem').click();
    cy.location('pathname').should('match', /^\/tasks\/completed\/edit/);
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-input').type(nameExtra);
    cy.getBySel('description-textarea').type(descriptionExtra);
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.location('pathname').should('match', /^\/tasks\/completed;id=/);
    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 3)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name + nameExtra)
      .should('contain.text', currentTask2.description + descriptionExtra)
      .should('contain.text', currentTask3.name);
  });
});
