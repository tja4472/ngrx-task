import { Injectable } from '@angular/core';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { AuthActions } from '@app/auth/actions';

import { HomePageActions } from '../actions';

// import * as HomeActions from '../actions/home-page.actions';

@Injectable()
export class HomeEffects {
  loadHomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.loadHomes),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    )
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(HomePageActions.signOut),
    map(() => AuthActions.signOutConfirmation())
  );

  constructor(private actions$: Actions) {}
}
