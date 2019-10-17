import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import * as featureActions from './actions';

@Injectable()
export class UserStoreEffects {
  constructor(private actions$: Actions, private store: Store<any>) {}
}
