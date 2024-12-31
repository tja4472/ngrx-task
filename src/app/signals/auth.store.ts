import { Injectable } from '@angular/core';

import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { signalState, patchState } from '@ngrx/signals';

import { filter } from 'rxjs';

import { User } from 'firebase/auth';

import { injectAuth, user$ } from '@app/rxfire/auth';

export type AuthUser = User | null | undefined;

interface AuthState {
  email: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  email: null,
  userId: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  //
  readonly #state = signalState(initialState);
  readonly #auth = injectAuth();

  readonly email = this.#state.email;
  readonly $userId = this.#state.userId;

  // TODO: Remove this
  readonly user = toSignal(user$(this.#auth));

  // sources
  signIn$ = user$(this.#auth).pipe(filter((user) => !!user));

  signOut$ = user$(this.#auth).pipe(filter((user) => !user));

  constructor() {
    //
    // reducers
    console.log('>>>> AuthStore');
    this.signIn$.pipe(takeUntilDestroyed()).subscribe((user) => {
      console.log('>>>> AuthStore:signIn$');
      patchState(this.#state, {
        email: user.email,
        userId: user.uid,
      });
    });

    this.signOut$.pipe(takeUntilDestroyed()).subscribe(() => {
      console.log('>>>> AuthStore:signOut$');
      patchState(this.#state, {
        email: null,
        userId: null,
      });
    });
  }
}
