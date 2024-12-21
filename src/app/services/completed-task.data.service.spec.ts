/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from 'firebase/firestore';

import { of } from 'rxjs';

import { FirestoreService } from './firestore.service';
import * as ServicesUtil from './services-util';

import {
  CompletedTaskDataService,
  FirestoreDoc,
} from './completed-task.data.service';

import { CompletedTask } from '../root-store/tasks-store/models/completed-task.model';

describe('completed-task.data.service', () => {
  //
  function setup() {
    //
    const mockedFirestore = {};

    const date = new Date('2023-05-14');
    jest.useFakeTimers().setSystemTime(date);
    expect(new Date()).toEqual(date);

    TestBed.configureTestingModule({
      providers: [
        CompletedTaskDataService,
        FirestoreService,
        { provide: Firestore, useValue: mockedFirestore },
      ],
    });

    const service = TestBed.inject(CompletedTaskDataService);
    const firestoreService = TestBed.inject(FirestoreService);

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

  it('Completed tasks collection path should be correct', () => {
    //
    const { service } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/completed-todos';

    const actualCollectionPath = service.collectionPath(
      'TASKLIST_ID',
      'USER_ID'
    );

    expect(actualCollectionPath).toBe(expectedCollectionPath);
  });

  it('getData$:collectionData', () => {
    //
    const { service, spy_firestoreCollectionData } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/completed-todos';

    const taskListId = 'TASKLIST_ID';
    const userId = 'USER_ID';

    service.getData$(taskListId, userId);

    expect(spy_firestoreCollectionData).toHaveBeenCalledTimes(1);
    expect(spy_firestoreCollectionData).toHaveBeenCalledWith(
      expectedCollectionPath
    );
  });

  it('removeItem:deleteDoc', async () => {
    //
    const { service, spy_firestoreDeleteDoc } = setup();

    const expectedCollectionPath =
      '/users/USER_ID/todo-lists/TASKLIST_ID/completed-todos';
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
    spy_createId.mockImplementation(() => 'TEST-ID');

    const expectedCollectionPath =
      '/users/ccc/todo-lists/taskListId-1/completed-todos';
    const expectedDocumentPath = 'TEST-ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'TEST-ID',
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
      updatedTimestamp: 1684022400000,
    };

    const taskListId = 'taskListId-1';
    const userId = 'ccc';
    const completedTask: CompletedTask = {
      description: 'aaa',
      id: '',
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
      updatedTimestamp: 200,
    };

    await service.save(completedTask, taskListId, userId);

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
      '/users/ccc/todo-lists/taskListId-1/completed-todos';
    const expectedDocumentPath = 'bb';
    const expectedFirestoreDoc: FirestoreDoc = {
      description: 'aaa',
      id: 'bb',
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
      updatedTimestamp: 1684022400000,
    };

    const taskListId = 'taskListId-1';
    const userId = 'ccc';
    const completedTask: CompletedTask = {
      description: 'aaa',
      id: 'bb',
      isComplete: false,
      completedTimestamp: 100,
      name: 'ccccc',
      updatedTimestamp: 200,
    };

    await service.save(completedTask, taskListId, userId);

    expect(spy_firestoreSetDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreSetDoc).toHaveBeenCalledWith(
      expectedFirestoreDoc,
      expectedDocumentPath,
      expectedCollectionPath
    );
  });
});
