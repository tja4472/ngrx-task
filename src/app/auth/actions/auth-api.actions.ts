/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';

import { AppUser } from '../models/app-user.model';

const title = 'Auth/API';

export const autoSignInCheck = createAction(`[${title}] Auto Sign In Check`);

export const signInFailure = createAction(
  `[${title}] Sign In - Failure`,
  props<{ error: { code: string; message: string } }>()
);

export const signInSuccess = createAction(`[${title}] Sign In - Success`);

export const signUpFailure = createAction(
  `[${title}] Sign Up - Failure`,
  props<{ error: any }>()
);

export const signUpSuccess = createAction(`[${title}] Sign Up - Success`);

export const signInHaveUser = createAction(
  `[${title}] Sign In - Have User`,
  props<{ appUser: AppUser; isAutoSignIn: boolean }>()
);

export const signInNoUser = createAction(
  `[${title}] Sign In - No User`,
  props<{ isAutoSignIn: boolean }>()
);
