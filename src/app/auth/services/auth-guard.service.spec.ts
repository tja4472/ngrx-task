/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Remove eslint-disable

import { TestBed } from '@angular/core/testing';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';

import { expect, jest, test } from '@jest/globals';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { authCanMatchGuard, AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import * as AuthSelectors from '../selectors/auth.selectors';
import * as AuthGuardServiceActions from '../actions/auth-guard-service.actions';

describe('authCanMatchGuard', () => {
  //
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => {
      return authCanMatchGuard(...guardParameters);
    });

  function setup() {
    //
    const testScheduler = new TestScheduler((actual, expected) => {
      // logFrames('actual', actual);
      // logFrames('expected', expected);
      expect(actual).toEqual(expected);
    });

    const mockedAuthService = {
      redirectUrl: '',
    };

    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        AuthGuardService,
        { provide: AuthService, useValue: mockedAuthService },
      ],
    });

    const store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');

    const authSelectorsSelectHasChecked = store.overrideSelector(
      AuthSelectors.selectHasChecked,
      false
    );

    const authSelectorsSelectHasUser = store.overrideSelector(
      AuthSelectors.selectHasUser,
      false
    );

    return {
      authSelectorsSelectHasChecked,
      authSelectorsSelectHasUser,
      mockedAuthService,
      store,
      testScheduler,
    };
  }

  it('should return NEVER if auth has not been checked', () => {
    //
    const {
      authSelectorsSelectHasChecked,
      authSelectorsSelectHasUser,
      mockedAuthService,
      store,
      testScheduler,
    } = setup();

    const dummyUrl = 'dummy/url';
    const route: Route = { path: dummyUrl };
    const segments: UrlSegment[] = {} as any;

    const guard = executeGuard(route, segments) as Observable<boolean>;

    testScheduler.run(({ expectObservable }) => {
      expectObservable(guard).toBe('--', {
        a: false,
      });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should return Observable<false> if auth has been checked and not signed in', () => {
    //
    const {
      authSelectorsSelectHasChecked,
      authSelectorsSelectHasUser,
      mockedAuthService,
      store,
      testScheduler,
    } = setup();

    const dummyUrl = 'dummy/url';
    const route: Route = { path: dummyUrl };
    const segments: UrlSegment[] = {} as any;

    authSelectorsSelectHasChecked.setResult(true);

    const action = AuthGuardServiceActions.navigateToSignIn({
      requestedUrl: dummyUrl,
    });

    const guard = executeGuard(route, segments) as Observable<boolean>;

    testScheduler.run(({ expectObservable }) => {
      expectObservable(guard).toBe('(a|)', {
        a: false,
      });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should return Observable<true> if auth has been checked and is signed in', () => {
    //
    const {
      authSelectorsSelectHasChecked,
      authSelectorsSelectHasUser,
      mockedAuthService,
      store,
      testScheduler,
    } = setup();

    const dummyUrl = 'dummy/url';
    const route: Route = { path: dummyUrl };
    const segments: UrlSegment[] = {} as any;

    authSelectorsSelectHasChecked.setResult(true);
    authSelectorsSelectHasUser.setResult(true);

    const guard = executeGuard(route, segments) as Observable<boolean>;

    testScheduler.run(({ expectObservable }) => {
      expectObservable(guard).toBe('(a|)', {
        a: true,
      });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});

/*
  https://rxjs.dev/guide/testing/marble-testing#marble-syntax

  '-' frame
  '|' complete
*/

//  Kind represents the kind of notification, 'N' for next notification, 'E' for error and 'C' for completion
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function logFrames(label: string, frames: any) {
  console.group(label);

  frames.forEach((frame: any) => {
    console.log(
      'Frame:',
      frame.frame,
      'Kind',
      frame.notification.kind,
      'Value:',
      frame.notification.value
    );
  });

  console.groupEnd();
}
