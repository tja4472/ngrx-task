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
  public signUpPageError$: Observable<string>;

  public signUpPagePending$: Observable<boolean>;

  constructor(private store: Store<{}>) {
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
