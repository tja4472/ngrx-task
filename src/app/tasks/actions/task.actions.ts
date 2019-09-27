import { createAction, props } from '@ngrx/store';

import { Todo, TodoCompleted, TodoListsItem } from '@app/tasks/models';

export const loadTasks = createAction('[Task] Load Tasks');

export const enterCompletedTasksPage = createAction(
  '[Completed Tasks Page] Enter'
);

// currentTasksPage
export const currentTasksPageEnter = createAction('[Current Tasks Page] Enter');

export const currentTasksPageNewCurrentTask = createAction(
  '[Current Tasks Page] New Current Task'
);

export const currentTasksPageSaveItem = createAction(
  '[Current Tasks Page] Save Item',
  props<{ todo: Todo }>()
);
//
export const enterTaskListsPage = createAction('[Task Lists Page] Enter');

// completedTaskDetails
export const completedTaskDetailsPageEnter = createAction(
  '[Completed Task Details Page] Enter',
  props<{ id: string }>()
);

export const completedTaskDetailsPageSaved = createAction(
  '[Completed Task Details Page] Saved',
  props<{ todoCompleted: TodoCompleted }>()
);

export const completedTaskDetailsPageRemoved = createAction(
  '[Completed Task Details Page] Removed',
  props<{ todoCompleted: TodoCompleted }>()
);

// currentTaskDetails
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

// TaskListDetailPage
export const taskListDetailPageEnter = createAction(
  '[Task List Detail Page] Enter',
  props<{ id: string }>()
);

export const taskListDetailPageSaved = createAction(
  '[Task List Detail Page] Saved',
  props<{ todoCompleted: TodoListsItem }>()
);

export const taskListDetailPageRemoved = createAction(
  '[Task List Detail Page] Removed',
  props<{ todoCompleted: TodoListsItem }>()
);
