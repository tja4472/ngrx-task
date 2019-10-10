import { createAction, props } from '@ngrx/store';

import { CompletedTask, TaskListListItem } from '@app/tasks/models';

export const loadTasks = createAction('[Task] Load Tasks');

//
export const enterTaskListsPage = createAction('[Task Lists Page] Enter');

// completedTaskDetails
export const completedTaskDetailsPageEnter = createAction(
  '[Completed Task Details Page] Enter',
  props<{ id: string }>()
);

//

// TaskListDetailPage
export const taskListDetailPageEnter = createAction(
  '[Task List Detail Page] Enter',
  props<{ id: string }>()
);

export const taskListDetailEditPageSaved = createAction(
  '[Task List Detail Edit Page] Saved',
  props<{ todoCompleted: TaskListListItem }>()
);

export const taskListDetailNewPageSaved = createAction(
  '[Task List Detail New Page] Saved',
  props<{ todoCompleted: TaskListListItem }>()
);

export const taskListDetailPageRemoved = createAction(
  '[Task List Detail Page] Removed',
  props<{ todoCompleted: TaskListListItem }>()
);

//

export const TaskListPageNewTaskList = createAction(
  '[Task List Page] New Task List'
);
