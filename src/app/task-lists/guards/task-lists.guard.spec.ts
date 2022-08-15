/**
 * @jest-environment jsdom
 */
import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TaskState } from '@app/root-store/tasks-store/reducers';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListsGuardActions } from '../actions';

import { TaskListsGuard } from './task-lists.guard';

import { getTestScheduler } from 'jasmine-marbles';


// src/environments/environment.ts:1:35 - error TS2307: Cannot find module '@app/firebase/firebase-config-dev' or its corresponding type declarations.
// src/app/root-store/reducers/index.ts

describe('TaskListsGuard', () => {
  let guard: TaskListsGuard;
  let mockStore: MockStore;
  let selectTaskListSelectorsSelectLoaded: MemoizedSelector<TaskState, boolean>;

  let mockStoreDispatchSpy: jest.SpyInstance;

  const dummyUrl = 'dummy/url';
  const route: Route = { path: dummyUrl };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TaskListsGuard, provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
    mockStoreDispatchSpy = jest.spyOn(mockStore, 'dispatch');

    guard = TestBed.inject(TaskListsGuard);

    selectTaskListSelectorsSelectLoaded = mockStore.overrideSelector(
      TaskListSelectors.selectLoaded,
      false
    );
  });

  describe('canLoad', () => {
    it('should return Observable<false> after 5000ms if task lists do not load', () => {
      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('5000ms (a|)', {
          a: false,
        });
      });

      const action = TaskListsGuardActions.timeout({
        requestedUrl: `/${dummyUrl}`,
      });
      expect(mockStoreDispatchSpy).toHaveBeenCalledTimes(1);
      expect(mockStoreDispatchSpy).toHaveBeenCalledWith(action);

      // suppress 'has no expectations' warnings.
      // expect().nothing();
    });

    it('should return Observable<true> if url task list does exist in store', () => {
      selectTaskListSelectorsSelectLoaded.setResult(true);
      const scheduler = getTestScheduler();
      scheduler.run(({ expectObservable }) => {
        expectObservable(guard.canLoad(route)).toBe('(a|)', { a: true });
      });

      // suppress 'has no expectations' warnings.
      // expect().nothing();
    });
  });
});
