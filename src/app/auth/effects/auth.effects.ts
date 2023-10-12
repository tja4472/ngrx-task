/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { of } from 'rxjs';
import {
  concatMap,
  exhaustMap,
  filter,
  first,
  map,
  skip,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { pathPrefix, routeNames } from '@app/app-route-names';
import * as AuthApiActions from '@app/auth/actions/auth-api.actions';
import * as AuthGuardServiceActions from '@app/auth/actions/auth-guard-service.actions';
import * as AuthActions from '@app/auth/actions/auth.actions';
import * as SignUpPageActions from '@app/auth/actions/sign-up-page.actions';
import { SignInPageActions } from '@app/auth/actions/sign-in-page.actions';

import { selectQueryParam } from '@app/root-store/reducers';

import { SignoutConfirmationDialogComponent } from '../components/signout-confirmation-dialog/signout-confirmation-dialog.component';
import { selectIsAutoSignIn, selectUserId } from '../selectors/auth.selectors';
import { AuthService } from '../services/auth.service';

import { AppUser } from '../models/app-user.model';

/* =======================================
Improve typings of createEffect, help debugging
https://github.com/ngrx/platform/issues/2192

effect$ = createEffect(() => {
  return this.actions$.pipe(
    ...
  );
});

effectDispatchFalse$ = createEffect(
  () => {
    return this.actions$.pipe(
      ...
    );
  },
  { dispatch: false }
);
======================================= */

@Injectable()
export class AuthEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return AuthApiActions.autoSignInCheck();
  }

  // With enablePersistence the first result will be from
  // the autoSignIn.
  //#region Sign In
  bbbautoSignInNoUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          first(),
          filter((appUser) => appUser === null),
          map(() => {
            return AuthApiActions.signInNoUser({ isAutoSignIn: true });
          })
        )
      )
    );
  });

  bbbautoSignInHaveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          first(),
          filter((appUser): appUser is AppUser => appUser !== null),
          map((appUser) => {
            return AuthApiActions.signInHaveUser({
              appUser,
              isAutoSignIn: true,
            });
          })
        )
      )
    );
  });

  bbbsignInNoUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          skip(1),
          filter((appUser) => appUser === null),
          map(() => {
            return AuthApiActions.signInNoUser({ isAutoSignIn: false });
          })
        )
      )
    );
  });

  bbbsignInHaveUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignInCheck),
      switchMap(() =>
        this.authService.appUser$.pipe(
          skip(1),
          filter((appUser): appUser is AppUser => appUser !== null),
          map((appUser) => {
            return AuthApiActions.signInHaveUser({
              appUser,
              isAutoSignIn: false,
            });
          })
        )
      )
    );
  });
  //#endregion

  // Watch userId and perform operations on change.
  aaAAAAA$ = createEffect(
    () => {
      return this.actions$.pipe(
        // tap((action) => console.log('aaAAAAA$:action',action)),
        ofType(AuthApiActions.autoSignInCheck),
        tap((action) => console.log('aaAAAAA$:actionA', action)),
        switchMap(() =>
          this.store.select(selectUserId).pipe(
            tap((userId) => console.log('aaAAAAA:userId>', userId)),
            filter((userId) => userId !== null),
            tap((userId) => console.log('aaAAAAA:Signed in userId>', userId))
          )
        )
      );
    },
    { dispatch: false }
  );

  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.signIn),
        tap((action) => {
          const password = action.credentials.password;
          this.authService
            .signIn(action.credentials.username, password)
            .catch((error) =>
              // eslint-disable-next-line @ngrx/no-dispatch-in-effects
              this.store.dispatch(
                AuthApiActions.signInFailure({
                  error: {
                    code: error.code,
                    message: error.message,
                  },
                })
              )
            );
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignUpPageActions.signUp),
        tap((action) => {
          const password = action.credentials.password;

          this.authService
            .signUp(action.credentials.username, password)
            .catch((error) =>
              // eslint-disable-next-line @ngrx/no-dispatch-in-effects
              this.store.dispatch(
                AuthApiActions.signUpFailure({
                  error: {
                    code: error.code,
                    message: error.message,
                  },
                })
              )
            );
        })
      );
    },
    { dispatch: false }
  );

  navigateToSignIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthGuardServiceActions.navigateToSignIn),
        tap((action) => {
          this.router.navigate(['/sign-in'], {
            queryParams: { return: action.requestedUrl },
          });
        })
      );
    },
    { dispatch: false }
  );

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() =>
          this.authService.signOut().then(() => {
            this.router.navigate(['/sign-in']);
            // eslint-disable-next-line @ngrx/no-dispatch-in-effects
            this.store.dispatch(AuthActions.signOutComplete());
          })
        )
      );
    },
    { dispatch: false }
  );

  signOutConfirmation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          SignoutConfirmationDialogComponent,
          undefined,
          boolean
        >(SignoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map((result) =>
        result
          ? AuthActions.signOut()
          : AuthActions.signOutConfirmationDismiss()
      )
    );
  });

  haveAppUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.signInHaveUser),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(selectQueryParam('return')),
              this.store.select(selectIsAutoSignIn)
            ),
            tap(([_, returnUrl, isAutoSignIn]) => {
              console.log(
                'AAAAA:returnUrl,isAutoSignIn>',
                returnUrl,
                isAutoSignIn
              );
              if (returnUrl) {
                this.router.navigateByUrl(returnUrl);
              } else {
                if (!isAutoSignIn) {
                  // Manual sign in with no return url.
                  this.router.navigateByUrl('/');
                }
              }
            })
          )
        )
      );
    },
    { dispatch: false }
  );

  doSignUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.showSignUpPage),
        tap(() => {
          this.router.navigate([pathPrefix + routeNames.signUp.path]);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private readonly store: Store
  ) {}
}
