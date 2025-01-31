import { computed, inject, Injectable, untracked } from '@angular/core';

import { tapResponse } from '@ngrx/operators';
import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { filter, pipe, switchMap, tap, throttleTime } from 'rxjs';

import { TaskListListItem } from '@app/models/task-list-list-item.model';
import { TaskListDataService } from '@app/services/task-list.data.service';

import { AuthStatus, AuthStore } from './auth.store';

interface TaskListState {
  taskLists: TaskListListItem[];
  error: string | null;
  isLoaded: boolean;
}

const initialState: TaskListState = {
  taskLists: [],
  error: null,
  isLoaded: false,
};

interface SessionType {
  isSignedIn: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskListStore {
  //
  readonly #state = signalState(initialState);

  readonly #authStore = inject(AuthStore);

  readonly #dataService = inject(TaskListDataService);

  readonly $taskLists = this.#state.taskLists;
  readonly $error = this.#state.error;
  readonly $isLoaded = this.#state.isLoaded;

  private readonly $session = computed(() => {
    //
    const result: SessionType = {
      isSignedIn: untracked(this.#authStore.$status) === 'SignedIn',
      userId: this.#authStore.$userId(),
    };

    return result;
  });

  private readonly $updateStore = rxMethod<SessionType>(
    pipe(
      filter((session) => session.isSignedIn),
      switchMap((session) => {
        return this.#dataService.getData$(session.userId).pipe(
          // collectionData fires twice
          // See: https://github.com/FirebaseExtended/rxfire/issues/50
          throttleTime(500),
          tapResponse({
            next: (items) => {
              patchState(this.#state, {
                taskLists: items,
                isLoaded: true,
              });
            },
            error: console.error,
          })
        );
      })
    )
  );

  private readonly $clearStore = rxMethod<AuthStatus>(
    pipe(
      filter((status) => status === 'SignedOut'),
      tap(() => {
        patchState(this.#state, { taskLists: [], isLoaded: false });
      })
    )
  );

  constructor() {
    //
    this.$updateStore(this.$session);
    this.$clearStore(this.#authStore.$status);
  }
}
