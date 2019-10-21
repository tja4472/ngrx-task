import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { defer, from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  AuthActions,
  AuthApiActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { AuthService } from '@app/auth/services/auth.service';

import { SignoutConfirmationDialogComponent } from '../components/signout-confirmation-dialog/signout-confirmation-dialog.component';

@Injectable()
export class AuthEffects {
  // @Effect({ dispatch: false })
  @Effect()
  autoSignIn$ = this.actions$.pipe(
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

  @Effect({ dispatch: false })
  signIn$ = this.actions$.pipe(
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

  @Effect({ dispatch: false })
  signOut$ = this.actions$.pipe(
    ofType(AuthActions.signOut),
    tap(() =>
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/sign-in']);
        this.store.dispatch(AuthActions.signOutComplete());
      })
    )
  );

  @Effect()
  signOutConfirmation$ = this.actions$.pipe(
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
      result ? AuthActions.signOut() : AuthActions.signOutConfirmationDismiss()
    )
  );

  /*
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(AuthApiActions.signOut.type),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tap(() => this.router.navigate(['/sign-in'])),
        map(() => AuthApiActions.signOutComplete())
        // catchError(() => of(new SignOutComplete()))
      )
    )
  );
*/

  /*
  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(SignInPageActions.signIn.type),
    exhaustMap((action) =>
      this.authService.login(action.credentials).pipe(
        map((user) => AuthApiActions.signInSuccess({ user })),
        catchError((error) => of(AuthApiActions.signInFailure({ error })))
      )
    )
  );
*/

  // ======================================
  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.pipe(
    ofType(SignInPageActions.showSignUpPage.type),
    tap(() => {
      this.router.navigate(['/sign-up']);
    })
  );

  /*
  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(SignUpPageActions.signUp.type),
    exhaustMap((action) =>
      this.authService.signUp(action.credentials).pipe(
        map((user) => AuthApiActions.signUpSuccess({ user })),
        catchError((error) => of(AuthApiActions.signUpFailure({ error })))
      )
    )
  );
*/
  @Effect({ dispatch: false })
  authSignInSuccess$ = this.actions$.pipe(
    ofType(
      AuthApiActions.signInSuccess.type,
      AuthApiActions.signUpSuccess.type
    ),
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

  /*  
  @Effect({ dispatch: false })
  setUserListId$ = this.actions$.pipe(
    ofType(AuthApiActions.setUserListId),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    map(([action, user]) =>
      tap(() => {
        user.todoListId = action.listId;
        this.userInfoDataService.save(user, user.id);
      })
    )
  );
*/

  /*
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      // this.router.navigate(['/books']);
      if (this.authService.redirectUrl === '') {
        console.log('MMMMMMMMMMMM');
        this.router.navigate(['/']);
      } else {
        this.router.navigate([this.authService.redirectUrl]);
      }
    })
  );
*/

  /*
  @Effect()
  signOutConfirmation$ = this.actions$.pipe(
    ofType<SignOutConfirmationShow>(SignOutConfirmationActionTypes.Show),
    exhaustMap(() =>
      from(this.showSignOutPrompt()).pipe(
        map((confirmed) => {
          if (confirmed) {
            return new SignOutConfirmationOk();
          } else {
            return new SignOutConfirmationCancel();
          }
        })
      )
    )
  );
  */

  /*
    @Effect({ dispatch: false })
    logoutConfirmation$ = this.actions$
      .ofType<Logout>(AuthActionTypes.Logout)
      .pipe(
        tap(() => {
          console.log('### sign out ###');
          // this.showSignOutPrompt();
          this.showSignOutPrompt().then(() => {
           console.log('aaaaaa');
         });
        })
      );
    */

  /*
  @Effect()
  logoutConfirmation$ = this.actions$
    .ofType<Logout>(AuthActionTypes.Logout)
    .pipe(
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map((confirmed) => {
              if (confirmed) {
                return new LogoutConfirmed();
              } else {
                return new LogoutCancelled();
              }
            }),
          ),
      ),
    );
  */
  /*
  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(AuthApiActions.signOut.type),
    exhaustMap(() =>
      this.authService.signOut().pipe(
        tap(() => this.router.navigate(['/sign-in'])),
        map(() => AuthApiActions.signOutComplete())
        // catchError(() => of(new SignOutComplete()))
      )
    )
  );
*/

  // ==
  // SignOutConfirmationAlert
  // ==
  /*
  @Effect({ dispatch: false })
  signOutConfirmationAlertShow$ = this.actions$.pipe(
    ofType(SignOutConfirmationAlertActions.show.type),
    tap(() => this.signOutConfirmationAlertService.show())
  );
*/

  // ==

  @Effect()
  init$: Observable<any> = defer(() => of(null)).pipe(
    map(() => AuthApiActions.autoSignIn())
  );

  constructor(
    private actions$: Actions<
      | AuthApiActions.AuthApiActionsUnion
      | SignInPageActions.SignInPageActionsUnion
      | SignUpPageActions.SignUpPageActionsUnion
    >,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<any>
  ) {}
}
