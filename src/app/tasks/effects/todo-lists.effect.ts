import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, Observable } from 'rxjs';
import {
  exhaustMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  AuthApiActions,
  SignInPageActions,
  SignOutConfirmationAlertActions,
  SignUpPageActions,
} from '@app/auth/actions';
import { authQuery } from '@app/auth/selectors/auth.selectors';

import { TaskActions } from '../actions';
import {
  ListenForData,
  LoadSuccess,
  Remove,
  Save,
  TodoListsActionTypes,
  UnlistenForData,
} from '../actions/todo-lists.action';
import { TodoListsDataService } from '../services/todo-lists.data.service';

@Injectable()
export class TodoListsEffects {
  constructor(
    private actions$: Actions<AuthApiActions.AuthApiActionsUnion>,
    private store: Store<any>,
    private dataService: TodoListsDataService
  ) {}

  /*
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  qqq$ = this.actions$.pipe(
    ofType(TaskActions.enterTaskListsPage.type),
    tap(() => console.log('bbbbb')), 
  );
*/

  /* aa
  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType<ListenForAuthSuccess>(AuthActionTypes.LISTEN_FOR_AUTH_SUCCESS),
    map((action) => action.payload),
    map(
      (payload) => new ListenForData({ userId: payload.signedInUser.userId }),
    ),
  );
*/

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInHaveUser.type),
    map((action) => new ListenForData({ userId: action.user.id }))
  );

  /* aa
  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthNoUser$ = this.actions$.pipe(
    ofType<ListenForAuthNoUser>(AuthActionTypes.LISTEN_FOR_AUTH_NO_USER),
    // .map((action) => action.payload)
    map(() => new UnlistenForData()),
  );
*/

  // tslint:disable-next-line:member-ordering
  @Effect()
  authListenForAuthNoUser$ = this.actions$.pipe(
    ofType(AuthApiActions.autoSignInNoUser.type),
    map(() => new UnlistenForData())
  );

  /*
  // tslint:disable-next-line:member-ordering
  @Effect()
  loadSuccess$ = this.actions$
    .ofType<LoadSuccess>(TodoListsActionTypes.LoadSuccess)
    .map((action) => action.payload)
    .map(
      (payload) => new set todoListId({ userId: payload.userId }),
    );
*/

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType<ListenForData | UnlistenForData>(
      TodoListsActionTypes.ListenForData,
      TodoListsActionTypes.UnlistenForData
    ),
    tap((x) => {
      console.log('Effect:listenForData$:A', x);
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);

      if (action.type === TodoListsActionTypes.UnlistenForData) {
        console.log('TodoAction.UNLISTEN_FOR_DATA');
        return EMPTY;
      } else {
        return this.dataService
          .getData(action.payload.userId)
          .pipe(
            map(
              (items) =>
                new LoadSuccess({ items, userId: action.payload.userId })
            )
          );
      }
    }),
    tap((x) => {
      console.log('xxxxxEffect:listenForData$:B', x);
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$.pipe(
    ofType<Remove>(TodoListsActionTypes.Remove),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:removeItem$:A', { action, user });
      this.dataService.removeItem(action.payload, user.id);
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$.pipe(
    ofType<Save>(TodoListsActionTypes.Save),
    withLatestFrom(this.store.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      console.log('Effect:save$:A', { action, user });

      this.dataService.save(action.payload, user.id);
    })
  );
}
