import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { TaskSelectors } from '@app/root-store/tasks-store/selectors';
import { UserStoreSelectors } from '@app/root-store/user-store';

import { CompletedTaskDataService } from '../../../services/completed-task.data.service';
import { CurrentTaskDataService } from '../../../services/current-task.data.service';
import { Fb1DataService } from '../../../services/fb1.data.service';
import { TaskListDataService } from '../../../services/task-list.data.service';
import {
  CompletedTaskDetailEditPageActions,
  CompletedTasksPageActions,
  CurrentTaskDetailEditPageActions,
  CurrentTaskDetailNewPageActions,
  CurrentTasksPageActions,
  TaskActions,
  TaskListDetailEditPageActions,
  TaskListDetailNewPageActions,
  TaskListsPageActions,
  TodoActions,
  TodoCompletedActions,
} from '../actions';

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
    ofType(CompletedTaskDetailEditPageActions.removed),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),
    tap(([action, { user, taskListId }]) => {
      this.todoCompletedDataService.removeItem(
        action.completedTask.id,
        taskListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  savecompletedTask$ = this.actions$.pipe(
    ofType(CompletedTaskDetailEditPageActions.saved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),
    tap(([action, { user, taskListId }]) => {
      this.todoCompletedDataService.save(
        action.completedTask,
        taskListId,
        user.id
      );
    })
  );
  //#endregion

  //#region Task Lists
  @Effect({ dispatch: false })
  newTaskList$ = this.actions$.pipe(
    ofType(TaskListsPageActions.newTaskList),
    tap(() => {
      this.router.navigate(['/tasks/lists/new']);
    })
  );

  @Effect({ dispatch: false })
  removeTaskList$ = this.actions$.pipe(
    ofType(TaskListDetailEditPageActions.removed),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
      )
    ),
    tap(([action, user]) => {
      this.todoListsDataService.removeItem(action.taskList.id, user.id);
    })
  );

  @Effect({ dispatch: false })
  saveTaskList$ = this.actions$.pipe(
    ofType(TaskListDetailNewPageActions.saved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
      )
    ),
    tap(([action, user]) => {
      this.todoListsDataService.save(action.taskList, user.id);
    })
  );

  @Effect({ dispatch: false })
  taskListDetailEditPageActionsSaved$ = this.actions$.pipe(
    ofType(TaskListDetailEditPageActions.saved),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
      )
    ),
    tap(([action, user]) => {
      this.todoListsDataService.save(action.taskList, user.id);
    })
  );
  //#endregion
  //
  @Effect({ dispatch: false })
  clearCompleted$ = this.actions$.pipe(
    ofType(CurrentTasksPageActions.clearCompleted),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId),
          this.store.select(TaskSelectors.selectCurrentTasksAll)
        )
      )
    ),

    tap(([action, { user, taskListId }, tasks]) => {
      const completedTasks = tasks.filter((t) => t.isComplete);

      this.fb1DataService.clearCompletedTodos(
        completedTasks,
        taskListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  completedTaskToggled$ = this.actions$.pipe(
    ofType(CompletedTasksPageActions.itemToggled),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),
    tap(([action, { user, taskListId }]) => {
      this.fb1DataService.moveToCurrent(
        action.todoCompleted,
        taskListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  completedTaskDetailEditPageComponent$ = this.actions$.pipe(
    ofType(
      CompletedTaskDetailEditPageActions.cancelled,
      CompletedTaskDetailEditPageActions.removed,
      CompletedTaskDetailEditPageActions.saved
    ),
    tap(({ completedTask }) => {
      this.router.navigate(['/tasks/completed', { id: completedTask.id }]);
    })
  );

  @Effect({ dispatch: false })
  newCurrentTask$ = this.actions$.pipe(
    ofType(CurrentTasksPageActions.newCurrentTask),
    tap(() => {
      this.router.navigate(['/tasks/current/new']);
    })
  );

  @Effect({ dispatch: false })
  currentTaskDetailEditPageComponent$ = this.actions$.pipe(
    ofType(
      CurrentTaskDetailEditPageActions.cancelled,
      CurrentTaskDetailEditPageActions.removed,
      CurrentTaskDetailEditPageActions.saved
    ),
    tap(({ currentTask }) => {
      this.router.navigate(['/tasks/current', { id: currentTask.id }]);
    })
  );

  @Effect({ dispatch: false })
  currentTaskDetailNewPageComponent$ = this.actions$.pipe(
    ofType(
      CurrentTaskDetailNewPageActions.cancelled,
      CurrentTaskDetailNewPageActions.saved
    ),
    tap(() => {
      this.router.navigate(['/tasks/current']);
    })
  );

  @Effect({ dispatch: false })
  removeCurrentTodo$ = this.actions$.pipe(
    ofType(CurrentTaskDetailEditPageActions.removed),

    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),

    tap(([action, { user, taskListId }]) => {
      this.todoDataService.removeItem(
        action.currentTask.id,
        taskListId,
        user.id
      );
    })
  );

  @Effect({ dispatch: false })
  saveCurrentTodo$ = this.actions$.pipe(
    ofType(
      CurrentTaskDetailNewPageActions.saved,
      CurrentTaskDetailEditPageActions.saved,
      CurrentTasksPageActions.saveItem
    ),

    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(UserStoreSelectors.selectUserAndTaskListId)
        )
      )
    ),
    tap(([action, { user, taskListId }]) => {
      this.todoDataService.save(action.currentTask, taskListId, user.id);
    })
  );

  /*
  @Effect()
  enterLoadData$ = this.actions$.pipe(
    ofType(
      AuthApiActions.autoSignInHaveUser,
      AuthApiActions.setUserListId,
      AuthApiActions.signInSuccess
    ),
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
*/

  @Effect({ dispatch: false })
  taskListDetailEditPageComponent$ = this.actions$.pipe(
    ofType(
      TaskListDetailEditPageActions.cancelled,
      TaskListDetailEditPageActions.removed,
      TaskListDetailEditPageActions.saved
    ),
    tap(({ taskList }) => {
      this.router.navigate(['tasks/lists', { id: taskList.id }]);
    })
  );

  @Effect({ dispatch: false })
  taskListDetailNewPageComponent$ = this.actions$.pipe(
    ofType(
      TaskListDetailNewPageActions.cancelled,
      TaskListDetailNewPageActions.saved
    ),
    tap(() => {
      this.router.navigate(['tasks/lists']);
    })
  );

  constructor(
    private actions$: Actions,
    private fb1DataService: Fb1DataService,
    private todoDataService: CurrentTaskDataService,
    private todoCompletedDataService: CompletedTaskDataService,
    private todoListsDataService: TaskListDataService,
    private store: Store<{}>,
    private router: Router
  ) {}
}
