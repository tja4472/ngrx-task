import { createAction, props } from '@ngrx/store';

import { TodoListsItem } from '../models';

export const listenForData = createAction(
  '[TodoListsActions] Listen For Data',
  props<{
    userId: string;
  }>()
);

export const loadSuccess = createAction(
  '[TodoListsActions] Load Success',
  props<{
    items: TodoListsItem[];
    userId: string;
  }>()
);

export const unlistenForData = createAction(
  '[TodoListsActions] Unlisten For Data'
);
