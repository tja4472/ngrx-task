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
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import * as featureActions from './actions';
import * as featureSelectors from './selectors';

@Injectable()
export class UserStoreEffects {
  @Effect({ dispatch: false })
  setUserListId$ = this.actions$.pipe(
    ofType(featureActions.setTaskListId),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(featureSelectors.selectUser))
      )
    ),
    tap(([action, user]) => {
      const saveUser = { ...user, todoListId: action.taskListId };

      this.userInfoDataService.save(saveUser, user.id);
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userInfoDataService: UserInfoDataService
  ) {}
}
