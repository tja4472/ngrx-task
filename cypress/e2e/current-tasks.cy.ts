import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';
import * as AppActionsTestService from 'cypress/support/app-actions.service';
import { currentTask1, currentTask2, newCurrentTask, user } from './util';

describe('Current Tasks', () => {
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
    cy.getBySel('sidenav-current-tasks').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('list-item').should('not.exist');
    cy.getBySel('new-current-task-button').should('be.visible');
  });

  describe('Create', () => {
    it('Cancel', () => {
      cy.getBySel('new-current-task-button').click();
      cy.getBySel('submit-button').should('be.disabled');
      cy.getBySel('cancel-button').should('be.enabled');
      cy.getBySel('name-input').type(currentTask1.name);
      cy.getBySel('description-textarea').type(currentTask1.description);
      cy.getBySel('is-complete-checkbox').click();
      cy.getBySel('cancel-button').should('be.enabled').click();
      cy.location('pathname').should('eq', '/tasks/current');
      cy.getBySel('list-item').should('not.exist');
      cy.getBySel('new-current-task-button').should('be.visible');
    });

    it('Submit', () => {
      newCurrentTask(currentTask1);

      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask1.name);
    });
  });

  describe('Update', () => {
    it('Cancel', () => {
      newCurrentTask(currentTask1);

      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask1.name)
        .click();
      cy.location('pathname').should('match', /^\/tasks\/current\/edit/);
      cy.getBySel('submit-button').should('be.disabled');
      cy.getBySel('cancel-button').should('be.enabled');
      cy.getBySel('remove-button').should('be.enabled');
      cy.getBySel('name-input').type('AAAAA');
      cy.getBySel('description-textarea').type('BBBBB');
      cy.getBySel('submit-button').should('be.enabled');
      cy.getBySel('cancel-button').should('be.enabled').click();
      cy.location('pathname').should('match', /^\/tasks\/current;id=/);
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask1.name);
    });

    it('Submit', () => {
      const nameExtra = 'AAAAA';
      const descriptionExtra = 'BBBBBB';

      newCurrentTask(currentTask1);

      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask1.name)
        .click();
      cy.location('pathname').should('match', /^\/tasks\/current\/edit/);
      cy.getBySel('submit-button').should('be.disabled');
      cy.getBySel('cancel-button').should('be.enabled');
      cy.getBySel('remove-button').should('be.enabled');
      cy.getBySel('name-input').type(nameExtra);
      cy.getBySel('description-textarea').type(descriptionExtra);
      cy.getBySel('submit-button').should('be.enabled').click();
      cy.location('pathname').should('match', /^\/tasks\/current;id=/);
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask1.name + nameExtra)
        .should('contain.text', currentTask1.description + descriptionExtra);
    });

    it('Remove', () => {
      newCurrentTask(currentTask1);
      newCurrentTask(currentTask2);
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 2)
        .should('contain.text', currentTask1.name)
        .should('contain.text', currentTask2.name);
      cy.contains('a', currentTask1.name).should('be.visible').click();
      cy.location('pathname').should('match', /^\/tasks\/current\/edit/);
      cy.getBySel('submit-button').should('be.disabled');
      cy.getBySel('cancel-button').should('be.enabled');
      cy.getBySel('remove-button').should('be.enabled').click();
      cy.location('pathname').should('match', /^\/tasks\/current;id=/);
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .should('contain.text', currentTask2.name);
    });
  });

  describe('Is Completed', () => {
    it('Mark and Clear', () => {
      newCurrentTask(currentTask1);
      newCurrentTask(currentTask2);
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 2)
        .contains(currentTask1.name)
        .parentBySel('list-item')
        .as('listItem');
      cy.get('@listItem').find('[data-test=is-complete-checkbox]').click();
      cy.get('@listItem')
        .findBySel('is-complete-checkbox')
        .find('[type="checkbox"]')
        .should('be.checked');
      cy.getBySel('vert-menu-button').should('be.visible').click();
      cy.getBySel('clear-completed-button')
        .should('be.visible')
        .contains('Clear Completed')
        .click();
      cy.getBySel('list-item')
        .should('be.visible')
        .should('have.length', 1)
        .contains(currentTask2.name);
    });
  });
});
