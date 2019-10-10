import { createAction, props } from '@ngrx/store';

import { CompletedTask } from '@app/tasks/models';

const title = 'Completed Tasks Page';

export const enter = createAction(`[${title}] Enter`);

export const itemToggled = createAction(
  `[${title}] Item Toggled`,
  props<{ todoCompleted: CompletedTask }>()
);
