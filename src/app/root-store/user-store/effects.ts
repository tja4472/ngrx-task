import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { from, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';
import { UserInfoDataService } from '@app/services/user-info.data.service';

import * as featureActions from './actions';
import * as featureSelectors from './selectors';

@Injectable()
export class UserStoreEffects {
  @Effect()
  haveFirebaseUser$ = this.actions$.pipe(
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

  @Effect()
  setData$ = this.actions$.pipe(
    ofType(featureActions.setData),
    map(({ user }) => user),
    switchMap((user) => [
      featureActions.haveUser({
        userId: user.id,
      }),
      AuthApiActions.haveAppUser(),
    ])
  );
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
