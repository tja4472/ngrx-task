import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { defer, of } from 'rxjs';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import {
  AuthActions,
  AuthApiActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { AuthService } from '@app/auth/services/auth.service';

import { SignoutConfirmationDialogComponent } from '../components/signout-confirmation-dialog/signout-confirmation-dialog.component';

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
export class AuthEffects {
  autoSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignIn),
      switchMap(() =>
        this.afAuth.authState.pipe(
          map((firebaseUser) => {
            if (firebaseUser === null) {
              return AuthApiActions.autoSignInNoUser();
            } else {
              return AuthApiActions.haveFirebaseUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
              });
            }
          })
        )
      )
    );
  });

  signIn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.signIn),
        tap((action) => {
          // const password = 'aaaaa';
          const password = action.credentials.password;

          this.afAuth.auth
            .signInWithEmailAndPassword(action.credentials.username, password)
            .catch((error) =>
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

          this.afAuth.auth
            .createUserWithEmailAndPassword(
              action.credentials.username,
              password
            )
            .catch((error) =>
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

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() =>
          this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/sign-in']);
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
        ofType(AuthApiActions.haveAppUser),
        tap(() => {
          console.log(
            'this.authService.redirectUrl>',
            this.authService.redirectUrl
          );
          if (this.authService.redirectUrl === '') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate([this.authService.redirectUrl]);
          }
        })
      );
    },
    { dispatch: false }
  );

  doSignUp$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SignInPageActions.showSignUpPage),
        tap(() => {
          this.router.navigate(['/sign-up']);
        })
      );
    },
    { dispatch: false }
  );

  init$ = createEffect(() => {
    return defer(() => of(null)).pipe(map(() => AuthApiActions.autoSignIn()));
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{}>
  ) {}
}
