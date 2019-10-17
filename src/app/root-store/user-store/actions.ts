import { createAction, props } from '@ngrx/store';

import { User } from '@app/models';

const title = 'User Store';

export const clearUser = createAction(`[${title}] Clear User`);

export const setUser = createAction(
  `[${title}] Set User`,
  props<{
    user: User;
  }>()
);
