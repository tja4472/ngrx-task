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

import { AuthApiActions } from '@app/auth/actions';
import { authQuery } from '@app/auth/selectors/auth.selectors';
import { TaskListDataService } from '@app/services/task-list.data.service';

import * as featureActions from './actions';

@Injectable()
export class TaskListEffects {
  constructor(
    private actions$: Actions<AuthApiActions.AuthApiActionsUnion>,
    private dataService: TaskListDataService,
    private store: Store<any>
  ) {}

  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser, AuthApiActions.signInSuccess),
    map((action) => featureActions.listenForData({ userId: action.user.id }))
  );

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
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    map(([_, user]) => user),
    filter((user) => user !== null),
    switchMap((user) =>
      this.dataService
        .getData(user.id)
        .pipe(
          takeUntil(this.actions$.pipe(ofType(AuthApiActions.signOutComplete)))
        )
    ),
    map((items) => featureActions.loadSuccess({ items }))
  );
}
