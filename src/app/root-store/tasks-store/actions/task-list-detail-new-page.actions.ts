import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '@app/root-store/tasks-store/models/task-list-list-item.model';

const title = 'Task List Detail New Page';

export const cancelled = createAction(`[${title}] Cancelled`);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ taskList: TaskListListItem }>()
);
