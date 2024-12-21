/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { inject, Injectable } from '@angular/core';

import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  query,
  orderBy,
  docData,
  writeBatch,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AngularfireFirestoreService {
  //
  readonly #firestore: Firestore = inject(Firestore);

  public collectionData<T>(collectionPath: string, orderbyField = '') {
    //
    const reference = collection(
      this.#firestore,
      collectionPath
    ) as CollectionReference<T>;

    if (orderbyField == '') {
      return collectionData(query(reference));
    } else {
      return collectionData(query(reference, orderBy(orderbyField)));
    }
  }

  public deleteDoc(
    documentPath: string,
    collectionPath: string
  ): Promise<void> {
    //
    const reference = collection(this.#firestore, collectionPath);

    return deleteDoc(doc(reference, documentPath));
  }

  public docData<T>(documentPath: string, collectionPath: string) {
    //

    const reference = collection(
      this.#firestore,
      collectionPath
    ) as CollectionReference<T>;

    return docData(doc(reference, documentPath));
  }

  public setDoc(
    firestoreDoc: object,
    documentPath: string,
    collectionPath: string
  ): Promise<void> {
    //
    const reference = collection(this.#firestore, collectionPath);

    return setDoc(doc(reference, documentPath), firestoreDoc);
  }

  public async reorderDocs(
    ids: string[],
    collectionPath: string
  ): Promise<void> {
    //
    const reference = collection(this.#firestore, collectionPath);

    const batch = writeBatch(this.#firestore);

    ids.forEach((id, i) => {
      const documentReference = doc(reference, id);
      batch.update(documentReference, {
        index: i,
      });
    });

    await batch.commit();
  }
}
