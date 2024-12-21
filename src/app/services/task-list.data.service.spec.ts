/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import * as ServicesUtil from './services-util';

import { TaskListDataService, FirestoreDoc } from './task-list.data.service';

import { TaskListListItem } from '../models/task-list-list-item.model';

describe('TaskListDataService', () => {
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

  // TODO: Add tests for collectionPath,fromFirestoreDoc,toFirestoreDoc

  it('getData$:collectionData', () => {
    //
    const { service, spy_firestoreCollectionData } = setup();

    const expectedCollectionPath = '/users/USER_ID/todo-lists';

    const userId = 'USER_ID';

    service.getData$(userId);

    expect(spy_firestoreCollectionData).toHaveBeenCalledTimes(1);
    expect(spy_firestoreCollectionData).toHaveBeenCalledWith(
      expectedCollectionPath
    );
  });

  it('removeItem:deleteDoc', async () => {
    //
    const { service, spy_firestoreDeleteDoc } = setup();

    const expectedCollectionPath = '/users/USER_ID/todo-lists';
    const expectedDocumentPath = 'DOC_ID';

    const itemId = 'DOC_ID';
    const userId = 'USER_ID';

    await service.removeItem(itemId, userId);

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

    const expectedCollectionPath = '/users/USER_ID/todo-lists';
    const expectedDocumentPath = 'DOC_ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      id: 'DOC_ID',
      name: 'ccccc',
    };

    const userId = 'USER_ID';
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

  it('save:setDoc update', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const expectedCollectionPath = '/users/USER_ID/todo-lists';
    const expectedDocumentPath = 'DOC_ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      id: 'DOC_ID',
      name: 'ccccc',
    };

    const userId = 'USER_ID';
    const taskListListItem: TaskListListItem = {
      id: 'DOC_ID',
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
