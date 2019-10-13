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

import { AuthApiActions } from '@app/auth/actions';
import { authQuery } from '@app/auth/selectors/auth.selectors';

import {
  CurrentTasksRootActions,
  CurrentTasksRootGuardServiceActions,
  TodoActions,
} from '../actions';
import { CurrentTask } from '../models';
import { CurrentTaskDataService } from '../services/current-task.data.service';

@Injectable()
export class TodoEffects {
  //
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private dataService: CurrentTaskDataService
  ) {}
  /*
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
            map((items: CurrentTask[]) =>
              TodoActions.loadSuccess({ currentTasks: items })
            )
          );
      }
    })
  );
*/
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(CurrentTasksRootGuardServiceActions.loadData),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    // tap(([action, user]) => console.log('}}}}}}}}}}', user)),
    filter(([action, user]) => user !== null),
    switchMap(([action, user]) =>
      this.dataService
        .getData$(user.todoListId, user.id)
        .pipe(
          takeUntil(
            this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed))
          )
        )
    ),
    map((items: CurrentTask[]) =>
      TodoActions.loadSuccess({ currentTasks: items })
    )
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
