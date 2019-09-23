import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodo from '../reducers/todo.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const getAllTodo = createSelector(
  getTodoState,
  (state) => state.todos
);

export const getSelectedId = createSelector(
  getTodoState,
  (state) => state.selectedId
);

export const getSelectedItem = createSelector(
  getAllTodo,
  getSelectedId,
  (todos, selectedId) => {
    return todos.filter((todo) => todo.id === selectedId)[0];
  }
);
