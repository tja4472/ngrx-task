import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '@app/tasks/models';

const title = 'Task List Detail New Page';

export const cancelled = createAction(`[${title}] Cancelled`);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ taskList: TaskListListItem }>()
);
