import { createAction, props, union } from '@ngrx/store';

import { UserModel } from '@app/auth/models/user.model';

const title = 'Q-Auth/API';

export const autoSignIn = createAction(`[${title}] Auto Sign In`);

export const haveAppUser = createAction(`[${title}] Have App User`);

export const haveFirebaseUser = createAction(
  `[${title}] Have Firebase User`,
  props<{ uid: string; email: string; displayName: string }>()
);

export const autoSignInNoUser = createAction(
  `[${title}] Auto Sign In - No User`
);

// ==========================================================================

export const autoSignInHaveUser = createAction(
  `[Auth/API] Auto Sign In - Have User`,
  props<{ user: UserModel }>()
);

export const signInFailure = createAction(
  `[Auth/API] Sign In - Failure`,
  props<{ error: { code: string; message: string } }>()
);

export const signInSuccess = createAction(
  `[Auth/API] Sign In - Success`,
  props<{ user: UserModel }>()
);

export const signUpFailure = createAction(
  `[Auth/API] Sign Up - Failure`,
  props<{ error: any }>()
);

export const signUpSuccess = createAction(
  `[Auth/API] Sign Up - Success`,
  props<{ user: UserModel }>()
);

const all = union({
  haveFirebaseUser,
  autoSignIn,
  autoSignInHaveUser,
  autoSignInNoUser,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
});

export type AuthApiActionsUnion = typeof all;
