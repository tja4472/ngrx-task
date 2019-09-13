import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks');

export const enterCompletedTasksPage = createAction(
  '[Completed Tasks Page] Enter'
);

export const enterCurrentTasksPage = createAction('[Current Tasks Page] Enter');

export const enterTaskListsPage = createAction('[Task Lists Page] Enter');
