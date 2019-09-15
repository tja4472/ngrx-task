import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoLists from '../reducers/todo-lists.reducer';

const getTodoListsState = createFeatureSelector<fromTodoLists.State>(
  fromTodoLists.todoListsFeatureKey
);

export const getAllTodoLists = createSelector(
  getTodoListsState,
  (state) => state.todoLists
);
