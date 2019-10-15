import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CurrentTask } from '../root-store/tasks-store/models';

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
export class CurrentTaskDataService {
  //
  constructor(public readonly afs: AngularFirestore) {}

  public getData$(
    taskListId: string,
    userId: string
  ): Observable<CurrentTask[]> {
    //

    return this.firestoreCollection(taskListId, userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );
  }

  public reorderItems(ids: string[], taskListId: string, userId: string): void {
    const batch = this.afs.firestore.batch();

    ids.forEach((id, i) => {
      /*      
      this.firestoreCollection(todoListId, userId)
        .doc(id)
        .update({ index: i });
*/
      batch.update(this.firestoreCollection(taskListId, userId).doc(id).ref, {
        index: i,
      });
    });

    batch.commit();
  }

  public removeItem(id: string, taskListId: string, userId: string): void {
    this.firestoreCollection(taskListId, userId)
      .doc(id)
      .delete();
  }

  public save(item: CurrentTask, taskListId: string, userId: string): void {
    const doc = this.toFirestoreDoc(item);

    if (item.id === '') {
      doc.id = this.afs.createId();
    }

    this.firestoreCollection(taskListId, userId)
      .doc(doc.id)
      .set(doc);
  }

  private firestoreCollection(taskListId: string, userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('todo-lists')
      .doc(taskListId)
      .collection<FirestoreDoc>(DATA_COLLECTION, (ref) =>
        ref.orderBy('index', 'asc')
      );
  }

  private toFirestoreDoc(item: CurrentTask): FirestoreDoc {
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

  private fromFirestoreDoc(x: FirestoreDoc): CurrentTask {
    //
    const result: CurrentTask = {
      description: x.description,
      id: x.id,
      index: x.index,
      isComplete: x.isComplete,
      name: x.name,
    };

    return result;
  }
}
