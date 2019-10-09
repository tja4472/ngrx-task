import { createAction, props } from '@ngrx/store';

import {
  CompletedTask,
  CurrentTask,
  TaskListListItem,
} from '@app/tasks/models';

export const loadTasks = createAction('[Task] Load Tasks');

export const enterCompletedTasksPage = createAction(
  '[Completed Tasks Page] Enter'
);

// currentTasksPage
export const currentTasksPageEnter = createAction('[Current Tasks Page] Enter');

export const currentTasksPageClearCompleted = createAction(
  '[Current Tasks Page] Clear Completed'
);

export const currentTasksPageNewCurrentTask = createAction(
  '[Current Tasks Page] New Current Task'
);

export const currentTasksPageSaveItem = createAction(
  '[Current Tasks Page] Save Item',
  props<{ currentTask: CurrentTask }>()
);
//
export const enterTaskListsPage = createAction('[Task Lists Page] Enter');

// completedTaskDetails
export const completedTaskDetailsPageEnter = createAction(
  '[Completed Task Details Page] Enter',
  props<{ id: string }>()
);

export const completedTaskDetailsItemToggled = createAction(
  '[Completed Task Details Page] Item Toggled',
  props<{ todoCompleted: CompletedTask }>()
);

export const completedTaskDetailsPageSaved = createAction(
  '[Completed Task Details Page] Saved',
  props<{ todoCompleted: CompletedTask }>()
);

export const completedTaskDetailsPageRemoved = createAction(
  '[Completed Task Details Page] Removed',
  props<{ todoCompleted: CompletedTask }>()
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
