import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '../models';

export const listenForData = createAction(
  '[TodoListsActions] Listen For Data',
  props<{
    userId: string;
  }>()
);

export const loadSuccess = createAction(
  '[TodoListsActions] Load Success',
  props<{
    items: TaskListListItem[];
    userId: string;
  }>()
);

export const unlistenForData = createAction(
  '[TodoListsActions] Unlisten For Data'
);
