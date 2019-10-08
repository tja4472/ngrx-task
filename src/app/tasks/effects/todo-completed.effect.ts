import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { TodoCompletedActions } from '../actions';
import { CompletedTask } from '../models';
import { CompletedTaskDataService } from '../services/completed-task.data.service';

@Injectable()
export class TodoCompletedEffects {
  //
  constructor(
    private actions$: Actions,
    private dataService: CompletedTaskDataService
  ) {}

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
}
