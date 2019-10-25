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

import { AuthActions, AuthApiActions } from '@app/auth/actions';
import {
  UserStoreActions,
  UserStoreSelectors,
} from '@app/root-store/user-store';
import { TaskListDataService } from '@app/services/task-list.data.service';

import * as featureActions from './actions';

@Injectable()
export class TaskListEffects {
  constructor(
    private actions$: Actions,
    private dataService: TaskListDataService,
    private store: Store<{}>
  ) {}

  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(UserStoreActions.haveUser),
    map((action) => featureActions.listenForData({ userId: action.userId }))
  );

  /*
    @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser, AuthApiActions.signInSuccess),
    map((action) => featureActions.listenForData({ userId: action.user.id }))
  );
  */
  /*
  @Effect()
  listenForDataOrig$ = this.actions$.pipe(
    ofType(TodoListsActions.listenForData, TodoListsActions.unlistenForData),
    tap((x) => {
      // console.log('Effect:listenForData$:A', x);
    }),
    switchMap((action) => {
      // console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoListsActions.unlistenForData.type) {
        // console.log('TodoAction.UNLISTEN_FOR_DATA');
        return EMPTY;
      } else {
        return this.dataService
          .getData(action.userId)
          .pipe(
            map((items) =>
              TodoListsActions.loadSuccess({ items })
            )
          );
      }
    }),
    tap((x) => {
      // console.log('xxxxxEffect:listenForData$:B', x);
    })
  );
*/
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(featureActions.listenForData),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
      )
    ),
    map(([_, user]) => user),
    filter((user) => user !== null),
    switchMap((user) =>
      this.dataService
        .getData(user.id)
        .pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActions.signOutComplete)))
        )
    ),
    map((items) => featureActions.loadSuccess({ items }))
  );
}
