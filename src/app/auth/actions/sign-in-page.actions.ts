import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';

export const SignInPageActions = createActionGroup({
  source: 'Sign In Page',
  events: {
    Entered: emptyProps(),
    'Show Sign Up Page': emptyProps(),
    'Sign In': props<{ credentials: Credentials }>(),
  },
});
