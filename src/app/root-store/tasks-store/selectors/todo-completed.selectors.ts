import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoCompleted from '../reducers/todo-completed.reducer';

const selectTodoCompletedState = createFeatureSelector<fromTodoCompleted.State>(
  fromTodoCompleted.todoCompletedFeatureKey
);

const { selectEntities, selectAll } = fromTodoCompleted.adapter.getSelectors();

export const selectAllTodoCompleted = createSelector(
  selectTodoCompletedState,
  selectAll
);

export const selectEntitiesA = createSelector(
  selectTodoCompletedState,
  selectEntities
);

export const selectLoaded = createSelector(
  selectTodoCompletedState,
  (state) => state.loaded
);

export const selectQuery = createSelector(
  selectTodoCompletedState,
  (state) => state.query
);
