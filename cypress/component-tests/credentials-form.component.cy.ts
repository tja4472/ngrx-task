/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CredentialsFormComponent } from '@app/auth/components/credentials-form/credentials-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Credentials } from '@app/auth/models/credentials.model';

import { createOutputSpy } from 'cypress/angular';

describe('CredentialsFormComponent - mounts', () => {
  it('mounts', () => {
    cy.mount(`<app-credentials-form></app-credentials-form>`, {
      imports: [CredentialsFormComponent, BrowserAnimationsModule],
    });
  });
});

describe('CredentialsFormComponent - Sign In', () => {
  it('should default to Sign In Form', () => {
    cy.mount(`<app-credentials-form></app-credentials-form>`, {
      imports: [CredentialsFormComponent, BrowserAnimationsModule],
    });

    cy.getBySel('card-title')
      .should('be.visible')
      .should('have.text', 'Sign In');
    cy.getBySel('sign-in-button').should('be.visible').should('be.disabled');
    cy.getBySel('sign-up-button').should('be.visible').should('be.enabled');
    cy.getBySel('username-field').should('be.visible').should('be.enabled');
    cy.getBySel('password-field').should('be.visible').should('be.enabled');
  });

  it('should be Sign In Form', () => {
    cy.mount(
      `<app-credentials-form formMode="SignInForm" ></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
      }
    );

    cy.getBySel('card-title')
      .should('be.visible')
      .should('have.text', 'Sign In');
    cy.getBySel('sign-in-button').should('be.visible').should('be.disabled');
    cy.getBySel('sign-up-button').should('be.visible').should('be.enabled');
    cy.getBySel('username-field').should('be.visible').should('be.enabled');
    cy.getBySel('password-field').should('be.visible').should('be.enabled');
  });

  it('should be Sign In Form if formMode is incorrect', () => {
    cy.mount(
      `<app-credentials-form formMode="incorrectMode" ></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
      }
    );

    cy.getBySel('card-title')
      .should('be.visible')
      .should('have.text', 'Sign In');
    cy.getBySel('sign-in-button').should('be.visible').should('be.disabled');
    cy.getBySel('sign-up-button').should('be.visible').should('be.enabled');
    cy.getBySel('username-field').should('be.visible').should('be.enabled');
    cy.getBySel('password-field').should('be.visible').should('be.enabled');
  });

  it('submitted output', () => {
    cy.mount(
      `<app-credentials-form [pending]="false" (submitted)="submitted.emit($event)"></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
        componentProperties: {
          submitted: createOutputSpy<Credentials>('submittedSpy'),
        },
      }
    );

    const expectedSubmitedResponse: Credentials = {
      username: 'Fred',
      password: 'passwordAA',
    };

    cy.getBySel('username-field')
      .should('be.visible')
      .type(expectedSubmitedResponse.username);
    cy.getBySel('password-field')
      .should('be.visible')
      .type(expectedSubmitedResponse.password);
    cy.getBySel('sign-in-button').click();

    cy.get('@submittedSpy').should('have.been.called');
    cy.get('@submittedSpy').should(
      'have.been.calledWith',
      expectedSubmitedResponse
    );
  });

  it('SignUpClicked output', () => {
    cy.mount(
      `<app-credentials-form [pending]="false" (SignUpClicked)="SignUpClicked.emit($event)"></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
        componentProperties: {
          SignUpClicked: createOutputSpy('SignUpClickedSpy'),
        },
      }
    );

    cy.getBySel('sign-up-button').click();

    cy.get('@SignUpClickedSpy').should('have.been.called');
  });

  it('should show required errors', () => {
    cy.mount(`<app-credentials-form></app-credentials-form>`, {
      imports: [CredentialsFormComponent, BrowserAnimationsModule],
    });

    cy.getBySel('username-field').should('be.visible').click();
    cy.getBySel('password-field').should('be.visible').click();
    cy.getBySel('username-error')
      .should('be.visible')
      .should('have.text', ' User Name is required ');
    cy.getBySel('username-field').should('be.visible').click();
    cy.getBySel('password-error')
      .should('be.visible')
      .should('have.text', ' Password is required ');
  });

  it('should show error message', () => {
    cy.mount(
      `<app-credentials-form errorMessage="aaaa bbbb cccc"></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
      }
    );

    cy.getBySel('message-error')
      .should('be.visible')
      .should('have.text', ' aaaa bbbb cccc ');
  });
});

describe('CredentialsFormComponent - Sign Up', () => {
  it('should be Sign Up form', () => {
    cy.mount(
      `<app-credentials-form formMode="SignUpForm"></app-credentials-form>`,
      {
        imports: [CredentialsFormComponent, BrowserAnimationsModule],
      }
    );

    cy.getBySel('card-title')
      .should('be.visible')
      .should('have.text', 'Sign Up');
    cy.getBySel('sign-in-button').should('not.exist');
    cy.getBySel('sign-up-button').should('be.visible').should('be.disabled');
    cy.getBySel('username-field').should('be.visible').should('be.enabled');
    cy.getBySel('password-field').should('be.visible').should('be.enabled');
  });
});
