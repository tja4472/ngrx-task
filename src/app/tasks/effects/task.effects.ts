import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY } from 'rxjs';
import { concatMap, tap, withLatestFrom } from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';

import * as TaskActions from '../actions/task.actions';
import { TaskSelectors } from '../selectors';
import { TodoDataService } from '../services/todo.data.service';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY)
    )
  );

  @Effect({ dispatch: false })
  newCurrentTask$ = this.actions$.pipe(
    ofType(TaskActions.currentTasksPageNewCurrentTask),
    // withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(() => {
      console.log('Effect:newCurrentTask');

      this.router.navigate(['/edit', 'new']);
    })
  );

  @Effect({ dispatch: false })
  removeCurrentTodo$ = this.actions$.pipe(
    ofType(TaskActions.currentTaskDetailsPageRemoved),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:removeCurrentTodo$:A', {
        action,
        user,
      });

      this.todoDataService.removeItem(action.todo.id, user.todoListId, user.id);
    })
  );

  @Effect({ dispatch: false })
  saveCurrentTodo$ = this.actions$.pipe(
    ofType(TaskActions.currentTaskDetailsPageSaved),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:saveCurrentTodo$:A', {
        action,
        user,
      });

      this.todoDataService.save(action.todo, user.todoListId, user.id);
    })
  );

  /*
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$.pipe(
    ofType(TodoActionTypes.UPSERT_ITEM),
    map((action: UpsertItem) => action.payload),
    tap((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload.item, payload.todoListId, payload.userId);
    })
  );  
  */

  constructor(
    private actions$: Actions,
    private todoDataService: TodoDataService,
    private store: Store<any>,
    private router: Router
  ) {}
}
