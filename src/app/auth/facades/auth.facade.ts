import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '@app/models';
import { UserStoreSelectors } from '@app/root-store/user-store';

import { SignInPageSelectors, SignUpPageSelectors } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public authUser$: Observable<User>;

  public signInPageError$: Observable<string>;

  public signInPagePending$: Observable<boolean>;

  public signUpPageError$: Observable<string>;

  public signUpPagePending$: Observable<boolean>;

  constructor(private store: Store<{}>) {
    this.authUser$ = store.pipe(select(UserStoreSelectors.selectUser));

    this.signInPageError$ = store.pipe(
      select(SignInPageSelectors.selectSignInPageError)
    );

    this.signInPagePending$ = store.pipe(
      select(SignInPageSelectors.selectSignInPagePending)
    );

    this.signUpPageError$ = store.pipe(
      select(SignUpPageSelectors.selectSignUpPageError)
    );

    this.signUpPagePending$ = store.pipe(
      select(SignUpPageSelectors.selectSignUpPagePending)
    );
  }

  public dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
