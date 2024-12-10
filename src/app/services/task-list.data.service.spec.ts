/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import * as ServicesUtil from './services-util';

import { TaskListDataService, FirestoreDoc } from './task-list.data.service';

import { TaskListListItem } from '../models/task-list-list-item.model';

describe('Using mocked Firestore', () => {
  //
  function setup() {
    //
    const mockedFirestore = {};

    TestBed.configureTestingModule({
      providers: [
        TaskListDataService,
        AngularfireFirestoreService,
        { provide: Firestore, useValue: mockedFirestore },
      ],
    });

    const service = TestBed.inject(TaskListDataService);

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

    const expectedCollectionPath = '/users/ccc/todo-lists';
    const expectedDocumentPath = 'TEST-ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      id: 'TEST-ID',
      name: 'ccccc',
    };

    const userId = 'ccc';
    const taskListListItem: TaskListListItem = {
      id: '',
      name: 'ccccc',
    };

    await service.save(taskListListItem, userId);

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

    const expectedCollectionPath = '/users/ccc/todo-lists';
    const expectedDocumentPath = 'bb';
    const expectedFirestoreDoc: FirestoreDoc = {
      id: 'bb',
      name: 'ccccc',
    };

    const userId = 'ccc';
    const taskListListItem: TaskListListItem = {
      id: 'bb',
      name: 'ccccc',
    };

    await service.save(taskListListItem, userId);

    expect(spy_firestoreSetDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreSetDoc).toHaveBeenCalledWith(
      expectedFirestoreDoc,
      expectedDocumentPath,
      expectedCollectionPath
    );
  });
});
