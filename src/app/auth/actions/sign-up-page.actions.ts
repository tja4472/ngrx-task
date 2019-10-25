import { createAction, props, union } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';
import { UserModel } from '@app/auth/models/user.model';

const title = 'Sign Up Page';

export const entered = createAction(`[${title}] Entered`);

export const signUp = createAction(
  `[${title}] Sign Up`,
  props<{ credentials: Credentials }>()
);
