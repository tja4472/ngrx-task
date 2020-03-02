import { createAction, props } from '@ngrx/store';

const title = 'Auth/API';

export const autoSignIn = createAction(`[${title}] Auto Sign In`);

export const haveAppUser = createAction(`[${title}] Have App User`);

export const autoSignInHaveFirebaseUser = createAction(
  `[${title}] Auto Sign In - Have Firebase User`,
  props<{ uid: string; email: string; displayName: string }>()
);

export const autoSignInNoFirebaseUser = createAction(
  `[${title}] Auto Sign In - No Firebase User`
);

export const manualSignInHaveFirebaseUser = createAction(
  `[${title}] Manual Sign In - Have Firebase User`,
  props<{ uid: string; email: string; displayName: string }>()
);

export const manualSignInNoFirebaseUser = createAction(
  `[${title}] Manual Sign In - No Firebase User`
);

export const signInFailure = createAction(
  `[${title}] Sign In - Failure`,
  props<{ error: { code: string; message: string } }>()
);

export const signUpFailure = createAction(
  `[${title}] Sign Up - Failure`,
  props<{ error: any }>()
);
