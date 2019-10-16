import { createAction, props } from '@ngrx/store';

import {
  CompletedTask,
  TaskListListItem,
} from '@app/root-store/tasks-store/models';

export const loadTasks = createAction('[Task] Load Tasks');

// completedTaskDetails
export const completedTaskDetailsPageEnter = createAction(
  '[Completed Task Details Page] Enter',
  props<{ id: string }>()
);

//
