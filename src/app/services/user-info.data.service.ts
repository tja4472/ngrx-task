/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/class-literal-property-style */
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FirestoreService } from './firestore.service';

import { UserInfo } from '@app/models/user-info.model';

const USERS_COLLECTION = 'users';
export interface FirestoreDoc {
  todoListId: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoDataService {
  //
  readonly #firestoreService = inject(FirestoreService);

  collectionPath(): string {
    //
    const path = `/${USERS_COLLECTION}`;

    return path;
  }

  fromFirestoreDoc = (x: FirestoreDoc): UserInfo => {
    //
    const result: UserInfo = {
      todoListId: x.todoListId,
    };

    return result;
  };

  toFirestoreDoc = (item: UserInfo): FirestoreDoc => {
    //
    const result: FirestoreDoc = {
      todoListId: item.todoListId,
    };

    return result;
  };

  public getData$(userId: string): Observable<UserInfo> {
    //
    console.log('UserInfoDataService:getData$');

    const result$ = this.#firestoreService
      .docData<FirestoreDoc>(userId, this.collectionPath())
      .pipe(
        map((item) => {
          if (item === undefined) {
            throw new Error('UserInfo undefined');
          }
          return this.fromFirestoreDoc(item);
        })
      );

    return result$;
  }

  public getDataForSignals$(userId: string): Observable<UserInfo> {
    //
    console.log('UserInfoDataService:getDataForSignals$');

    const result$ = this.#firestoreService
      .docData<FirestoreDoc>(userId, this.collectionPath())
      .pipe(
        map((item) => {
          console.log('UserInfoDataService:getDataForSignals$:map');          
          if (item === undefined) {
            throw new Error('UserInfo undefined');
          }
          return this.fromFirestoreDoc(item);
        })
      );

    return result$;
  }

  public async save(item: UserInfo, userId: string): Promise<void> {
    //
    const firestoreDoc = this.toFirestoreDoc(item);

    console.log('UserInfoDataService:save')
    await this.#firestoreService.setDoc(
      firestoreDoc,
      userId,
      this.collectionPath()
    );
  }
}
