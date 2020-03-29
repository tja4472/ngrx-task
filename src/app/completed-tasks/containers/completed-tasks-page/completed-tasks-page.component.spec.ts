import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  CompletedTaskListComponent,
  SearchComponent,
} from '@app/completed-tasks/components';
import { MaterialModule } from '@app/material';
import { CompletedTask } from '@app/root-store/tasks-store/models';
import { TaskState } from '@app/root-store/tasks-store/reducers';

import { CompletedTasksPageComponent } from './completed-tasks-page.component';

import { cold } from 'jasmine-marbles';

describe(CompletedTasksPageComponent.name, () => {
  let component: CompletedTasksPageComponent;
  let fixture: ComponentFixture<CompletedTasksPageComponent>;
  let mockStore: MockStore;

  const expectedTasks: CompletedTask[] = [
    {
      description: '',
      id: '242YYpXnNPyBXmneb1CN',
      isComplete: true,
      completedTimestamp: 1579624337545,
      name: 'aaa',
      updatedTimestamp: 1579624341771,
    },
  ];

  const taskState: TaskState = {
    todo: {
      ids: [],
      entities: {},
      loaded: true,
      loading: false,
    },
    'todo-completed': {
      ids: ['242YYpXnNPyBXmneb1CN', '5bwc4yQ4JBGUZHoV70GK'],
      entities: {
        '242YYpXnNPyBXmneb1CN': {
          description: '',
          id: '242YYpXnNPyBXmneb1CN',
          isComplete: true,
          completedTimestamp: 1579624337545,
          name: 'aaa',
          updatedTimestamp: 1579624341771,
        },
        '5bwc4yQ4JBGUZHoV70GK': {
          description: '',
          id: '5bwc4yQ4JBGUZHoV70GK',
          isComplete: true,
          completedTimestamp: 1579617547051,
          name: 'List 1: cca',
          updatedTimestamp: 1579624256989,
        },
      },
      loaded: true,
      loading: false,
      query: 'aaa',
    },
    taskLists: {
      ids: [],
      entities: {},
      loaded: true,
      loading: false,
    },
  };

  const initialState = {
    authFeature: {
      auth: {
        hasChecked: true,
        isAutoSignIn: true,
        userId: 'mcdMeKJiuOSAg8dBQyAwndOMZPF3',
      },
    },
    task: taskState,
    user: {
      user: {
        id: 'mcdMeKJiuOSAg8dBQyAwndOMZPF3',
        email: 'b.b@b.com',
        name: '',
      },
      taskListId: 'Ck8TWzXG5PrXMs3k3sh8',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [
        CompletedTasksPageComponent,
        SearchComponent,
        CompletedTaskListComponent,
      ],
    });

    fixture = TestBed.createComponent(CompletedTasksPageComponent);
    mockStore = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should filter completed tasks', () => {
    component.completedTasks$.subscribe((x) => {
      expect(x).toEqual(expectedTasks);
    });
  });

  it('aaaashould filter completed tasks', () => {
    const expected = cold('(a)', { a: expectedTasks });
    expect(component.completedTasks$).toBeObservable(expected);
  });

  it('should have query', () => {
    /*      
    component.viewSearchQuery$.subscribe((query) => {
      expect(query).toEqual('aaa');
    });
*/
    const expected = cold('(a|)', { a: 'aaa' });
    expect(component.viewSearchQuery$).toBeObservable(expected);
  });
});
