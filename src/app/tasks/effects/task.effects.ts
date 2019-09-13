import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import * as TaskActions from '../actions/task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    )
  );

  constructor(private actions$: Actions) {}
}
