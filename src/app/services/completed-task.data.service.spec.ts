/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import * as ServicesUtil from './services-util';

import {
  CompletedTaskDataService,
  FirestoreDoc,
  getCompletedTasksCollectionPath,
} from './completed-task.data.service';

import { CompletedTask } from '../root-store/tasks-store/models/completed-task.model';

describe('Using mocked Firestore', () => {
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
        AngularfireFirestoreService,
        { provide: Firestore, useValue: mockedFirestore },
      ],
    });

    const service = TestBed.inject(CompletedTaskDataService);

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

  it('update', async () => {
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

describe('completed-task.data.service', () => {
  it('Completed tasks collection path should be correct', () => {
    const collectionPath = getCompletedTasksCollectionPath(
      'taskListId',
      'userId'
    );
    const expectedCollectionPath =
      '/users/userId/todo-lists/taskListId/completed-todos';

    expect(collectionPath).toBe(expectedCollectionPath);
  });
});
