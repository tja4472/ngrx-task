import { inject, Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentTask } from '../root-store/tasks-store/models';

// https://firebase.google.com/docs/firestore
// https://github.com/FirebaseExtended/rxfire

const DATA_COLLECTION = 'current-todos';
const USERS_COLLECTION = 'users';

// https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md
// https://stackoverflow.com/questions/69859073/genrate-doc-id-in-firestore-v9-before-the-doc-is-created

// https://github.com/angular/angularfire/blob/c8c8f4337e914bd6eb8f91f26cf5b04bac709e70/docs/firestore.md
// https://dev.to/jdgamble555/angular-12-with-firebase-9-49a0

export function getCurrentTasksCollectionPath(
  taskListId: string,
  userId: string
): string {
  const path = `/${USERS_COLLECTION}/${userId}/todo-lists/${taskListId}/${DATA_COLLECTION}`;

  return path;
}

interface FirestoreDoc {
  id: string;
  description: string | null;
  index: number;
  name: string;
  isComplete: boolean;
  completedTimestamp: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentTaskDataService {
  //
  // private firestore: Firestore = inject(Firestore);
  // private firestore;

  /*
  constructor(public readonly afs: AngularFirestore) {
  }
*/

  constructor(private firestore: Firestore) {}

  public getData$(
    taskListId: string,
    userId: string
  ): Observable<CurrentTask[]> {
    //
    /*    
    return this.firestoreCollection(taskListId, userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
*/
    /*
    const original$ = this.angularFirestoreCollection(taskListId, userId)
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
      this.getfirestoreDocCollectionRef(taskListId, userId),
      orderBy('index')
    );

    const modular$ = collectionData(firestoreDocQuery).pipe(
      map((items) =>
        items.map((item) => {
          return this.fromFirestoreDoc(item);
        })
      )
    );
    /*
    original$.subscribe((x) => {
      console.log('original$>', x);
    });
*/
    /*    
    modular$.subscribe((x) => {
      console.log('modular$>', x);
    });
*/

    // return original$;
    return modular$;
  }

  // https://firebase.google.com/docs/firestore/manage-data/transactions#web-version-9_2

  public async reorderItems(
    ids: string[],
    taskListId: string,
    userId: string
  ): Promise<void> {
    /*    
    const batch = this.afs.firestore.batch();

    ids.forEach((id, i) => {
      batch.update(
        this.angularFirestoreCollection(taskListId, userId).doc(id).ref,
        {
          index: i,
        }
      );
    });

    await batch.commit();
*/
    const batch = writeBatch(this.firestore);
    const collectionReference = this.getfirestoreDocCollectionRef(
      taskListId,
      userId
    );

    ids.forEach((id, i) => {
      const documentReference = doc(collectionReference, id);
      batch.update(documentReference, {
        index: i,
      });
    });

    await batch.commit();
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
    item: CurrentTask,
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

    /*
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const firestoreDocCollectionRef = collection(
      this.firestore,
      this.getPath(taskListId, userId)
    ) as CollectionReference<FirestoreDoc>;
*/
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
      getCurrentTasksCollectionPath(taskListId, userId)
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
      this.getPath(taskListId, userId),
      (ref) => ref.orderBy('index', 'asc')
    );
  }
*/
  private toFirestoreDoc(item: CurrentTask): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      index: item.index,
      isComplete: item.isComplete,
      completedTimestamp: item.completedTimestamp,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): CurrentTask {
    // Temp fix till all records in database updated.
    let completedTimestamp = x.completedTimestamp;

    if (completedTimestamp === undefined) {
      completedTimestamp = null;
    }
    //
    const result: CurrentTask = {
      description: x.description,
      id: x.id,
      index: x.index,
      isComplete: x.isComplete,
      completedTimestamp,
      name: x.name,
    };

    return result;
  }
}
