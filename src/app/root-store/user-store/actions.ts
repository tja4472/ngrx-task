import { createAction, props } from '@ngrx/store';

const title = 'User Store';

// export const clearUser = createAction(`[${title}] Clear User`);

export const setTaskListId = createAction(
  `[${title}] Set Task List Id`,
  props<{ taskListId: string }>()
);
