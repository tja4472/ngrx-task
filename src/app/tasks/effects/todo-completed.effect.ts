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

import { authQuery } from '@app/auth/selectors/auth.selectors';

import {
  CompletedTasksRootActions,
  CompletedTasksRootGuardServiceActions,
  TodoCompletedActions,
} from '../actions';
import { CompletedTask } from '../models';
import { CompletedTaskDataService } from '../services/completed-task.data.service';

@Injectable()
export class TodoCompletedEffects {
  //
  constructor(
    private actions$: Actions,
    private dataService: CompletedTaskDataService,
    private store: Store<any>
  ) {}

  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(CompletedTasksRootGuardServiceActions.loadData),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    // tap(([action, user]) => console.log('}}}}}}}}}}', user)),
    filter(([action, user]) => user !== null),
    switchMap(([action, user]) =>
      this.dataService
        .getData(user.todoListId, user.id)
        .pipe(
          takeUntil(
            this.actions$.pipe(ofType(CompletedTasksRootActions.destroyed))
          )
        )
    ),
    map((items: CompletedTask[]) =>
      TodoCompletedActions.loadSuccess({ completedTasks: items })
    )
  );

  /*
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(
      TodoCompletedActions.databaseListenForDataStart,
      TodoCompletedActions.databaseListenForDataStop
    ),
    // Watch database node and get items.
    switchMap((action) => {
      if (action.type === TodoCompletedActions.databaseListenForDataStop.type) {
        return EMPTY;
      } else {
        return this.dataService
          .getData(action.todoListId, action.userId)
          .pipe(
            map((items: CompletedTask[]) =>
              TodoCompletedActions.loadSuccess({ completedTasks: items })
            )
          );
      }
    })
  );
*/
}
