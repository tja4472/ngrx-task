import { Action, createReducer, on } from '@ngrx/store';

import { AuthActions, AuthApiActions } from '@app/auth/actions';

export interface AuthState {
  hasChecked: boolean;
  isAutoSignIn: boolean;
  userId: string;
}

export const initialState: AuthState = {
  hasChecked: false,
  isAutoSignIn: true,
  userId: null,
};

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
export const reducer = createReducer(
  initialState,
  on(
    AuthApiActions.autoSignInHaveFirebaseUser,
    AuthApiActions.manualSignInHaveFirebaseUser,
    (state, { uid }) => {
      const values: AuthState = { ...state, hasChecked: true, userId: uid };
      return values;
    }
  ),
  on(AuthActions.signOutComplete, (state) => {
    const values: AuthState = { ...state, userId: null };
    return values;
  }),
  on(AuthApiActions.autoSignInNoFirebaseUser, (state) => {
    const values: AuthState = { ...initialState, hasChecked: true };
    return values;
  }),
  on(AuthApiActions.manualSignInHaveFirebaseUser, (state) => {
    const values: AuthState = { ...state, isAutoSignIn: false };
    return values;
  })
);
