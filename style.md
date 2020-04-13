# Actions

```ts
// auth\actions\sign-in-page.actions.ts
import { createAction, props } from '@ngrx/store';

import { Credentials } from '@app/auth/models/credentials.model';

const title = 'Sign In Page';

export const entered = createAction(`[${title}] Entered`);

export const showSignUpPage = createAction(`[${title}] Show Sign Up Page`);

export const signIn = createAction(
  `[${title}] Sign In`,
  props<{ credentials: Credentials }>()
);
```

```ts
// auth\actions\index.ts
import * as SignInPageActions from '@app/auth/actions/sign-in-page.actions';

export { SignInPageActions };
```

```ts
// Consumer.
import { SignInPageActions } from '@app/auth/actions';

// Usage.
// ofType(SignInPageActions.signIn),
```
