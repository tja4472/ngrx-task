import {
  clearDatabase,
  clearUserAccounts,
} from 'cypress/support/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';
import {
  currentTask1,
  currentTask2,
  currentTask3,
  currentTask4,
  currentTask5,
  newCurrentTask,
  user,
} from './util';

describe('Completed Tasks', () => {
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
    cy.getBySel('sidenav-current-tasks').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('list-item').should('not.exist');
    cy.getBySel('new-current-task-button').should('be.visible');

    newCurrentTask(currentTask1, true);
    newCurrentTask(currentTask2, true);
    newCurrentTask(currentTask3, true);
    newCurrentTask(currentTask4, true);
    newCurrentTask(currentTask5, true);

    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 5)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name)
      .should('contain.text', currentTask3.name)
      .should('contain.text', currentTask4.name)
      .should('contain.text', currentTask5.name);
    cy.getBySel('vert-menu-button').should('be.visible').click();
    cy.getBySel('clear-completed-button').should('be.visible').click();
    cy.getBySel('list-item').should('not.exist');
    cy.getBySel('new-current-task-button').should('be.visible');
    cy.getBySel('sidenav-completed-tasks').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/completed');
    cy.getBySel('list-item')
      .should('be.visible')
      .should('have.length', 5)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name)
      .should('contain.text', currentTask3.name)
      .should('contain.text', currentTask4.name)
      .should('contain.text', currentTask5.name);
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
      .should('have.length', 5)
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
      .should('have.length', 5)
      .should('contain.text', currentTask1.name)
      .should('contain.text', currentTask2.name + nameExtra)
      .should('contain.text', currentTask2.description + descriptionExtra)
      .should('contain.text', currentTask3.name);
  });

  it('Search', () => {
    //
    cy.getBySel('searchInput').should('be.visible').type('N');
    cy.getBySel('list-item').should('be.visible').should('have.length', 5);
    cy.getBySel('searchInput').should('be.visible').type('a');
    cy.getBySel('list-item').should('be.visible').should('have.length', 5);
    cy.getBySel('searchInput').should('be.visible').type('m');
    cy.getBySel('list-item').should('be.visible').should('have.length', 3);
    cy.getBySel('searchInput').should('be.visible').type('e');
    cy.getBySel('list-item').should('be.visible').should('have.length', 3);
    cy.getBySel('searchInput').should('be.visible').type('2');
    cy.getBySel('list-item').should('be.visible').should('have.length', 1);
  });
});
