import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { from, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';
import { UserInfoDataService } from '@app/services/user-info.data.service';

import * as featureActions from './actions';
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
  haveFirebaseUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.haveFirebaseUser),
      concatMap((firebaseUser) =>
        from(this.userInfoDataService.getUserData(firebaseUser.uid)).pipe(
          map((userInfo) =>
            featureActions.setData({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName,
              },
              taskListId: userInfo.todoListId,
            })
          )
        )
      )
    );
  });

  setData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(featureActions.setData),
      map(({ user }) => user),
      switchMap((user) => [
        featureActions.haveUser({
          userId: user.id,
        }),
        AuthApiActions.haveAppUser(),
      ])
    );
  });

  setUserListId$ = createEffect(
    () => {
      return this.actions$.pipe(
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
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{}>,
    private userInfoDataService: UserInfoDataService
  ) {}
}
