/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import * as ServicesUtil from './services-util';

import {
  CurrentTaskDataService,
  FirestoreDoc,
} from './current-task.data.service';

import { CurrentTask } from '../root-store/tasks-store/models/current-task.model';

describe('CurrentTaskDataService', () => {
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

    const spy_firestoreCollectionData = jest.spyOn(
      firestoreService,
      'collectionData'
    );
    spy_firestoreCollectionData.mockReturnValue(of());

    const spy_firestoreDeleteDoc = jest.spyOn(firestoreService, 'deleteDoc');
    spy_firestoreDeleteDoc.mockResolvedValue(undefined);

    const spy_firestoreSetDoc = jest.spyOn(firestoreService, 'setDoc');
    spy_firestoreSetDoc.mockResolvedValue(undefined);

    return {
      service,
      spy_firestoreCollectionData,
      spy_firestoreDeleteDoc,
      spy_firestoreSetDoc,
    };
  }

  it('collection path should be correct', () => {
    //
    const { service } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/current-todos';

    const actualCollectionPath = service.collectionPath('TASKLIST_ID', 'USER_ID');

    expect(actualCollectionPath).toBe(expectedCollectionPath);
  });

  describe('fromFirestoreDoc', () => {
    //
    it('test-1', () => {
      //
      const { service } = setup();

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

      const actual = service.fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });

    it('test-2', () => {
      //
      const { service } = setup();

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

      const actual = service.fromFirestoreDoc(fromDb);
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('toFirestoreDoc', () => {
    //
    it('update', () => {
      //
      const { service } = setup();

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
      const actual = service.toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('update with nulls', () => {
      //
      const { service } = setup();

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
      const actual = service.toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });

    it('insert', () => {
      //
      const { service } = setup();

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
      const actual = service.toFirestoreDoc(currentTask);
      expect(actual).toStrictEqual(expected);
    });
  });

  it('getData$:collectionData', () => {
    //
    const { service, spy_firestoreCollectionData } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/current-todos';

    const taskListId = 'TASKLIST_ID';
    const userId = 'USER_ID';

    service.getData$(taskListId, userId);

    expect(spy_firestoreCollectionData).toHaveBeenCalledTimes(1);
    expect(spy_firestoreCollectionData).toHaveBeenCalledWith(
      expectedCollectionPath,
      'index'
    );
  });

  it('removeItem:deleteDoc', async () => {
    //
    const { service, spy_firestoreDeleteDoc } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/current-todos';
    const expectedDocumentPath = 'DOC_ID';

    const taskListId = 'TASKLIST_ID';
    const userId = 'USER_ID';

    const itemId = 'DOC_ID';

    await service.removeItem(itemId, taskListId, userId);

    expect(spy_firestoreDeleteDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreDeleteDoc).toHaveBeenCalledWith(
      expectedDocumentPath,
      expectedCollectionPath
    );
  });

  it('save:setDoc insert', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const spy_createId = jest.spyOn(ServicesUtil, 'createId');
    spy_createId.mockImplementation(() => 'DOC_ID');

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/current-todos';
    const expectedDocumentPath = 'DOC_ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'DOC_ID',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    const taskListId = 'TASKLIST_ID';
    const userId = 'USER_ID';
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

  it('save:setDoc update', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/current-todos';
    const expectedDocumentPath = 'DOC_ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'DOC_ID',
      index: 9,
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
    };

    const taskListId = 'TASKLIST_ID';
    const userId = 'USER_ID';
    const currentTask: CurrentTask = {
      description: 'aaa',
      id: 'DOC_ID',
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
