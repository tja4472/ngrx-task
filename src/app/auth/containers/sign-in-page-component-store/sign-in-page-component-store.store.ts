import { Injectable } from '@angular/core';

import { ComponentStore, tapResponse } from '@ngrx/component-store';

import { EMPTY, from, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  pairwise,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Credentials } from '@app/auth/models/credentials.model';
import { AuthService } from '@app/auth/services/auth.service';

export interface SignInPageComponentStoreState {
  error: string | null;
  isProcessing: boolean;
}

type voidFunction = () => void;

@Injectable()
export class SignInPageComponentStore extends ComponentStore<SignInPageComponentStoreState> {
  constructor(private readonly authService: AuthService) {
    // set defaults
    super({ error: null, isProcessing: false });
  }

  // *********** Updaters *********** //

  // *********** Selectors *********** //

  // ViewModel of component
  readonly vm$ = this.select((state) => state);

  readonly error$ = this.select((state) => state.error);

  readonly isProcessing$ = this.select((state) => state.isProcessing);

  // *********** Effects *********** //
  readonly signIn = this.effect(
    (c$: Observable<{ credentials: Credentials; onFinish?: voidFunction }>) => {
      return c$.pipe(
        tap(() => {
          this.patchState({ isProcessing: true });
        }),
        concatMap((c) =>
          from(
            this.authService.bbbsignIn(
              c.credentials.username,
              c.credentials.password
            )
          ).pipe(
            tapResponse(
              (c) => {
                // console.log('effect:signIn - nextFn');
              },
              (error: { message: string }) => {
                // console.log('effect:signIn - errorFn>', error.message);
                this.patchState({ isProcessing: false });
                this.patchState({ error: error.message });
                if (c.onFinish) {
                  c.onFinish();
                }
              },
              () => {
                // console.log('effect:signIn - completeFn');
                this.patchState({ isProcessing: false });

                if (c.onFinish) {
                  c.onFinish();
                }
              }
            ),

            catchError(() => {
              console.log('effect:signIn - catchError');
              return EMPTY;
            })
          )
        )
      );
    }
  );
}
