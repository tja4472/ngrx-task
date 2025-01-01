import { computed, inject, Injectable, untracked } from '@angular/core';

import { tapResponse } from '@ngrx/operators';
import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { filter, pipe, switchMap, tap, throttleTime } from 'rxjs';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AuthStatus, AuthStore } from './auth.store';

interface UserInfoState {
  todoListId: string | null;
  userId: string | null;
}

const initialState: UserInfoState = {
  todoListId: null,
  userId: null,
};

interface SessionType {
  isSignedIn: boolean;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoStore {
  //
  readonly #state = signalState(initialState);

  readonly #authStore = inject(AuthStore);
  readonly #dataService = inject(UserInfoDataService);

  readonly $todoListId = this.#state.todoListId;
  readonly $userId = this.#state.userId;

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
            next: (userInfo) => {
              patchState(this.#state, {
                todoListId: userInfo.todoListId,
                userId: this.#authStore.$userId(),
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
        patchState(this.#state, {
          todoListId: null,
          userId: null,
        });
      })
    )
  );

  constructor() {
    //
    this.$updateStore(this.$session);
    this.$clearStore(this.#authStore.$status);
  }
}
