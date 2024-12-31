import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { signalState, patchState } from '@ngrx/signals';

import { filter, switchMap, throttleTime } from 'rxjs';

// import { isEqual } from 'lodash';

import { UserInfoDataService } from '@app/services/user-info.data.service';

import { AuthStore } from './auth.store';
import { concatLatestFrom, mapResponse } from '@ngrx/operators';

interface UserInfoState {
  todoListId: string | null;
  userId: string | null;
}

const initialState: UserInfoState = {
  todoListId: null,
  userId: null,
};

@Injectable({
  providedIn: 'root',
})
export class UserInfoStore {
  //
  readonly #state = signalState(initialState);

  readonly #authStore = inject(AuthStore);
  readonly #dataService = inject(UserInfoDataService);

  readonly $todoListId = this.#state.todoListId;
  readonly userId = this.#state.userId;

  XXX_userId$ = toObservable(this.#authStore.$userId).pipe(
    filter((userId): userId is string => !!userId)
  );

  private YYYY$ = this.XXX_userId$.pipe(
    switchMap((userId) => {
      console.log('Calling getDataForSignals$');
      return this.#dataService.getDataForSignals$(userId).pipe(
        mapResponse({
          next: (userInfo) => userInfo,
          error: (error: { message: string }) => {
            console.error(error);
          },
        })
      );
    }),
    // See: https://github.com/FirebaseExtended/rxfire/issues/50
    throttleTime(500),
    concatLatestFrom(() => this.XXX_userId$)
  ).subscribe(([userInfo, userId]) => {
    console.log('YYYY$:userId>', userId);
    console.log('YYYY$:userInfo>', userInfo);
  });

  /*
  XXX_userId$ = toObservable(this.#authStore.userId);

  private YYYY$ = this.XXX_userId$.pipe(
    filter((userId): userId is string => !!userId),
    switchMap((userId) => {
      return this.#dataService.getData$(userId).pipe(
        mapResponse({
          next: (userInfo) => userInfo,
          error: (error: { message: string }) => {
            console.error(error);
          },
        })
      );
    }),
    concatLatestFrom(() => this.XXX_userId$)
  ).subscribe(([userInfo, userId]) => {
    console.log('YYYY$:userId>', userId);
    console.log('YYYY$:userInfo>', userInfo);
  });
*/

  /*
  private YYYY$ = this.XXX_userId$.pipe(
    filter((userId): userId is string => !!userId),
    switchMap((userId) => {
      return this.#dataService.getData$(userId);
    }),
    concatLatestFrom(() => this.XXX_userId$)
  ).subscribe(([userInfo, userId]) => {
    console.log('YYYY$:userId>', userId);
    console.log('YYYY$:userInfo>', userInfo);
  });
*/

  // sources
  private userInfo$ = toObservable(this.#authStore.$status).pipe(
    filter((status) => status === 'SignedIn'),
    switchMap(() => {
      return this.#dataService.getData$(this.#authStore.$userId());
    })
  );

  private signOut$ = toObservable(this.#authStore.$status).pipe(
    filter((status) => status === 'SignedOut')
  );

  /* This stops signin from working.
    // Firebase returns two identical objects
    distinctUntilChanged(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      (previous, current) => {
        console.log('previous>', previous)
        console.log('current>', current)        
        return isEqual(previous, current);
      }
    )
      */

  constructor() {
    //
    // reducers
    console.log('>>>> UserInfoStore');
    this.userInfo$.pipe(takeUntilDestroyed()).subscribe((userInfo) => {
      console.log('>>>> UserInfoStore:userInfo$>', userInfo);
      patchState(this.#state, {
        todoListId: userInfo.todoListId,
        userId: this.#authStore.$userId(),
      });
    });

    this.signOut$.pipe(takeUntilDestroyed()).subscribe(() => {
      console.log('>>>> UserInfoStore:signOut$>');
      patchState(this.#state, {
        todoListId: null,
        userId: null,
      });
    });
  }
}
