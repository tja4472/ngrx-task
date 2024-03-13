/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// https://github.com/tja4472/wiki/wiki/NgRx-Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CompletedTaskListComponent } from '@app/completed-tasks/components/completed-task-list/completed-task-list.component';
import { SearchComponent } from '@app/completed-tasks/components/search/search.component';
import { CompletedTasksPageComponent } from '@app/completed-tasks/containers/completed-tasks-page/completed-tasks-page.component';
import { MaterialModule } from '@app/material/material.module';
import * as CompletedTasksPageActions from '@app/root-store/tasks-store/actions/completed-tasks-page.actions';

import {
  taskFeatureKey,
  TaskState,
} from '@app/root-store/tasks-store/reducers';

import { TestScheduler } from 'rxjs/testing';
/*
  https://rxjs.dev/guide/testing/marble-testing#marble-syntax

  '-' frame
  '|' complete
*/

describe('example01', () => {
  let component: CompletedTasksPageComponent;
  let fixture: ComponentFixture<CompletedTasksPageComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        // RouterTestingModule,
      ],
      providers: [provideMockStore()],
      declarations: [
        CompletedTasksPageComponent,
        SearchComponent,
        CompletedTaskListComponent,
      ],
    });

    fixture = TestBed.createComponent(CompletedTasksPageComponent);
    store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
    component = fixture.componentInstance;
  });

  it('should dispatch a CompletedTasksPageActions.search action on search', () => {
    const $event = 'search term';
    const action = CompletedTasksPageActions.search({ query: $event });

    component.viewSearch($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});

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

describe('TestScheduler', () => {
  function setup() {
    const testScheduler = new TestScheduler((actual, expected) => {
      // logFrames('actual', actual);
      // logFrames('expected', expected);
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, ReactiveFormsModule],
      providers: [provideMockStore()],
      declarations: [
        CompletedTasksPageComponent,
        SearchComponent,
        CompletedTaskListComponent,
      ],
    });

    const fixture = TestBed.createComponent(CompletedTasksPageComponent);
    const store = TestBed.inject(MockStore);

    jest.spyOn(store, 'dispatch');
    const component = fixture.componentInstance;
    return { component, store, testScheduler };
  }

  it('should have query', () => {
    const { component, store, testScheduler } = setup();

    const state: {
      [taskFeatureKey]: Partial<TaskState>;
    } = {
      [taskFeatureKey]: {
        'todo-completed': {
          ids: [],
          entities: {},
          loaded: true,
          loading: false,
          query: 'query-text',
        },
      },
    };
    /*
      actual
        Frame: 0 Kind N Value: query-text
        Frame: 0 Kind C Value: undefined

      expected
        Frame: 0 Kind N Value: query-text
        Frame: 0 Kind C Value: undefined
    */
    testScheduler.run(({ expectObservable }) => {
      store.setState(state);
      expectObservable(component.viewSearchQuery$).toBe('(a|)', {
        a: 'query-text',
      });
    });
  });
});
