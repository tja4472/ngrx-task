import { NgModule } from '@angular/core';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SignInPageSelectors } from '@app/auth/selectors';

const errorMessage = null;
const pending = false;

// This is required as it doesn't work when used in cy.mount.
@NgModule({
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
})
export class TestModule {}
