import { createAction, props } from '@ngrx/store';

import { CompletedTask, TaskListListItem } from '@app/tasks/models';

export const loadTasks = createAction('[Task] Load Tasks');

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

//
