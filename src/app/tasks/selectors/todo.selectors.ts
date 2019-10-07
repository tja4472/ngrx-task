import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodo from '../reducers/todo.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const getAllTodo = createSelector(
  getTodoState,
  fromTodo.selectAll
);

export const getEntities = createSelector(
  getTodoState,
  fromTodo.selectEntities
);

export const getLoaded = createSelector(
  getTodoState,
  (state) => state.loaded
);
