import { inject, Injectable } from '@angular/core';

import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AngularfireFirestoreService {
  //
  private firestore: Firestore = inject(Firestore);

  public setDoc(
    firestoreDoc: object,
    documentPath: string,
    collectionPath: string
  ): Promise<void> {
    //
    const reference = collection(this.firestore, collectionPath); // as CollectionReference<FirestoreDoc>;

    return setDoc(doc(reference, documentPath), firestoreDoc);
  }
}
