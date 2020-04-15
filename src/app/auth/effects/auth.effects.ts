import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

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

import {
  AuthActions,
  AuthApiActions,
  AuthGuardServiceActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { selectQueryParam } from '@app/root-store/reducers';

import { SignoutConfirmationDialogComponent } from '../components/signout-confirmation-dialog/signout-confirmation-dialog.component';
import { selectIsAutoSignIn, selectUserId } from '../selectors/auth.selectors';

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
  // With enablePersistence the first result will be from
  // the autoSignIn.
  autoSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.autoSignIn),
      // tap(() => console.log('### autoSignIn$')),
      switchMap(() =>
        this.afAuth.authState.pipe(
          first(),
          map((firebaseUser) => {
            if (firebaseUser === null) {
              return AuthApiActions.autoSignInNoFirebaseUser();
            } else {
              return AuthApiActions.autoSignInHaveFirebaseUser({
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

  // Watch userId and perform operations on change.
  aaAAAAA$ = createEffect(
    () => {
      return this.actions$.pipe(
        // tap((action) => console.log('aaAAAAA$:action',action)),
        ofType(AuthApiActions.autoSignIn),
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

  manualSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AuthApiActions.autoSignInHaveFirebaseUser,
        AuthApiActions.autoSignInNoFirebaseUser
      ),
      // tap(() => console.log('### manualSignIn$')),
      switchMap(() =>
        this.afAuth.authState.pipe(
          skip(1),
          map((firebaseUser) => {
            if (firebaseUser === null) {
              return AuthApiActions.manualSignInNoFirebaseUser();
            } else {
              return AuthApiActions.manualSignInHaveFirebaseUser({
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
          this.afAuth
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

          this.afAuth
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
          this.afAuth.signOut().then(() => {
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

  aaaSignInRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.manualSignInHaveFirebaseUser),
        concatMap((action) =>
          of(action).pipe(
            withLatestFrom(
              this.store.select(selectQueryParam('return')),
              this.store.select(selectIsAutoSignIn)
            ),
            tap(([_, returnUrl, isAutoSignIn]) => {
              console.log(
                'aaaRedirect$:returnUrl,isAutoSignIn>',
                returnUrl,
                isAutoSignIn
              );
              if (returnUrl) {
                // this.router.navigateByUrl(returnUrl);
              } else {
                /*
                if (!isAutoSignIn) {
                  // Manual sign in with no return url.
                  this.router.navigateByUrl('/');
                }
*/
              }
            })
          )
        )
      );
    },
    { dispatch: false }
  );

  haveAppUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthApiActions.haveAppUser),
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
          this.router.navigate(['/sign-up']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<{}>
  ) {}

  ngrxOnInitEffects(): Action {
    return AuthApiActions.autoSignIn();
  }
}
