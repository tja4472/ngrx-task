import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import {
  concatMap,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { UserStoreSelectors } from '@app/root-store/user-store';

import { CurrentTaskDataService } from '../../../services/current-task.data.service';
import {
  CurrentTasksRootActions,
  CurrentTasksRootGuardServiceActions,
  TodoActions,
} from '../actions';
import { CurrentTask } from '../models';

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
  // this needs to allow for the todoListId changing
  // whilst active.
  // Also should not getData if the todoListId changes
  // and the current tasks are not being shown.
  /*  
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(CurrentTasksRootGuardServiceActions.loadData),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser)),
        tap(() => console.log('##'))
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
    // takeUntil(this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed)))
  );
*/

  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(CurrentTasksRootGuardServiceActions.loadData),
    switchMap(() =>
      this.store.select(UserStoreSelectors.selectUserAndTaskListId).pipe(
        switchMap(({ user, taskListId }) =>
          this.dataService.getData$(taskListId, user.id)
        ),
        takeUntil(this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed)))
      )
    ),
    map((items: CurrentTask[]) =>
      TodoActions.loadSuccess({ currentTasks: items })
    )
  );

  /*
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType(CurrentTasksRootGuardServiceActions.loadData),
    switchMap(() =>
      this.store.select(UserStoreSelectors.selectUser).pipe(
        switchMap((user) =>
          this.dataService.getData$(user.aaaataskListId, user.id)
        ),
        takeUntil(this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed)))
      )
    ),
    map((items: CurrentTask[]) =>
      TodoActions.loadSuccess({ currentTasks: items })
    )
  );  
  */

  @Effect({ dispatch: false })
  reorderList$ = this.actions$.pipe(
    ofType(TodoActions.reorderList),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),
    tap(([action, { user, taskListId }]) => {
      this.dataService.reorderItems(action.ids, taskListId, user.id);
    })
  );
}
