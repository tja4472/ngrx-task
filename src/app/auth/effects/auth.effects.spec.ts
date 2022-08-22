/**
 * @jest-environment jsdom
 */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthEffects } from '@app/auth/effects/auth.effects';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  AuthActions,
  AuthApiActions,
  AuthGuardServiceActions,
  SignInPageActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { of } from 'rxjs';
import { AppUser } from '../models/app-user.model';
import { TestScheduler } from 'rxjs/testing';

import { EnvironmentService } from '@app/environment.service';
import { Environment } from '../../../environments/environment-types';
/*
  https://rxjs.dev/guide/testing/marble-testing#marble-syntax

  '-' frame
  '|' complete
*/

let actions$ = new Observable<Action>();

function setup() {
  const angularFireAuthMock = jest.fn();
  const matDialogMock = jest.fn();

  const mockEnvironment: Environment = {
    appCode: '--mockEnvironment--',
    production: false,
    firebase: {
      config: {
        apiKey: 'demo-1-key',
        authDomain: '',
        databaseURL: '',
        projectId: 'demo-1',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      },
      emulators: {
        auth: ['http://localhost:9099'],
        firestore: ['localhost', 8080],
      },
    },
  };

  const mockAuthService = {
    createAppUser$: jest.fn(),
  };

  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      AuthEffects,
      provideMockActions(() => actions$),
      provideMockStore(),
      { provide: AngularFireAuth, useValue: angularFireAuthMock },
      {
        provide: AuthService,
        useValue: mockAuthService,
      },
      { provide: EnvironmentService, useValue: mockEnvironment },
      { provide: MatDialog, useValue: matDialogMock },
    ],
  });

  const authService = TestBed.inject(AuthService);
  const effects = TestBed.inject(AuthEffects);
  const matDialog = TestBed.inject(MatDialog);

  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  return { authService, effects, testScheduler };
}

describe('AuthEffects', () => {
  describe('bbbautoSignInHaveUser$', () => {
    it('should return AuthApiActions.signInHaveUser', () => {
      const { authService, effects, testScheduler } = setup();
      const action = AuthApiActions.autoSignInCheck();

      const appUser: AppUser = {
        uid: 'uidA',
        email: 'email1',
        taskListId: 'taskListId1',
      };

      const expectedAction = AuthApiActions.signInHaveUser({
        appUser,
        isAutoSignIn: true,
      });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a---', { a: action });
        const response = cold('-a|', { a: appUser });

        jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
        expectObservable(effects.bbbautoSignInHaveUser$).toBe('--b', {
          b: expectedAction,
        });
      });
    });

    it('should not return action', () => {
      const { authService, effects, testScheduler } = setup();
      const action = AuthApiActions.autoSignInCheck();

      const appUser: AppUser = {
        uid: 'uidA',
        email: 'email1',
        taskListId: 'taskListId1',
      };

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a---', { a: action });
        const response = cold('-a|', { a: null });

        jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
        expectObservable(effects.bbbautoSignInHaveUser$).toBe('');
      });
    });
  });

  describe('bbbSignInHaveUser$', () => {
    /*
      1. Start signed out.
      2. Sign in.
    */
    it('should return AuthApiActions.signInHaveUser', () => {
      const { authService, effects, testScheduler } = setup();
      const action = AuthApiActions.autoSignInCheck();

      const appUser: AppUser = {
        uid: 'uidA',
        email: 'email1',
        taskListId: 'taskListId1',
      };

      const expectedAction = AuthApiActions.signInHaveUser({
        appUser,
        isAutoSignIn: false,
      });

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a---', { a: action });
        const response = cold('-a-b|', { a: null, b: appUser });

        jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
        expectObservable(effects.bbbsignInHaveUser$).toBe('----a', {
          a: expectedAction,
        });
      });
    });

    it('should not return action', () => {
      const { authService, effects, testScheduler } = setup();
      const action = AuthApiActions.autoSignInCheck();

      const appUser: AppUser = {
        uid: 'uidA',
        email: 'email1',
        taskListId: 'taskListId1',
      };

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a---', { a: action });
        const response = cold('-a-b|', { a: appUser, b: null });

        jest.spyOn(authService, 'createAppUser$').mockReturnValue(response);
        expectObservable(effects.bbbsignInHaveUser$).toBe('');
      });
    });
  });
});
