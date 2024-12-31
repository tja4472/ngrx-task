/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Injectable } from '@angular/core';

import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';

import { collectionData, docData } from 'rxfire/firestore';

import { injectFirestore } from '@app/rxfire/firestore';

/*
Proposal (Firestore): better default behaviour for the collectionData and
docData functions (for the underlying SDK's handling of optimistic updates) #84
https://github.com/FirebaseExtended/rxfire/issues/84
*/
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  //
  readonly #firestore: Firestore = injectFirestore();

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
