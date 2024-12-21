/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FirestoreService } from './firestore.service';
import { createId } from './services-util';

import { CurrentTask } from '../root-store/tasks-store/models/current-task.model';

const DATA_COLLECTION = 'current-todos';
const USERS_COLLECTION = 'users';

export interface FirestoreDoc {
  id: string;
  description: string | null;
  index: number;
  name: string;
  isComplete: boolean;
  completedTimestamp: number | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentTaskDataService {
  //
  readonly #firestoreService = inject(FirestoreService);

  collectionPath(taskListId: string, userId: string): string {
    //
    const path = `/${USERS_COLLECTION}/${userId}/todo-lists/${taskListId}/${DATA_COLLECTION}`;

    return path;
  }

  fromFirestoreDoc(x: FirestoreDoc): CurrentTask {
    //
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

  toFirestoreDoc(item: CurrentTask): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      index: item.index,
      isComplete: item.isComplete,
      completedTimestamp: item.completedTimestamp,
      name: item.name,
    };

    if (item.id === '') {
      result.id = createId();
    }

    return result;
  }

  public getData$(
    taskListId: string,
    userId: string
  ): Observable<CurrentTask[]> {
    //
    const modular$ = this.#firestoreService
      .collectionData<FirestoreDoc>(
        this.collectionPath(taskListId, userId),
        'index'
      )
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );

    return modular$;
  }

  public async reorderItems(
    ids: string[],
    taskListId: string,
    userId: string
  ): Promise<void> {
    //
    await this.#firestoreService.reorderDocs(
      ids,
      this.collectionPath(taskListId, userId)
    );
  }

  public async removeItem(
    id: string,
    taskListId: string,
    userId: string
  ): Promise<void> {
    //
    await this.#firestoreService.deleteDoc(
      id,
      this.collectionPath(taskListId, userId)
    );
  }

  public async save(
    item: CurrentTask,
    taskListId: string,
    userId: string
  ): Promise<void> {
    //
    const firestoreDoc = this.toFirestoreDoc(item);

    await this.#firestoreService.setDoc(
      firestoreDoc,
      firestoreDoc.id,
      this.collectionPath(taskListId, userId)
    );
  }
}
