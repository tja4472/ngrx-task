import { createAction, props } from '@ngrx/store';

import { Todo } from '@app/tasks/models';

export const databaseListenForDataStart = createAction(
  '[Todo] (Database) Listen For Data - Start',
  props<{
    todoListId: string;
    userId: string;
  }>()
);

export const databaseListenForDataStop = createAction(
  '[Todo] (Database) Listen For Data - Stop'
);

export const loadSuccess = createAction(
  '[Todo] Load Success',
  props<{
    currentTasks: Todo[];
  }>()
);

export const reorderList = createAction(
  '[Todo] Reorder List',
  props<{
    ids: string[];
  }>()
);
