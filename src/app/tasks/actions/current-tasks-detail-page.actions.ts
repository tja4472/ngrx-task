import { createAction, props } from '@ngrx/store';

import { CurrentTask } from '@app/tasks/models';

const title = 'Current Tasks Detail Page';

export const Saved = createAction(
  `[${title}] Saved`,
  props<{ currentTask: CurrentTask }>()
);

export const Removed = createAction(
  `[${title}] Removed`,
  props<{ todo: CurrentTask }>()
);
