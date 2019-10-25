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

export const signInFailure = createAction(
  `[${title}] Sign In - Failure`,
  props<{ error: { code: string; message: string } }>()
);

export const signUpFailure = createAction(
  `[${title}] Sign Up - Failure`,
  props<{ error: any }>()
);
