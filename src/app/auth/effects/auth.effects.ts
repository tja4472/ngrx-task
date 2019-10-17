import { Injectable } from '@angular/core';
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
  AuthApiActions,
  SignInPageActions,
  SignOutConfirmationAlertActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { AuthService } from '@app/auth/services/auth.service';
import {
  UserStoreActions,
  UserStoreSelectors,
} from '@app/root-store/user-store';

import { qqqHaveFirebaseUser } from '../actions/auth-api.actions';
import { authQuery } from '../selectors/auth.selectors';
import { UserInfoDataService } from '../services/user-info.data.service';

// import { SignOutConfirmationAlertService } from '@app/auth/services/sign-out-confirmation-alert.service';

@Injectable()
export class AuthEffects {
  // @Effect({ dispatch: false })
  @Effect()
  qqqautoSignIn$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignIn),
    switchMap(() =>
      this.afAuth.authState.pipe(
        tap((firebaseUser) =>
          console.log('BBBBBB-firebaseUser>', firebaseUser)
        ),
        map((firebaseUser) => {
          if (firebaseUser === null) {
            return AuthApiActions.autoSignInNoUser();
          } else {
            console.log('lll>', firebaseUser.uid);

            return AuthApiActions.qqqHaveFirebaseUser({
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
  // @Effect()
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

  /*
  @Effect()
  authaaaaaa$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignIn),
    switchMap(() =>
      this.afAuth.authState.pipe(
        tap((firebaseUser) =>
          console.log('AAAAAA-firebaseUser>', firebaseUser)
        ),
        filter((firebaseUser) => firebaseUser !== null),

        map(({ uid, email, displayName }) =>
          AuthApiActions.qqqHaveFirebaseUser({ uid, email, displayName })
        )
      )
    )
  );
  */

  /*
        concatMap(() =>
          of().pipe(
            withLatestFrom(this.store.select(authQuery.selectHasChecked))
          )
        ),
        map(([_, hasChecked]) => hasChecked),
        tap((hasChecked) =>
          console.log('AAAAAA-hasChecked>', hasChecked)
        ),        
        filter((hasChecked) => !hasChecked),

        map(() => AuthApiActions.qqqautoSignInNoUser())
      )  
  */

  // maybe not fire because already used?
  cc$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignIn),
    tap(() => console.log('AAAAAAA')),
    switchMap(() =>
      this.afAuth.authState.pipe(
        filter((firebaseUser) => firebaseUser === null),
        tap((firebaseUser) =>
          console.log('AAAAAA-firebaseUser>', firebaseUser)
        ),
        map(({ uid, email, displayName }) =>
          AuthApiActions.qqqHaveFirebaseUser({ uid, email, displayName })
        )
      )
    )
  );

  @Effect()
  bb$ = this.actions$.pipe(
    ofType(AuthApiActions.qqqHaveFirebaseUser),
    tap(() => console.log('Get User Data')),
    concatMap((firebaseUser) =>
      from(this.userInfoDataService.getUserData(firebaseUser.uid)).pipe(
        tap((x) => console.log('Get User Data aaa>', x, firebaseUser.uid)),
        map(
          (user) =>
            UserStoreActions.setUser({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                taskListId: user.todoListId,
              },
            })
          /*        
          AuthApiActions.qqqautoSignInHaveUser({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName,
              todoListId: user.todoListId,
            },
          })
*/
        )
      )
    )
  );

  @Effect()
  bb1$ = this.actions$.pipe(
    ofType(UserStoreActions.setUser),
    map(({ user }) => user),
    map((user) =>
      AuthApiActions.qqqautoSignInHaveUser({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          todoListId: user.taskListId,
        },
      })
    )
  );

  /*
  @Effect()
  bb1$ = this.actions$.pipe(
    ofType(AuthApiActions.qqqautoSignInHaveUser),
    map(({ user }) => user),
    map((userModel) =>
      UserStoreActions.setUser({
        user: {
          id: userModel.id,
          name: userModel.name,
          email: userModel.email,
          taskListId: userModel.todoListId,
        },
      })
    )
  );
*/
  @Effect()
  bb2$ = this.actions$.pipe(
    ofType(AuthApiActions.signOut),
    map(() => UserStoreActions.clearUser())
  );

  // ======================================
  /*
  @Effect()
  autoSignIn$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignIn.type),
    exhaustMap(() =>
      this.authService.autoSignIn().pipe(
        map((user) => {
          if (!!user) {
            return AuthApiActions.autoSignInHaveUser({ user });
          } else {
            return AuthApiActions.autoSignInNoUser();
          }
        })
      )
    )
  );
*/
  @Effect({ dispatch: false })
  doSignUp$ = this.actions$.pipe(
    ofType(SignInPageActions.showSignUpPage.type),
    tap(() => {
      this.router.navigate(['/sign-up']);
    })
  );

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
  @Effect({ dispatch: false })
  setUserListId$ = this.actions$.pipe(
    ofType(AuthApiActions.setUserListId),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(this.store.select(UserStoreSelectors.selectUser))
      )
    ),
    tap(([action, user]) => {
      const saveUser = { ...user, todoListId: action.listId };

      this.userInfoDataService.save(saveUser, user.id);
    })
  );

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
  @Effect()
  signOutConfirmationAccepted$ = this.actions$.pipe(
    ofType(SignOutConfirmationAlertActions.accepted.type),
    map(() => AuthApiActions.signOut())
  );
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
      | SignOutConfirmationAlertActions.SignOutConfirmationAlertActionsUnion
    >,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userInfoDataService: UserInfoDataService,
    private store: Store<any> //   private signOutConfirmationAlertService: SignOutConfirmationAlertService
  ) {}
}
