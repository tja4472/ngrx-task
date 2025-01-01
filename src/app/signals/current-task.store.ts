import { computed, inject, Injectable, untracked } from '@angular/core';

import { tapResponse } from '@ngrx/operators';
import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { filter, pipe, switchMap, tap, throttleTime } from 'rxjs';

import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';
import { CurrentTaskDataService } from '@app/services/current-task.data.service';

import { AuthStatus, AuthStore } from './auth.store';
import { UserInfoStore } from './user-info.store';

interface CurrentTaskState {
  currentTasks: CurrentTask[];
  error: string | null;
  isLoaded: boolean;
}

const initialState: CurrentTaskState = {
  currentTasks: [],
  error: null,
  isLoaded: false,
};

interface SessionType {
  isSignedIn: boolean;
  userId: string;
  todoListId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentTaskStore {
  //
  readonly #state = signalState(initialState);

  readonly #authStore = inject(AuthStore);
  readonly #userInfoStore = inject(UserInfoStore);

  readonly #dataService = inject(CurrentTaskDataService);

  readonly $currentTasks = this.#state.currentTasks;
  readonly $error = this.#state.error;
  readonly $isLoaded = this.#state.isLoaded;

  private readonly $session = computed(() => {
    //
    const result: SessionType = {
      isSignedIn: untracked(this.#authStore.$status) === 'SignedIn',
      userId: untracked(this.#authStore.$userId),
      todoListId: this.#userInfoStore.$todoListId() ?? '',
    };

    return result;
  });

  private readonly $updateStore = rxMethod<SessionType>(
    pipe(
      filter((session) => session.isSignedIn),
      switchMap((session) => {
        return this.#dataService
          .getData$(session.todoListId, session.userId)
          .pipe(
            // collectionData fires twice
            // See: https://github.com/FirebaseExtended/rxfire/issues/50
            throttleTime(500),
            tapResponse({
              next: (items) => {
                patchState(this.#state, {
                  currentTasks: items,
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
        patchState(this.#state, { currentTasks: [], isLoaded: false });
      })
    )
  );

  constructor() {
    //
    this.$updateStore(this.$session);
    this.$clearStore(this.#authStore.$status);
  }
}
