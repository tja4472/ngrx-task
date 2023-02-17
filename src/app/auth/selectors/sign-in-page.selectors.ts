import { createSelector, select } from '@ngrx/store';

import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthFeatureState, selectAuthFeatureState } from '@app/auth/reducers';
import { SignInPageState } from '@app/auth/reducers/sign-in-page.reducer';

export const selectSignInPageState = createSelector(
  selectAuthFeatureState,
  (state: AuthFeatureState) => state.signInPage
);

export const selectSignInPageError = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.error
);

export const selectSignInPagePending = createSelector(
  selectSignInPageState,
  (state: SignInPageState) => state.pending
);

export const selectFilteredSignInPageError = pipe(
  select(selectSignInPageError),
  filter((val): val is string => val !== null)
);
