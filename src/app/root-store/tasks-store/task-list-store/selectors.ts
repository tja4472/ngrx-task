import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey } from './reducer';
import { featureAdapter, State } from './state';

const selectTodoListsState = createFeatureSelector<State>(featureKey);

const { selectEntities, selectAll } = featureAdapter.getSelectors();

export const selectAllTodoLists = createSelector(
  selectTodoListsState,
  selectAll
);

export const selectEntitiesA = createSelector(
  selectTodoListsState,
  selectEntities
);

export const selectLoaded = createSelector(
  selectTodoListsState,
  (state) => state.loaded
);
