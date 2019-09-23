import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReorderArrayIndexes, Todo } from '../models';

// Use Deep imports here for smallest bunlde size
// import { map } from 'rxjs/operators/map';

// import { reorderArray } from 'ionic-angular';

const DATA_COLLECTION = 'current-todos';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description?: string;
  index: number;
  name: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  //
  constructor(public readonly afs: AngularFirestore) {
    console.log('TodoDataService:constructor');
  }

  public getData$(todoListId: string, userId: string): Observable<Todo[]> {
    //
    console.log('######getData>', userId);

    return this.firestoreCollection(todoListId, userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
  }

  public reorderItemsAndUpdate(
    indexes: ReorderArrayIndexes,
    todos: Todo[],
    todoListId: string,
    userId: string
  ): void {
    const itemsToSave = [...todos];
    // reorderArray(itemsToSave, indexes);
    itemsToSave.forEach((t, i) => {
      this.firestoreCollection(todoListId, userId)
        .doc(t.id)
        .update({ index: i });
    });
  }

  public reorderItems(ids: string[], todoListId: string, userId: string): void {
    const batch = this.afs.firestore.batch();

    ids.forEach((id, i) => {
      /*      
      this.firestoreCollection(todoListId, userId)
        .doc(id)
        .update({ index: i });
*/
      batch.update(this.firestoreCollection(todoListId, userId).doc(id).ref, {
        index: i,
      });
    });

    batch.commit();
  }

  public removeItem(id: string, todoListId: string, userId: string): void {
    this.firestoreCollection(todoListId, userId)
      .doc(id)
      .delete();
  }

  public save(item: Todo, todoListId: string, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.firestoreCollection(todoListId, userId)
      .doc(doc.id)
      .set(doc);
  }

  private firestoreCollection(todoListId: string, userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('todo-lists')
      .doc(todoListId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('index', 'asc')
      );
  }

  private toFirestoreDoc(item: Todo): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      index: item.index,
      isComplete: item.isComplete,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): Todo {
    //
    const result: Todo = {
      description: x.description,
      id: x.id,
      index: x.index,
      isComplete: x.isComplete,
      name: x.name,
    };

    return result;
  }
}
