import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthApiActions } from '@app/auth/actions';
import { authQuery } from '@app/auth/selectors/auth.selectors';
import { TaskSelectors } from '@app/tasks/selectors';

import { TaskActions, TodoActions, TodoCompletedActions } from '../actions';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoCompletedDataService } from '../services/todo-completed.data.service';
import { TodoListsDataService } from '../services/todo-lists.data.service';
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

  //#region Completed Tasks
  @Effect({ dispatch: false })
  removeCompletedTask$ = this.actions$.pipe(
    ofType(TaskActions.completedTaskDetailsPageRemoved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.todoCompletedDataService.removeItem(
        action.todoCompleted.id,
        user.todoListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  savecompletedTask$ = this.actions$.pipe(
    ofType(TaskActions.completedTaskDetailsPageSaved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.todoCompletedDataService.save(
        action.todoCompleted,
        user.todoListId,
        user.id
      );
    })
  );
  //#endregion

  //#region Task Lists
  @Effect({ dispatch: false })
  newTaskList$ = this.actions$.pipe(
    ofType(TaskActions.TaskListPageNewTaskList),
    tap(() => {
      this.router.navigate(['/lists/edit', 'new']);
    })
  );

  @Effect({ dispatch: false })
  removeTaskList$ = this.actions$.pipe(
    ofType(TaskActions.taskListDetailPageRemoved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.todoListsDataService.removeItem(action.todoCompleted.id, user.id);
    })
  );

  @Effect({ dispatch: false })
  saveTaskList$ = this.actions$.pipe(
    ofType(TaskActions.taskListDetailPageSaved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.todoListsDataService.save(action.todoCompleted, user.id);
    })
  );
  //#endregion
  //
  @Effect({ dispatch: false })
  clearCompleted$ = this.actions$.pipe(
    ofType(TaskActions.currentTasksPageClearCompleted),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(authQuery.selectAuthUser),
          this.store.select(TaskSelectors.getAllCurrentTasks)
        )
      )
    ),

    tap(([action, user, tasks]) => {
      const completedTasks = tasks.filter((t) => t.isComplete);

      this.fb1DataService.clearCompletedTodos(
        completedTasks,
        user.todoListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  completedTaskToggled$ = this.actions$.pipe(
    ofType(TaskActions.completedTaskDetailsItemToggled),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.fb1DataService.moveToCurrent(
        action.todoCompleted,
        user.todoListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  newCurrentTask$ = this.actions$.pipe(
    ofType(TaskActions.currentTasksPageNewCurrentTask),
    tap(() => {
      this.router.navigate(['/edit', 'new']);
    })
  );

  @Effect({ dispatch: false })
  removeCurrentTodo$ = this.actions$.pipe(
    ofType(TaskActions.currentTaskDetailsPageRemoved),

    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),

    tap(([action, user]) => {
      this.todoDataService.removeItem(action.todo.id, user.todoListId, user.id);
    })
  );

  @Effect({ dispatch: false })
  saveCurrentTodo$ = this.actions$.pipe(
    ofType(
      TaskActions.currentTaskDetailsPageSaved,
      TaskActions.currentTasksPageSaveItem
    ),

    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    tap(([action, user]) => {
      this.todoDataService.save(action.todo, user.todoListId, user.id);
    })
  );

  @Effect()
  enterLoadData$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser, AuthApiActions.setUserListId),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(authQuery.selectAuthUser))
      )
    ),
    switchMap(([_, user]) => [
      TodoActions.databaseListenForDataStart({
        todoListId: user.todoListId,
        userId: user.id,
      }),
      TodoCompletedActions.databaseListenForDataStart({
        todoListId: user.todoListId,
        userId: user.id,
      }),
    ])
  );

  constructor(
    private actions$: Actions,
    private fb1DataService: Fb1DataService,
    private todoDataService: TodoDataService,
    private todoCompletedDataService: TodoCompletedDataService,
    private todoListsDataService: TodoListsDataService,
    private store: Store<any>,
    private router: Router
  ) {}
}
