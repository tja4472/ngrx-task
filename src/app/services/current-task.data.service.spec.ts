/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import * as ServicesUtil from './services-util';

import {
  CurrentTaskDataService,
  FirestoreDoc,
  getCurrentTasksCollectionPath,
  fromFirestoreDoc,
  toFirestoreDoc,
} from './current-task.data.service';

import { CurrentTask } from '../root-store/tasks-store/models/current-task.model';

// https://stackoverflow.com/questions/53174202/how-to-mock-a-function-in-jest

describe('Using mocked Firestore', () => {
  //
  function setup() {
    //
    const mockedFirestore = {};

    TestBed.configureTestingModule({
      providers: [
        CurrentTaskDataService,
        AngularfireFirestoreService,
        { provide: Firestore, useValue: mockedFirestore },
      ],
    });

    const service = TestBed.inject(CurrentTaskDataService);

    const firestoreService = TestBed.inject(AngularfireFirestoreService);
    const spy_firestoreSetDoc = jest.spyOn(firestoreService, 'setDoc');
    spy_firestoreSetDoc.mockResolvedValue(undefined);

    return { service, spy_firestoreSetDoc };
  }

  it('insert', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const spy_createId = jest.spyOn(ServicesUtil, 'createId');
    spy_createId.mockImplementation(() => 'TEST-ID');

    const expectedCollectionPath =
      '/users/ccc/todo-lists/taskListId-1/current-todos';
    const expectedDocumentPath = 'TEST-ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'TEST-ID',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    const taskListId = 'taskListId-1';
    const userId = 'ccc';
    const currentTask: CurrentTask = {
      description: 'aaa',
      id: '',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    await service.save(currentTask, taskListId, userId);

    expect(spy_firestoreSetDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreSetDoc).toHaveBeenCalledWith(
      expectedFirestoreDoc,
      expectedDocumentPath,
      expectedCollectionPath
    );
  });

  it('update', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const expectedCollectionPath =
      '/users/ccc/todo-lists/taskListId-1/current-todos';
    const expectedDocumentPath = 'bb';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'bb',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    const taskListId = 'taskListId-1';
    const userId = 'ccc';
    const currentTask: CurrentTask = {
      description: 'aaa',
      id: 'bb',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    await service.save(currentTask, taskListId, userId);

    expect(spy_firestoreSetDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreSetDoc).toHaveBeenCalledWith(
      expectedFirestoreDoc,
      expectedDocumentPath,
      expectedCollectionPath
    );
  });
});

describe('CurrentTaskDataService', () => {
  it('Current tasks collection path should be correct', () => {
    const collectionPath = getCurrentTasksCollectionPath(
      'taskListId',
      'userId'
    );
    const expectedCollectionPath =
      '/users/userId/todo-lists/taskListId/current-todos';

    expect(collectionPath).toBe(expectedCollectionPath);
  });

  describe('fromFirestoreDoc', () => {
    it('test-1', () => {
      const fromDb: FirestoreDoc = {
        completedTimestamp: null,
        name: 'Task 1',
        description: null,
        index: 0,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        isComplete: false,
      };

      const expected: CurrentTask = {
        description: null,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        index: 0,
        isComplete: false,
        completedTimestamp: null,
        name: 'Task 1',
      };

      const actual = fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });

    it('test-2', () => {
      const fromDb: FirestoreDoc = {
        completedTimestamp: undefined,
        name: 'Task 1',
        description: null,
        index: 0,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        isComplete: false,
      };

      const expected: CurrentTask = {
        description: null,
        id: 'CIYgXiYxnVo5vidHK9Rx',
        index: 0,
        isComplete: false,
        completedTimestamp: null,
        name: 'Task 1',
      };

      const actual = fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('toFirestoreDoc', () => {
    it('update', () => {
      const currentTask: CurrentTask = {
        description: 'aaa',
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: 100,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: 'aaa',
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: 100,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('update with nulls', () => {
      const currentTask: CurrentTask = {
        description: null,
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: null,
        id: 'bb',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('insert', () => {
      const spy_createId = jest.spyOn(ServicesUtil, 'createId');
      spy_createId.mockImplementation(() => 'TEST');

      const currentTask: CurrentTask = {
        description: null,
        id: '',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const expected: FirestoreDoc = {
        description: null,
        id: 'TEST',
        index: 9,
        isComplete: false,
        completedTimestamp: null,
        name: 'ccccc',
      };
      const actual = toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });
  });
});
