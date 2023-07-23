/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @jest-environment jsdom
 */
import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListsGuardActions } from '../actions';

import { TaskListsGuard } from './task-lists.guard';

import { TestScheduler } from 'rxjs/testing';
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

describe('TaskListsGuard', () => {
  function setup() {
    const testScheduler = new TestScheduler((actual, expected) => {
      // logFrames('actual', actual);
      // logFrames('expected', expected);
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TaskListsGuard, provideMockStore()],
    });

    const store = TestBed.inject(MockStore);
    const guard = TestBed.inject(TaskListsGuard);
    jest.spyOn(store, 'dispatch');

    const selectTaskListSelectorsSelectLoaded = store.overrideSelector(
      TaskListSelectors.selectLoaded,
      false
    );

    return { guard, selectTaskListSelectorsSelectLoaded, store, testScheduler };
  }

  const dummyUrl = 'dummy/url';
  const route: Route = { path: dummyUrl };

  describe('canLoad', () => {
    it('should return Observable<false> after 5000ms if task lists do not load', () => {
      const { guard, store, testScheduler } = setup();

      testScheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('5000ms (a|)', {
          a: false,
        });
      });

      const action = TaskListsGuardActions.timeout({
        requestedUrl: `/${dummyUrl}`,
      });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should return Observable<true> if url task list does exist in store', () => {
      const { guard, selectTaskListSelectorsSelectLoaded, testScheduler } =
        setup();
      selectTaskListSelectorsSelectLoaded.setResult(true);

      testScheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('(a|)', { a: true });
      });
    });
  });
});
