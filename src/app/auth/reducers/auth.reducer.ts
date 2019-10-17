import { AuthApiActions } from '@app/auth/actions';
import { UserModel } from '@app/auth/models/user.model';

export interface AuthState
  extends Readonly<{
    hasChecked: boolean;
    user: UserModel | null;
  }> {}

export const initialState: AuthState = {
  hasChecked: false,
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthApiActions.AuthApiActionsUnion
): AuthState {
  switch (action.type) {
    case AuthApiActions.autoSignInNoUser.type:
      return { ...state, hasChecked: true };

    case AuthApiActions.qqqautoSignInHaveUser.type:
    case AuthApiActions.signInSuccess.type:
    case AuthApiActions.autoSignInHaveUser.type:
    case AuthApiActions.signUpSuccess.type:
      return { ...state, hasChecked: true, user: action.user };

    case AuthApiActions.signOut.type:
      return { ...initialState, hasChecked: true };

    case AuthApiActions.setUserListId.type:
      return { ...state, user: { ...state.user, todoListId: action.listId } };

    default:
      return state;
  }
}
