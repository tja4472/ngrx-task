import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';

import { TodoActions } from '../actions';
import { Todo } from '../models';
import { TodoDataService } from '../services/todo.data.service';

@Injectable()
export class TodoEffects {
  //
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private dataService: TodoDataService
  ) {}

  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(
      TodoActions.databaseListenForDataStart,
      TodoActions.databaseListenForDataStop
    ),
    // Watch database node and get items.
    switchMap((action) => {
      if (action.type === TodoActions.databaseListenForDataStop.type) {
        return EMPTY;
      } else {
        return this.dataService
          .getData$(action.todoListId, action.userId)
          .pipe(
            map((items: Todo[]) =>
              TodoActions.loadSuccess({ currentTasks: items })
            )
          );
      }
    })
  );

  @Effect({ dispatch: false })
  reorderList$ = this.actions$.pipe(
    ofType(TodoActions.reorderList),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.dataService.reorderItems(action.ids, user.todoListId, user.id);
    })
  );
}
