/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/*
This is a test of Cypress component testing.

Using Jest and sign-in-page.component.spec.ts seems preferable.

TODO: test for SignInPageActions.entered from ngOnInit

test selectors
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';

import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';
import { SignInPageSelectors } from '@app/auth/selectors';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { CredentialsFormComponent } from '@app/auth/components/credentials-form/credentials-form.component';

import { Credentials } from '@app/auth/models/credentials.model';

import { SignInPageActions } from '@app/auth/actions/sign-in-page.actions';

const errorMessage = null;
const pending = false;

describe('CredentialsFormComponent - mounts', () => {
  it('mounts', () => {
    let store: MockStore;

    cy.mount(`<app-sign-in-page></app-sign-in-page>`, {
      imports: [
        CommonModule,
        CredentialsFormComponent,
        BrowserAnimationsModule,
      ],
      declarations: [SignInPageComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: SignInPageSelectors.selectSignInPageError,
              value: errorMessage,
            },
            {
              selector: SignInPageSelectors.selectSignInPagePending,
              value: pending,
            },
          ],
        }),
      ],
    }).then(() => {
      store = TestBed.inject(MockStore);
      expect(store).to.be.an('object');
    });
  });
});

describe('CredentialsFormComponent', () => {
  let store: MockStore;

  beforeEach(() => {
    cy.mount(`<app-sign-in-page></app-sign-in-page>`, {
      imports: [
        CommonModule,
        CredentialsFormComponent,
        BrowserAnimationsModule,
      ],
      declarations: [SignInPageComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: SignInPageSelectors.selectSignInPageError,
              value: errorMessage,
            },
            {
              selector: SignInPageSelectors.selectSignInPagePending,
              value: pending,
            },
          ],
        }),
      ],
    }).then(() => {
      console.log('BBBB');
      store = TestBed.inject(MockStore);
      expect(store).to.be.an('object');
      console.log('AAAA');
      // cy.spy(store, 'dispatch').as('aSpy');
      // expect(store.dispatch).to.have.been.called;
    });
  });

  it('SignInPageActions.signIn action', () => {
    cy.spy(store, 'dispatch');

    // expect(store.dispatch).to.have.been.called;

    // expect(this.aSpy).to.have.been.called;
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
    cy.getBySel('sign-in-button').then(() => {
      expect(store.dispatch).to.have.been.called;

      const signInAction = SignInPageActions.signIn({
        credentials: expectedSubmitedResponse,
      });

      expect(store.dispatch).to.have.been.calledOnceWith(signInAction);
    });
  });

  it('SignInPageActions.showSignUpPage action', () => {
    cy.spy(store, 'dispatch');

    cy.getBySel('sign-up-button').click();
    cy.getBySel('sign-up-button').then(() => {
      //        expect(store.dispatch).to.have.been.called;

      expect(store.dispatch).to.have.been.calledOnceWith(
        SignInPageActions.showSignUpPage()
      );
    });
  });
});
