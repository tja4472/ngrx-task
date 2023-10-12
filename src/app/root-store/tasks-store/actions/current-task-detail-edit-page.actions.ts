import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';

const title = 'Current Task Detail Edit Page';

export const cancelled = createAction(
  `[${title}] Cancelled`,
  props<{ currentTask: CurrentTask }>()
);

export const removed = createAction(
  `[${title}] Removed`,
  props<{ currentTask: CurrentTask }>()
);

export const saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);
