/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { inject, Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  query,
} from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

import { AngularfireFirestoreService } from './angularfire-firestore.service';
import { createId } from './services-util';

import { TaskListListItem } from '../models/task-list-list-item.model';

// https://firebase.google.com/docs/firestore
// https://github.com/FirebaseExtended/rxfire

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

export interface FirestoreDoc {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  //
  private firestoreService = inject(AngularfireFirestoreService);

  constructor(private firestore: Firestore) {
    // console.log('==== TaskListDataService:constructor');
  }

  // #region \\\\\\ for jasmine tests //////
  // These are here so Jasmine can spyOn them.
  // https://jasmine.github.io/tutorials/module_mocking#angular
  collectionPath(userId: string): string {
    //
    const path = `/${USERS_COLLECTION}/${userId}/${DATA_COLLECTION}`;

    return path;
  }

  fromFirestoreDoc(x: FirestoreDoc): TaskListListItem {
    //
    const result: TaskListListItem = {
      id: x.id,
      name: x.name,
    };

    return result;
  }

  toFirestoreDoc(item: TaskListListItem): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    if (item.id === '') {
      result.id = createId();
    }

    return result;
  }
  // #endregion

  // listenForData
  public getData(userId: string): Observable<TaskListListItem[]> {
    //
    const firestoreDocQuery = query(this.getfirestoreDocCollectionRef(userId));

    const modular$ = collectionData(firestoreDocQuery).pipe(
      map((items) =>
        items.map((item) => {
          console.log('item>', item);
          return this.fromFirestoreDoc(item);
        })
      )
    );

    return modular$;
  }

  public async removeItem(id: string, userId: string): Promise<void> {
    //
    const documentReference = doc(
      this.getfirestoreDocCollectionRef(userId),
      id
    );
    await deleteDoc(documentReference);
  }

  public async save(item: TaskListListItem, userId: string) {
    //
    const firestoreDoc = this.toFirestoreDoc(item);

    await this.firestoreService.setDoc(
      firestoreDoc,
      firestoreDoc.id,
      this.collectionPath(userId)
    );

    return firestoreDoc.id;
  }
  /*
  private createId(): string {
    //
    const result = createId();

    return result;
  }
*/

  private getfirestoreDocCollectionRef(
    userId: string
  ): CollectionReference<FirestoreDoc> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.firestore,
      this.collectionPath(userId)
    ) as CollectionReference<FirestoreDoc>;

    return collectionReference;
  }
}
