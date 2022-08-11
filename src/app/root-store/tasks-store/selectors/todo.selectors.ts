import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodo from '../reducers/todo.reducer';

const selectTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

const { selectEntities, selectAll } = fromTodo.adapter.getSelectors();

export const selectAllTodo = createSelector(selectTodoState, selectAll);

export const selectEntitiesA = createSelector(selectTodoState, selectEntities);

export const selectLoaded = createSelector(
  selectTodoState,
  (state) => state.loaded
);
