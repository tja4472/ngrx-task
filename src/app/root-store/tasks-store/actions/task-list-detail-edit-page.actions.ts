import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '@app/models/task-list-list-item.model';

const title = 'Task List Detail Edit Page';

export const cancelled = createAction(
  `[${title}] Cancelled`,
  props<{ taskList: TaskListListItem }>()
);

export const removed = createAction(
  `[${title}] Removed`,
  props<{ taskList: TaskListListItem }>()
);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ taskList: TaskListListItem }>()
);
