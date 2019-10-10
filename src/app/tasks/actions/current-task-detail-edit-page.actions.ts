import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/tasks/models';

const title = 'Current Task Detail Edit Page';

export const saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);

export const removed = createAction(
  `[${title}] Removed`,
  props<{ todo: CurrentTask }>()
);
