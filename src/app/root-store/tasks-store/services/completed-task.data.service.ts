import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CompletedTask, newCompletedTask } from '../models';

const DATA_COLLECTION = 'completed-todos';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  description?: string;
  name: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CompletedTaskDataService {
  //
  constructor(public readonly afs: AngularFirestore) {}

  public getData(
    taskListId: string,
    userId: string
  ): Observable<CompletedTask[]> {
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

  public removeItem(id: string, taskListId: string, userId: string): void {
    this.firestoreCollection(taskListId, userId)
      .doc(id)
      .delete();
  }

  public save(item: CompletedTask, taskListId: string, userId: string): void {
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
      .collection<FirestoreDoc>(DATA_COLLECTION);
  }

  private toFirestoreDoc(item: CompletedTask): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      isComplete: item.isComplete,
      name: item.name,
    };

    return result;
  }

  private fromFirestoreDoc(x: FirestoreDoc): CompletedTask {
    //
    const result: CompletedTask = {
      ...newCompletedTask(),
      description: x.description,
      id: x.id,
      name: x.name,
    };

    return result;
  }
}
