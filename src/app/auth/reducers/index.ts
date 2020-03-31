import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from '@app/auth/reducers/auth.reducer';
import * as fromSignInPage from '@app/auth/reducers/sign-in-page.reducer';
import * as fromSignUpPage from '@app/auth/reducers/sign-up-page.reducer';
import * as fromRoot from '@app/root-store/reducers';

export const authFeatureKey = 'authFeature';

export interface AuthFeatureState {
  auth: fromAuth.AuthState;
  signInPage: fromSignInPage.SignInPageState;
  signUpPage: fromSignUpPage.SignUpPageState;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthFeatureState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  auth: fromAuth.reducer,
  signInPage: fromSignInPage.reducer,
  signUpPage: fromSignUpPage.reducer,
};

export const selectAuthFeatureState = createFeatureSelector<
  State,
  AuthFeatureState
>(authFeatureKey);
