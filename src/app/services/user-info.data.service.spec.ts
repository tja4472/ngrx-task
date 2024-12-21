/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TestBed } from '@angular/core/testing';

import { Firestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

import { AngularfireFirestoreService } from './angularfire-firestore.service';

import { UserInfoDataService, FirestoreDoc } from './user-info.data.service';

import { UserInfo } from '@app/models/user-info.model';

describe('UserInfoDataService', () => {
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

    const spy_firestoreDocData = jest.spyOn(firestoreService, 'docData');
    spy_firestoreDocData.mockReturnValue(of());

    const spy_firestoreSetDoc = jest.spyOn(firestoreService, 'setDoc');
    spy_firestoreSetDoc.mockResolvedValue(undefined);

    return { service, spy_firestoreDocData, spy_firestoreSetDoc };
  }

  it('collection path should be correct', () => {
    //
    const { service } = setup();

    const expectedCollectionPath = '/users';

    const actualCollectionPath = service.collectionPath();

    expect(actualCollectionPath).toBe(expectedCollectionPath);
  });

  it('getData$:docData', () => {
    //
    const { service, spy_firestoreDocData } = setup();

    const expectedCollectionPath = '/users';
    const expectedDocumentPath = 'USER_ID';

    const userId = 'USER_ID';

    service.getData$(userId);

    expect(spy_firestoreDocData).toHaveBeenCalledTimes(1);
    expect(spy_firestoreDocData).toHaveBeenCalledWith(
      expectedDocumentPath,
      expectedCollectionPath
    );
  });

  it('save:setDoc update', async () => {
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
});
