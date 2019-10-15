import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';
import { authQuery } from '@app/auth/selectors/auth.selectors';

import { TaskListDataService } from '../../../services/task-list.data.service';
import { TodoListsActions } from '../actions';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions<AuthApiActions.AuthApiActionsUnion>,
    private dataService: TaskListDataService,
    private store: Store<any>
  ) {}

  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(
      AuthApiActions.autoSignInHaveUser.type,
      AuthApiActions.signInSuccess.type
    ),
    map((action) => TodoListsActions.listenForData({ userId: action.user.id }))
  );

  @Effect()
  authListenForAuthNoUser$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInNoUser.type),
    map(() => TodoListsActions.unlistenForData())
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
    ofType(TodoListsActions.listenForData),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    // tap(([action, user]) => console.log('}}}}}}}}}}', user)),
    filter(([action, user]) => user !== null),
    switchMap(([action, user]) =>
      this.dataService
        .getData(user.id)
        .pipe(
          takeUntil(this.actions$.pipe(ofType(AuthApiActions.signOutComplete)))
        )
    ),
    map((items) => TodoListsActions.loadSuccess({ items }))
  );
}
