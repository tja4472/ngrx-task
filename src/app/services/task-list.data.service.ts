import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
} from '@angular/fire/firestore';

import { TaskListFirestoreDoc } from '../firestore-docs/task-list.doc';

import { TaskListListItem } from '../models/task-list-list-item.model';
import { FirestoreUtils } from '../utils/firestore-utils';

// https://firebase.google.com/docs/firestore
// https://github.com/FirebaseExtended/rxfire

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  firestoreUtils = inject(FirestoreUtils);

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

  fromFirestoreDoc(x: TaskListFirestoreDoc): TaskListListItem {
    //
    const result: TaskListListItem = {
      id: x.id,
      name: x.name,
    };

    return result;
  }

  toFirestoreDoc(item: TaskListListItem): TaskListFirestoreDoc {
    //
    const result: TaskListFirestoreDoc = {
      id: item.id,
      name: item.name,
    };

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

    if (item.id === '') {
      firestoreDoc.id = this.createId();
    }

    await setDoc(
      doc(this.getfirestoreDocCollectionRef(userId), firestoreDoc.id),
      firestoreDoc
    );

    return firestoreDoc.id;
  }

  private createId(): string {
    //
    const result = this.firestoreUtils.createId();

    return result;
  }

  private getfirestoreDocCollectionRef(
    userId: string
  ): CollectionReference<TaskListFirestoreDoc> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.firestore,
      this.collectionPath(userId)
    ) as CollectionReference<TaskListFirestoreDoc>;

    return collectionReference;
  }
}
