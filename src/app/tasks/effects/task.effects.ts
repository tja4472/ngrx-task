import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY } from 'rxjs';
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
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:removeCompletedTask$', {
        action,
        user,
      });

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
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:savecompletedTask', {
        action,
        user,
      });

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
    // withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(() => {
      console.log('Effect:newCurrentTask');

      this.router.navigate(['/lists/edit', 'new']);
    })
  );

  @Effect({ dispatch: false })
  removeTaskList$ = this.actions$.pipe(
    ofType(TaskActions.taskListDetailPageRemoved),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:removeTaskList$', {
        action,
        user,
      });

      this.todoListsDataService.removeItem(action.todoCompleted.id, user.id);
    })
  );

  @Effect({ dispatch: false })
  saveTaskList$ = this.actions$.pipe(
    ofType(TaskActions.taskListDetailPageSaved),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:saveTaskList$', {
        action,
        user,
      });

      this.todoListsDataService.save(action.todoCompleted, user.id);
    })
  );
  //#endregion
  //
  @Effect({ dispatch: false })
  clearCompleted$ = this.actions$.pipe(
    ofType(TaskActions.currentTasksPageClearCompleted),
    withLatestFrom(
      this.store.select(authQuery.selectAuthUser),
      this.store.select(TaskSelectors.getAllCurrentTasks)
    ),
    tap(([action, user, tasks]) => {
      const completedTasks = tasks.filter((t) => t.isComplete);

      console.log('Effect:clearCompleted$:A', {
        action,
        user,
        completedTasks,
      });

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
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:completedTaskToggled$:A', {
        action,
        user,
      });

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
    ofType(
      TaskActions.currentTaskDetailsPageSaved,
      TaskActions.currentTasksPageSaveItem
    ),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:saveCurrentTodo$:A', {
        action,
        user,
      });

      this.todoDataService.save(action.todo, user.todoListId, user.id);
    })
  );

  @Effect()
  enterLoadData$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser, AuthApiActions.setUserListId),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    switchMap(([action, user]) => [
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

  /*
  @Effect()
  enterLoadData$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser),
    switchMap((user) => [
      new TodoActions.DatabaseListenForDataStart({
        todoListId: user.user.todoListId,
        userId: user.user.id,
      }),
      new TodoCompletedActions.DatabaseListenForDataStart({
        todoListId: user.user.todoListId,
        userId: user.user.id,
      }),
    ])
  );
*/

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
    private fb1DataService: Fb1DataService,
    private todoDataService: TodoDataService,
    private todoCompletedDataService: TodoCompletedDataService,
    private todoListsDataService: TodoListsDataService,
    private store: Store<any>,
    private router: Router
  ) {}
}
