import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoLists from '../reducers/todo-lists.reducer';

const getTodoListsState = createFeatureSelector<fromTodoLists.State>(
  fromTodoLists.todoListsFeatureKey
);

export const getAllTodoLists = createSelector(
  getTodoListsState,
  (state) => state.todoLists
);

export const getSelectedListId = createSelector(
  getTodoListsState,
  (state) => state.selectedListId
);

export const getSelectedId = createSelector(
  getTodoListsState,
  (state) => state.selectedId
);

export const getSelectedItem = createSelector(
  getAllTodoLists,
  getSelectedId,
  (completedTodos, selectedId) => {
    return completedTodos.filter((todo) => todo.id === selectedId)[0];
  }
);
