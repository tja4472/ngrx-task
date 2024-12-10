/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/class-literal-property-style */
import { inject, Injectable } from '@angular/core';

import {
  collection,
  CollectionReference,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

import { AngularfireFirestoreService } from './angularfire-firestore.service';

// import { EnvironmentService } from '@app/environment.service';
import { UserInfo } from '@app/models/user-info.model';

export function getUsersCollectionPath(): string {
  const path = `/users`;

  return path;
}

/*
const APP_KEY = 'apps/' + environment.appCode;
const USERS_COLLECTION = APP_KEY + '/users';
*/
export interface FirestoreDoc {
  todoListId: string;
}

export const fromFirestoreDoc = (x: FirestoreDoc): UserInfo => {
  //
  const result: UserInfo = {
    todoListId: x.todoListId,
  };

  return result;
};

export const toFirestoreDoc = (item: UserInfo): FirestoreDoc => {
  //
  const result: FirestoreDoc = {
    todoListId: item.todoListId,
  };

  return result;
};

// Replace fromFirestoreDoc/toFirestoreDoc functions
// with public methods??
@Injectable({
  providedIn: 'root',
})
export class UserInfoDataService {
  //
  private firestoreService = inject(AngularfireFirestoreService);

  public get usersCollectionPath(): string {
    // original
    // return 'apps/' + this.environmentService.appCode + '/users';
    // temp to conform to old example.
    return 'users';
  }

  // TODO Remove EnvironmentService
  constructor(
    private firestore: Firestore
    // public readonly afs: AngularFirestore,
    // public readonly environmentService: EnvironmentService
  ) {
    // console.log('UserInfoDataService:constructor');
    /*
    console.log(
      'environmentService.settings.appCode>',
      environmentService.settings.appCode
    );
    */
    // console.log('environmentService.appCode>', environmentService.appCode);
    // console.log('USERS_COLLECTION>', USERS_COLLECTION);
  }

  /*
  public async getUserData(userId: string): Promise<UserInfo> {
    const userData = await this.getItem$(userId).pipe(take(1)).toPromise();

    if (!!userData) {
      // Have userData.
      return userData;
    }

    // No userData.
    // This will happen after sign up.
    const defaultValue = newUserInfo();
    await this.save(defaultValue, userId);
    return defaultValue;
  }
*/
  /*
  public getSingleItem$(userId: string) {
    const doc = this.getItem$(userId)
      .pipe(take(1))
      .toPromise()
      .then((value) => {
        if (!!value) {
          console.log('>> Have document');
          return value;
        } else {
          console.log('>> No document');
          // Document doesn't exist.
          // This will happen after sign up.
          const defaultValue = newUserData();
          this.save(defaultValue, userId);
          return defaultValue;
        }
      });

    return from(doc);
  }
  */

  // Need to throw error if doc is undefined.
  public getItem$(userId: string): Observable<UserInfo> {
    //
    /*    
    return this.firestoreDocument(userId)
      .valueChanges()
      .pipe(
        map((item) => {
          if (item === undefined) {
            throw new Error('UserInfo undefined');
          }
          return fromFirestoreDoc(item);
        })
      );
*/
    const docRef = doc(this.getfirestoreDocCollectionRef(), userId);
    const result$ = docData(docRef).pipe(
      map((item) => {
        if (item === undefined) {
          throw new Error('UserInfo undefined');
        }
        return fromFirestoreDoc(item);
      })
    );

    return result$;
  }

  public async save(item: UserInfo, userId: string): Promise<void> {
    const firestoreDoc = toFirestoreDoc(item);

    await this.firestoreService.setDoc(
      firestoreDoc,
      userId,
      getUsersCollectionPath()
    );
  }

  private getfirestoreDocCollectionRef(): CollectionReference<FirestoreDoc> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.firestore,
      getUsersCollectionPath()
    ) as CollectionReference<FirestoreDoc>;

    return collectionReference;
  }
}
