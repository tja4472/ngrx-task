import { APP_ID } from '@angular/core';

const SERVICE_NAME = 'AppActionsService';

export const getService = () =>
  cy.window().should('have.property', SERVICE_NAME);

export const getProperty = () =>
  getService()
    .should('have.a.property', 'property')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    .then((s) => <string>(<unknown>s));

export const callMethod1 = (text: string) =>
  cy.window().its(SERVICE_NAME).invoke('method1', text);

export const callPromise1 = (text: string) =>
  cy
    .window()
    .its(SERVICE_NAME)
    .then((api) => api.promise1(text));

export const callSignUp = (email: string, password: string) =>
  // cy.window().its(SERVICE_NAME).invoke('signUp', email, password);
  cy
    .window()
    .its(SERVICE_NAME)
    .then((api) => api.signUp(email, password));
