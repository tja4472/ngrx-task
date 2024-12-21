/* eslint-disable @typescript-eslint/require-await */

import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SignInPageActions } from '@app/auth/actions/sign-in-page.actions';

import * as SignInPageSelectors from '@app/auth/selectors/sign-in-page.selectors';

import { SignInPageComponent } from './sign-in-page.component';

import { Credentials } from '@app/auth/models/credentials.model';

function setup({
  errorMessage = null,
  pending = false,
}: {
  errorMessage?: null | string;
  pending?: boolean;
}) {
  TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, SignInPageComponent],
    declarations: [],
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
  });

  const mockStore = TestBed.inject(MockStore);
  const mockStoreDispatchSpy = jest.spyOn(mockStore, 'dispatch');

  const fixture = TestBed.createComponent(SignInPageComponent);
  const instance = fixture.componentInstance;

  return {
    fixture,
    instance,
    mockStore,
    mockStoreDispatchSpy,
  };
}

describe('SignInPageComponent', () => {
  it('should dispatch entered action', () => {
    const { fixture, mockStoreDispatchSpy } = setup({});
    fixture.detectChanges();
    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(
      SignInPageActions.entered()
    );
  });

  it('should dispatch signIn action', async () => {
    const { instance, mockStoreDispatchSpy } = setup({});

    const credentials: Credentials = {
      username: 'fred',
      password: 'apassword',
    };

    const signInAction = SignInPageActions.signIn({
      credentials,
    });

    instance.onSubmitted(credentials);

    expect(mockStoreDispatchSpy).toHaveBeenCalledWith(signInAction);
  });
});
