import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

/*
const gotoHomePage = () =>
  cy
    .visit('/')
    .location('pathname')
    .should('eq', '/home')
    .getBySel('sign-out-button')
    .should('be.visible');
*/

describe('Main tests', () => {
  beforeEach(() => {
    // Runs before every test block
    cy.viewport('ipad-2', 'landscape');
    cy.wrap(clearDatabase('demo-1')).should('be.a', 'number').and('equal', 200);
    cy.wrap(clearUserAccounts('demo-1'))
      .should('be.a', 'number')
      .and('equal', 200);

    cy.signUp(user.email, user.password);
  });

  it('sidenav', () => {
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', user.email);
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list name');
  });

  it('sign out and sign in(ngrx)', () => {
    cy.signOut();
    cy.location('pathname').should('eq', '/sign-in');
    cy.getBySel('sign-up-button').should('be.visible');
    cy.getBySel('username-field').type(user.email);
    cy.getBySel('password-field').type(user.password);
    cy.getBySel('sign-in-button').click();
    // Home page
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('sign-out-button').should('be.visible');
  });

  it('sign out and sign in(component-store)', () => {
    cy.getBySel('sign-out-button').click();
    // Dialog
    cy.getBySel('ok-button').click();
    cy.getBySel('sidenav-sign-in-component-store').click();
    cy.getBySel('sign-up-button').should('be.visible');
  });

  it('main test', () => {
    cy.getBySel('sidenav-current-tasks').click();
    // Current tasks page
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('new-current-task-button').should('be.visible');
    cy.getBySel('sidenav-completed-tasks').click();
    // Completed Tasks page
    cy.location('pathname').should('eq', '/tasks/completed');
    cy.getBySel('search-field').should('be.visible');
    cy.getBySel('sidenav-task-lists').click();
    // Task Lists page
    cy.location('pathname').should('eq', '/tasks/lists');
    cy.getBySel('task-lists-page').should('be.visible');
    cy.getBySel('sidenav-current-tasks').click();
    // Current tasks page
    cy.getBySel('new-current-task-button').should('be.visible').click();
    // New Current Task page
    cy.location('pathname').should('eq', '/tasks/current/new');
    cy.get('#name').type('First task');
    cy.get('#description').type('First task description');
    cy.get('.mat-card-actions > .mat-primary').click();
    // Current tasks page
    cy.location('pathname').should('eq', '/tasks/current');
    cy.getBySel('new-current-task-button').should('be.visible').click();
    // New Current Task page
    cy.location('pathname').should('eq', '/tasks/current/new');
    cy.get('#name').type('Second task');
    cy.get('#description').type('Second task description');
    cy.get('.mat-card-actions > .mat-primary').click();
    //
    // https://medium.com/slido-dev-blog/cypress-tips-4-testing-lists-of-items-dccd4b688816
    cy.getBySel('list-item').should('have.length', 2);
    cy.getBySel('item-name').should('have.length', 2);
    // Insert order seems to be random!!!
    // https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-8_9
    // Need to add timestamp.
    /*
    cy.getBySel('item-name').should('have.length', 2)
    .eq(0)
    .should('contain.text', 'Second task');
    */
    // cy.getBySel('list-item').then((items) => {});
    cy.getBySel('item-name').eq(0).click();
    cy.location('pathname').should('match', /^\/tasks\/current\/edit/);
    // cancel
    // remove
  });
});
