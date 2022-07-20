import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('Task Lists', () => {
  beforeEach(() => {
    // Runs before every test block
    // Force sidenav to be shown.
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1'));
    cy.wrap(clearUserAccounts('demo-1'));
    cy.visit('/');
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', 'Not Signed In');
    cy.signUp(user.email, user.password);
    cy.getBySel('sidenav-task-lists').should('be.visible').click();
    cy.location('pathname').should('eq', '/tasks/lists');
  });

  it.skip('Task Lists page', () => {
    // Edit Cancel test
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name')
      .click();
    cy.location('pathname').should('eq', '/tasks/lists/edit/default-list');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-field').type('GGGG');
    cy.getBySel('submit-button').should('be.enabled');
    cy.getBySel('cancel-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists;id=default-list');
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name');
    // Edit Submit test
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list name')
      .click();
    cy.location('pathname').should('eq', '/tasks/lists/edit/default-list');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('remove-button').should('be.enabled');
    cy.getBySel('name-field').type('GGGG');
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists;id=default-list');
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list nameGGGG');
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list nameGGGG');
    // Create Cancel test
    cy.getBySel('create-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('name-field').type('BBBB');
    cy.getBySel('cancel-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 1)
      .should('contain.text', 'default-list nameGGGG');
    // Create Submit test
    cy.getBySel('create-task-list-button').should('be.enabled').click();
    cy.location('pathname').should('eq', '/tasks/lists/new');
    cy.getBySel('submit-button').should('be.disabled');
    cy.getBySel('cancel-button').should('be.enabled');
    cy.getBySel('name-field').type('BBBB');
    cy.getBySel('submit-button').should('be.enabled').click();
    cy.getBySel('list-item')
      .should('have.length', 2)
      .should('contain.text', 'default-list nameGGGG')
      .should('contain.text', 'BBBB');
    // Edit Remove test
    cy.getBySel('list-item').should('have.length', 2).find('BBBB').click();
    /*
    cy.getBySel('item-name').should('have.length', 2)
    .eq(0)
    .should('contain.text', 'Second task');
    */
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
    cy.getBySel('create-task-list-button').should('be.enabled').click();
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
    cy.getBySel('create-task-list-button').should('be.enabled').click();
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
    cy.getBySel('create-task-list-button').should('be.enabled').click();
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
