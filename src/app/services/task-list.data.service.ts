/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FirestoreService } from './firestore.service';
import { createId } from './services-util';

import { TaskListListItem } from '../models/task-list-list-item.model';

const DATA_COLLECTION = 'todo-lists';
const USERS_COLLECTION = 'users';

export interface FirestoreDoc {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListDataService {
  //
  readonly #firestoreService = inject(FirestoreService);

  collectionPath(userId: string): string {
    //
    const path = `/${USERS_COLLECTION}/${userId}/${DATA_COLLECTION}`;

    return path;
  }

  fromFirestoreDoc(x: FirestoreDoc): TaskListListItem {
    //
    const result: TaskListListItem = {
      id: x.id,
      name: x.name,
    };

    return result;
  }

  toFirestoreDoc(item: TaskListListItem): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
    };

    if (item.id === '') {
      result.id = createId();
    }

    return result;
  }

  public getData$(userId: string): Observable<TaskListListItem[]> {
    //
    const modular$ = this.#firestoreService
      .collectionData<FirestoreDoc>(this.collectionPath(userId))
      .pipe(
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
    //
    await this.#firestoreService.deleteDoc(id, this.collectionPath(userId));
  }

  public async save(item: TaskListListItem, userId: string) {
    //
    const firestoreDoc = this.toFirestoreDoc(item);

    await this.#firestoreService.setDoc(
      firestoreDoc,
      firestoreDoc.id,
      this.collectionPath(userId)
    );

    return firestoreDoc.id;
  }
}
