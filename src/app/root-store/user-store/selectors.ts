import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, userStoreFeatureKey } from './user-store.reducer';

const selectFeatureState = createFeatureSelector<State>(userStoreFeatureKey);

export const selectTaskListId = createSelector(
  selectFeatureState,
  (state) => state.taskListId
);

export const selectUser = createSelector(
  selectFeatureState,
  (state) => state.user
);

export const selectIsLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectUserAndTaskListId = createSelector(
  selectUser,
  selectTaskListId,
  (user, taskListId) => {
    if (user === null) {
      return null;
    } else {
      return { user, taskListId };
    }
  }
);
