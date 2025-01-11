import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import * as AuthActions from '@app/auth/actions/auth.actions';

import * as HomePageActions from '../actions/home-page.actions';

/* =======================================
Improve typings of createEffect, help debugging
https://github.com/ngrx/platform/issues/2192

effect$ = createEffect(() => {
  return this.actions$.pipe(
    ...
  );
});

effectDispatchFalse$ = createEffect(
  () => {
    return this.actions$.pipe(
      ...
    );
  },
  { dispatch: false }
);
======================================= */

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HomePageActions.signOut),
      map(() => AuthActions.signOutConfirmation())
    );
  });
}
