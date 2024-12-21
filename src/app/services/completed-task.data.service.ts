/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FirestoreService } from './firestore.service';
import { createId } from './services-util';

import {
  CompletedTask,
  newCompletedTask,
} from '../root-store/tasks-store/models/completed-task.model';

const DATA_COLLECTION = 'completed-todos';
const USERS_COLLECTION = 'users';

export interface FirestoreDoc {
  id: string;
  description: string | null;
  name: string;
  isComplete: boolean;
  completedTimestamp: number;
  updatedTimestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CompletedTaskDataService {
  //
  readonly #firestoreService = inject(FirestoreService);

  collectionPath(taskListId: string, userId: string): string {
    //
    const path = `/${USERS_COLLECTION}/${userId}/todo-lists/${taskListId}/${DATA_COLLECTION}`;

    return path;
  }

  private fromFirestoreDoc(x: FirestoreDoc): CompletedTask {
    //
    // Temp fix till all records in database updated.
    let completedTimestamp = x.completedTimestamp;
    let updatedTimestamp = x.updatedTimestamp;

    if (updatedTimestamp === undefined) {
      updatedTimestamp = Date.now();
    }

    if (completedTimestamp === undefined) {
      completedTimestamp = updatedTimestamp;
    }

    const result: CompletedTask = {
      ...newCompletedTask(),
      description: x.description,
      id: x.id,
      name: x.name,
      completedTimestamp,
      updatedTimestamp,
    };

    return result;
  }

  private toFirestoreDoc(item: CompletedTask): FirestoreDoc {
    //
    const result: FirestoreDoc = {
      description: item.description,
      id: item.id,
      isComplete: item.isComplete,
      completedTimestamp: item.completedTimestamp,
      name: item.name,
      updatedTimestamp: Date.now(),
    };

    if (item.id === '') {
      result.id = createId();
    }

    return result;
  }

  public getData$(
    taskListId: string,
    userId: string
  ): Observable<CompletedTask[]> {
    //
    const modular$ = this.#firestoreService
      .collectionData<FirestoreDoc>(this.collectionPath(taskListId, userId))
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          })
        )
      );

    return modular$;
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
    item: CompletedTask,
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
