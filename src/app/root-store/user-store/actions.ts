import { createAction, props } from '@ngrx/store';

import { User } from '@app/models';

const title = 'User Store';

export const clearUser = createAction(`[${title}] Clear User`);

export const aaaasetUser = createAction(
  `[${title}] Set User`,
  props<{
    user: User;
    taskListId: string;
  }>()
);

export const setTaskListId = createAction(
  `[${title}] Set Task List Id`,
  props<{ taskListId: string }>()
);
