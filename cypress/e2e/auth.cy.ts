import { clearDatabase, clearUserAccounts } from 'emulator/emulator-helpers';

const user = {
  email: 'c.c@c.com',
  password: 'password',
} as const;

describe('Auth', () => {
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
  });

  it('sign-in', () => {
    cy.signUp(user.email, user.password);
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
    cy.signUp(user.email, user.password);
    cy.signOut();
    cy.signIn('invalid-email', user.password);
    cy.getBySel('message-error')
      .should('be.visible')
      .should('contain.text', 'Firebase: Error (auth/invalid-email).');
  });

  it('sign-in: wrong password', () => {
    cy.signUp(user.email, user.password);
    cy.signOut();
    cy.signIn(user.email, 'incorrect-password');
    cy.getBySel('message-error')
      .should('be.visible')
      .should('contain.text', 'Firebase: Error (auth/wrong-password).');
  });

  it('auto-sign-in', () => {
    cy.signUp(user.email, user.password);
    cy.visit('/');
    // Autologin??
    cy.location('pathname').should('eq', '/home');
    cy.getBySel('user-name')
      .should('be.visible')
      .should('contain.text', user.email);
    cy.getBySel('task-list-name')
      .should('be.visible')
      .should('contain.text', 'default-list name');
  });

  it('sign-up', () => {
    cy.signUp(user.email, user.password);
  });

  it('sign-out', () => {
    cy.signUp(user.email, user.password);
    cy.signOut();
  });
});
