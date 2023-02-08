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

import {
  CompletedTask,
  newCompletedTask,
} from '../root-store/tasks-store/models';

// https://firebase.google.com/docs/firestore
// https://github.com/FirebaseExtended/rxfire

const DATA_COLLECTION = 'completed-todos';
const USERS_COLLECTION = 'users';

export function getCompletedTasksCollectionPath(
  taskListId: string,
  userId: string
): string {
  const path = `/${USERS_COLLECTION}/${userId}/todo-lists/${taskListId}/${DATA_COLLECTION}`;

  return path;
}

interface FirestoreDoc {
  id: string;
  description: string | null;
  name: string;
  isComplete: boolean;
  completedTimestamp: number;
  updatedTimestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CompletedTaskDataService {
  //
  constructor(private firestore: Firestore) {}

  public getData(
    taskListId: string,
    userId: string
  ): Observable<CompletedTask[]> {
    //
    /*    
    return this.angularFirestoreCollection(taskListId, userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
*/
    const firestoreDocQuery = query(
      this.getfirestoreDocCollectionRef(taskListId, userId)
    );

    const modular$ = collectionData(firestoreDocQuery).pipe(
      map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        })
      )
    );

    return modular$;
  }

  public async removeItem(
    id: string,
    taskListId: string,
    userId: string
  ): Promise<void> {
    // await this.angularFirestoreCollection(taskListId, userId).doc(id).delete();
    const documentReference = doc(
      this.getfirestoreDocCollectionRef(taskListId, userId),
      id
    );
    await deleteDoc(documentReference);
  }

  public async save(
    item: CompletedTask,
    taskListId: string,
    userId: string
  ): Promise<void> {
    const firestoreDoc = this.toFirestoreDoc(item);

    /*
    if (item.id === '') {
      firestoreDoc.id = this.afs.createId();
    }

    await this.angularFirestoreCollection(taskListId, userId)
      .doc(firestoreDoc.id)
      .set(firestoreDoc);
*/
    if (item.id === '') {
      firestoreDoc.id = this.createId();
    }

    await setDoc(
      doc(
        this.getfirestoreDocCollectionRef(taskListId, userId),
        firestoreDoc.id
      ),
      firestoreDoc
    );
  }

  private createId(): string {
    const id = doc(collection(this.firestore, 'id')).id;

    return id;
  }

  private getfirestoreDocCollectionRef(
    taskListId: string,
    userId: string
  ): CollectionReference<FirestoreDoc> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.firestore,
      getCompletedTasksCollectionPath(taskListId, userId)
    ) as CollectionReference<FirestoreDoc>;

    return collectionReference;
  }
  /*
  private angularFirestoreCollection(
    taskListId: string,
    userId: string
  ): AngularFirestoreCollection<FirestoreDoc> {
    //
    return this.afs.collection<FirestoreDoc>(
      getCompletedTasksCollectionPath(taskListId, userId)
    );
  }
*/
  private toFirestoreDoc(item: CompletedTask): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      isComplete: item.isComplete,
      completedTimestamp: item.completedTimestamp,
      name: item.name,
      updatedTimestamp: Date.now(),
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): CompletedTask {
    // Temp fix till all records in database updated.
    let completedTimestamp = x.completedTimestamp;
    let updatedTimestamp = x.updatedTimestamp;

    if (updatedTimestamp === undefined) {
      updatedTimestamp = Date.now();
    }

    if (completedTimestamp === undefined) {
      completedTimestamp = updatedTimestamp;
    }

    const result: CompletedTask = {
      ...newCompletedTask(),
      description: x.description,
      id: x.id,
      name: x.name,
      completedTimestamp,
      updatedTimestamp,
    };

    return result;
  }
}
