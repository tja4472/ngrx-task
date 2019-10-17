import { createSelector } from '@ngrx/store';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { AuthState } from '@app/auth/reducers/auth.reducer';

export const selectAuthState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.auth
);

export const selectHasChecked = createSelector(
  selectAuthState,
  (state: AuthState) => state.hasChecked
);
