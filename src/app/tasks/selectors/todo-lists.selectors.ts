import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoLists from '../reducers/todo-lists.reducer';

const getTodoListsState = createFeatureSelector<fromTodoLists.State>(
  fromTodoLists.todoListsFeatureKey
);

const { selectEntities, selectAll } = fromTodoLists.adapter.getSelectors();

export const getAllTodoLists = createSelector(
  getTodoListsState,
  selectAll
);

export const getEntities = createSelector(
  getTodoListsState,
  selectEntities
);

export const getLoaded = createSelector(
  getTodoListsState,
  (state) => state.loaded
);
