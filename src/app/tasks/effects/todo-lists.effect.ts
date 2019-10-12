import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';

import { TodoListsActions } from '../actions';
import { TaskListDataService } from '../services/task-list.data.service';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions<AuthApiActions.AuthApiActionsUnion>,
    private dataService: TaskListDataService
  ) {}

  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser.type),
    map((action) => TodoListsActions.listenForData({ userId: action.user.id }))
  );

  @Effect()
  authListenForAuthNoUser$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInNoUser.type),
    map(() => TodoListsActions.unlistenForData())
  );

  @Effect()
  listenForData$ = this.actions$.pipe(
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
              TodoListsActions.loadSuccess({ items, userId: action.userId })
            )
          );
      }
    }),
    tap((x) => {
      // console.log('xxxxxEffect:listenForData$:B', x);
    })
  );
}
