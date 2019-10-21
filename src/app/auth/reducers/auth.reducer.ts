import { AuthActions, AuthApiActions } from '@app/auth/actions';

export interface AuthState {
  hasChecked: boolean;
}

export const initialState: AuthState = {
  hasChecked: false,
};

export function authReducer(
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
