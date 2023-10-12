import { Injectable } from '@angular/core';

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

import { TaskListListItem } from '../root-store/tasks-store/models/task-list-list-item.model';

// https://firebase.google.com/docs/firestore
// https://github.com/FirebaseExtended/rxfire

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

export function getTaskListCollectionPath(userId: string): string {
  const path = `/${USERS_COLLECTION}/${userId}/${DATA_COLLECTION}`;

  return path;
}

interface FirestoreDoc {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  constructor(private firestore: Firestore) {}

  public getData(userId: string): Observable<TaskListListItem[]> {
    //
    /*
    return this.angularFirestoreCollection(userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
*/
    console.log('===getData>', userId);
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
    // await this.angularFirestoreCollection(userId).doc(id).delete();
    const documentReference = doc(
      this.getfirestoreDocCollectionRef(userId),
      id
    );
    await deleteDoc(documentReference);
  }

  public async save(item: TaskListListItem, userId: string): Promise<void> {
    const firestoreDoc = this.toFirestoreDoc(item);
    /*
    if (item.id === '') {
      firestoreDoc.id = this.afs.createId();
    }

    await this.angularFirestoreCollection(userId)
      .doc(firestoreDoc.id)
      .set(firestoreDoc);
*/
    if (item.id === '') {
      firestoreDoc.id = this.createId();
    }

    await setDoc(
      doc(this.getfirestoreDocCollectionRef(userId), firestoreDoc.id),
      firestoreDoc
    );
  }

  /*
  public saveB(item: TaskListListItem, userId: string) {
    const firestoreDoc = this.toFirestoreDoc(item);

    if (item.id === '') {
      firestoreDoc.id = this.afs.createId();
    }

    return this.angularFirestoreCollection(userId)
      .doc(firestoreDoc.id)
      .set(firestoreDoc);
  }
*/

  private createId(): string {
    const id = doc(collection(this.firestore, 'id')).id;

    return id;
  }

  private getfirestoreDocCollectionRef(
    userId: string
  ): CollectionReference<FirestoreDoc> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.firestore,
      getTaskListCollectionPath(userId)
    ) as CollectionReference<FirestoreDoc>;

    return collectionReference;
  }
  /*
  private angularFirestoreCollection(
    userId: string
  ): AngularFirestoreCollection<FirestoreDoc> {
    //
    return this.afs.collection<FirestoreDoc>(
      getTaskListCollectionPath(userId),
      (ref) => ref.orderBy('name', 'asc')
    );
  }
*/

  private toFirestoreDoc(item: TaskListListItem): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): TaskListListItem {
    //
    const result: TaskListListItem = {
      id: x.id,
      name: x.name,
    };

    return result;
  }
}
