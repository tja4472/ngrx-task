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

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as TaskListSelectors from '@app/root-store/tasks-store/selectors/task-list';

import * as TaskListsGuardActions from '../actions/task-lists-guard.actions';

import { taskListsCanMatchGuard } from './task-lists.guard';

import { TestScheduler } from 'rxjs/testing';
import { Observable } from 'rxjs';
/*
  https://rxjs.dev/guide/testing/marble-testing#marble-syntax

  '-' frame
  '|' complete
*/

//  Kind represents the kind of notification, 'N' for next notification, 'E' for error and 'C' for completion
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

const executeGuard: CanMatchFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => {
    return taskListsCanMatchGuard(...guardParameters);
  });

describe('TaskListsGuard', () => {
  function setup() {
    const testScheduler = new TestScheduler((actual, expected) => {
      // logFrames('actual', actual);
      // logFrames('expected', expected);
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    const store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');

    const selectTaskListSelectorsSelectLoaded = store.overrideSelector(
      TaskListSelectors.selectLoaded,
      false
    );

    return { selectTaskListSelectorsSelectLoaded, store, testScheduler };
  }

  const dummyUrl = 'dummy/url';
  const route: Route = { path: dummyUrl };
  const segments: UrlSegment[] = {} as any;

  describe('canMatch', () => {
    it('should return Observable<false> after 5000ms if task lists do not load', () => {
      const { store, testScheduler } = setup();
      const guard = executeGuard(route, segments) as Observable<boolean>;

      const action = TaskListsGuardActions.timeout({
        requestedUrl: `/${dummyUrl}`,
      });

      testScheduler.run(({ expectObservable }) => {
        expectObservable(guard).toBe('5000ms (a|)', {
          a: false,
        });
      });

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should return Observable<true> if url task list does exist in store', () => {
      const { selectTaskListSelectorsSelectLoaded, testScheduler } = setup();
      selectTaskListSelectorsSelectLoaded.setResult(true);
      const guard = executeGuard(route, segments) as Observable<boolean>;

      testScheduler.run(({ expectObservable }) => {
        expectObservable(guard).toBe('(a|)', { a: true });
      });
    });
  });
});
