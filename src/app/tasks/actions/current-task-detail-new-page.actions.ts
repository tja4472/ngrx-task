import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/tasks/models';

const title = 'Current Task Detail New Page';

export const saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);
