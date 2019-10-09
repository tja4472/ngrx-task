import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/tasks/models';

const title = 'Current Tasks New Item Page';

export const saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);
