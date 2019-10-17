import { createFeatureSelector, createSelector } from '@ngrx/store';

import { featureKey } from './reducer';
import { State } from './state';

const getFeatureState = createFeatureSelector<State>(featureKey);

export const selectUser = createSelector(
  getFeatureState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user) => !!user
);
