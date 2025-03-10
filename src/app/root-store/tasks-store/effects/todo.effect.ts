/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
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

import * as UserStoreSelectors from '@app/root-store/user-store/selectors';

import { CurrentTaskDataService } from '../../../services/current-task.data.service';

import * as CurrentTasksRootActions from '@app/root-store/tasks-store/actions/current-tasks-root.actions';
import * as CurrentTasksRootGuardServiceActions from '@app/root-store/tasks-store/actions/current-tasks-root-guard-service.actions';
import * as TodoActions from '@app/root-store/tasks-store/actions/todo.action';

import { CurrentTask } from '../models/current-task.model';

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
export class TodoEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private dataService = inject(CurrentTaskDataService);

  listenForData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentTasksRootGuardServiceActions.loadData),
      switchMap(() =>
        this.store.select(UserStoreSelectors.selectUserAndTaskListId).pipe(
          switchMap((a) => {
            if (a === null || a.taskListId === null) {
              const result: CurrentTask[] = [];
              return of(result);
            }
            return this.dataService.getData$(a.taskListId, a.user.id);
          }),
          takeUntil(
            this.actions$.pipe(ofType(CurrentTasksRootActions.destroyed))
          )
        )
      ),
      map((items: CurrentTask[]) =>
        TodoActions.loadSuccess({ currentTasks: items })
      )
    );
  });

  reorderList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodoActions.reorderList),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(UserStoreSelectors.selectUserAndTaskListId)
            )
          )
        ),
        tap(([action, a]) => {
          if (a === null || a.taskListId === null) {
            return;
          }
          this.dataService.reorderItems(action.ids, a.taskListId, a.user.id);
        })
      );
    },
    { dispatch: false }
  );
}
