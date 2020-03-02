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
const featureReducer = createReducer(
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

export function reducer(state: AuthState | undefined, action: Action) {
  return featureReducer(state, action);
}

/*
export function reducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion
): AuthState {
  switch (action.type) {
    case AuthApiActions.autoSignInNoUser.type:
      return { ...state, hasChecked: true };

    case AuthApiActions.haveFirebaseUser.type:
    case AuthApiActions.signInSuccess.type:
    case AuthApiActions.autoSignInHaveUser.type:
    case AuthApiActions.signUpSuccess.type:
      return { ...state, hasChecked: true };

    case AuthActions.signOut.type:
      return { ...initialState, hasChecked: true };

    default:
      return state;
  }
}
*/
