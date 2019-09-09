import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import * as HomeActions from '../actions/home.actions';

@Injectable()
export class HomeEffects {
  loadHomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHomes),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    )
  );

  constructor(private actions$: Actions) {}
}
