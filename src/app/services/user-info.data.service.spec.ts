/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { AngularfireFirestoreService } from './angularfire-firestore.service';

import { UserInfoDataService, FirestoreDoc } from './user-info.data.service';

import { UserInfo } from '@app/models/user-info.model';

describe('Using mocked Firestore', () => {
  //
  function setup() {
    //
    const mockedFirestore = {};

    TestBed.configureTestingModule({
      providers: [
        UserInfoDataService,
        AngularfireFirestoreService,
        { provide: Firestore, useValue: mockedFirestore },
      ],
    });

    const service = TestBed.inject(UserInfoDataService);

    const firestoreService = TestBed.inject(AngularfireFirestoreService);
    const spy_firestoreSetDoc = jest.spyOn(firestoreService, 'setDoc');
    spy_firestoreSetDoc.mockResolvedValue(undefined);

    return { service, spy_firestoreSetDoc };
  }

  it('update', async () => {
    //
    const { service, spy_firestoreSetDoc } = setup();

    const expectedCollectionPath = '/users';
    const expectedDocumentPath = 'USER_ID';
    const expectedFirestoreDoc: FirestoreDoc = {
      todoListId: 'TODO_LIST_ID',
    };

    const userId = 'USER_ID';
    const userInfo: UserInfo = {
      todoListId: 'TODO_LIST_ID',
    };

    await service.save(userInfo, userId);

    expect(spy_firestoreSetDoc).toHaveBeenCalledTimes(1);
    expect(spy_firestoreSetDoc).toHaveBeenCalledWith(
      expectedFirestoreDoc,
      expectedDocumentPath,
      expectedCollectionPath
    );
  });
  /*
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
*/
});
