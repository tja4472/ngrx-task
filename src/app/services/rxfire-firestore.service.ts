import { inject, Injectable } from '@angular/core';

import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';

import { injectFirestore } from '@app/rxfire/firestore';

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

@Injectable({
  providedIn: 'root',
})
export class RxfireFirestoreService {
  //
  readonly #firestore = injectFirestore();

  public setDoc(
    firestoreDoc: object,
    documentPath: string,
    collectionPath: string
  ): Promise<void> {
    //
    const reference = collection(this.#firestore, collectionPath);

    return setDoc(doc(reference, documentPath), firestoreDoc);
  }

  // ===============================
  public getData(userId: string) {
    //
    const firestoreDocQuery = query(this.getfirestoreDocCollectionRef(userId));

    collectionData(firestoreDocQuery).subscribe((y) => {
      //
      console.log('>>>>>>>>>rxfire y>', y);
    });
  }

  private getfirestoreDocCollectionRef(userId: string) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const collectionReference = collection(
      this.#firestore,
      this.collectionPath(userId)
    );

    return collectionReference;
  }

  collectionPath(userId: string): string {
    //
    const path = `/${USERS_COLLECTION}/${userId}/${DATA_COLLECTION}`;

    return path;
  }
}
