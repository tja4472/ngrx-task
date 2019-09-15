import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodo from '../reducers/todo.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const getAllTodo = createSelector(
  getTodoState,
  (state) => state.todos
);
