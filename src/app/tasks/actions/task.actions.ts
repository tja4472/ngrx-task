import { createAction, props } from '@ngrx/store';

import { Todo } from '@app/tasks/models';

export const loadTasks = createAction('[Task] Load Tasks');

export const enterCompletedTasksPage = createAction(
  '[Completed Tasks Page] Enter'
);

export const enterCurrentTasksPage = createAction('[Current Tasks Page] Enter');

export const enterTaskListsPage = createAction('[Task Lists Page] Enter');

export const currentTaskDetailsPageEnter = createAction(
  '[Current Task Details Page] Enter',
  props<{ id: string }>()
);

export const currentTaskDetailsPageSaved = createAction(
  '[Current Task Details Page] Saved',
  props<{ todo: Todo }>()
);

export const currentTaskDetailsPageRemoved = createAction(
  '[Current Task Details Page] Removed',
  props<{ todo: Todo }>()
);
