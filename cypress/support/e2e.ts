// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(
        dataTestAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      getBySelLike(
        dataTestPrefixAttribute: string,
        args?: any
      ): Chainable<JQuery<HTMLElement>>;
      signIn(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      signOut(): Chainable<JQuery<HTMLElement>>;
      signUp(email: string, password: string): Chainable<JQuery<HTMLElement>>;
      visitHomePage(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

/*
// Hide xhr in command log.
// https://github.com/cypress-io/cypress/issues/7362#issuecomment-1168915062
const routes = ['localhost:8080'];

Cypress.on('log:added', (ev) => {
  console.log('>>>', ev.consoleProps?.URL);
  if (
    ev.displayName === 'xhr' &&
    routes.some((route) => ev.consoleProps?.URL.includes(route))
  ) {
    console.log('AAAAA');
    const w: any = window;
    const el: any = Array.from(
      w.top.document.querySelectorAll('.command-wrapper')
    ).slice(-1)[0];
    if (el) {
      console.log('BBBB');      
      el.parentElement.style.display = 'none';
    }
  }
});
*/
