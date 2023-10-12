/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import * as SidenavActions from '@app/core/components/sidenav/actions/sidenav.actions';
import { UserInfoDataService } from '@app/services/user-info.data.service';

import * as featureSelectors from './selectors';

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
export class UserStoreEffects {
  setUserListId$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SidenavActions.selectTaskListId),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(this.store.select(featureSelectors.selectUser))
          )
        ),
        tap(([action, user]) => {
          const saveUser = { ...user, todoListId: action.taskListId };

          if (user !== null) {
            this.userInfoDataService.save(saveUser, user.id);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private readonly store: Store,
    private userInfoDataService: UserInfoDataService
  ) {}
}
