import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { authQuery } from '@app/auth/selectors/auth.selectors';

import { enterCurrentTasksPage } from '../actions/task.actions';
import {
  ClearCompleted,
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  LoadSuccess,
  ReorderList,
  ReorderListA,
  TodoActionTypes,
  UpsertItem,
} from '../actions/todo.action';
import { Todo } from '../models';
import { State, taskFeatureKey } from '../reducers';
// import * as FromRootReducer from '../reducers';
import { Fb1DataService } from '../services/fb1.data.service';
import { TodoDataService } from '../services/todo.data.service';

@Injectable()
export class TodoEffects {
  //
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private storeAny: Store<any>,
    private dataService: TodoDataService,
    private fb1DataService: Fb1DataService
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  clearCompleted$ = this.actions$.pipe(
    ofType<ClearCompleted>(TodoActionTypes.ClearCompleted),
    withLatestFrom(this.store),
    tap(([action, state]) => {
      const completed = state[taskFeatureKey].todo.todos.filter(
        (a) => a.isComplete
      );
      this.fb1DataService.clearCompletedTodos(
        completed,
        action.payload.todoListId,
        action.payload.userId
      );
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  enterCurrentTasksPage$ = this.actions$.pipe(
    ofType(enterCurrentTasksPage.type),
    withLatestFrom(this.storeAny.select(authQuery.selectAuthUser)),
    map(
      ([, user]) =>
        new DatabaseListenForDataStart({
          todoListId: user.todoListId,
          userId: user.id,
        })
    )
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP
    ),
    // Watch database node and get items.
    switchMap((action) => {
      if (action.type === TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP) {
        return EMPTY;
      } else {
        return this.dataService
          .getData$(action.payload.todoListId, action.payload.userId)
          .pipe(map((items: Todo[]) => new LoadSuccess(items)));
      }
    })
  );

  /*
    @Effect() loadCollection$ = this.updates$
      .whenAction(ToDoActions.LOAD)
      .do(x => { console.log('Effect:loadCollection$:A', x); })
      .filter(x => x.state.login.isAuthenticated)

      // Watch database node and get items.
      .switchMap(x => this.todoDataService.getData())
      .do(x => { console.log('Effect:loadCollection$:B', x); })
      .map((items: ToDo[]) => this.todoActions.loadSuccess(items));
    // Terminate effect.
    // .ignoreElements());
  */
  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  reorderList$ = this.actions$.pipe(
    ofType<ReorderList>(TodoActionTypes.ReorderList),
    withLatestFrom(this.store),
    tap(([action, state]) => {
      this.dataService.reorderItemsAndUpdate(
        action.payload.indexes,
        state[taskFeatureKey].todo.todos,
        action.payload.todoListId,
        action.payload.userId
      );
    })
  );

  @Effect({ dispatch: false })
  reorderListA$ = this.actions$.pipe(
    ofType<ReorderListA>(TodoActionTypes.ReorderListA),
    withLatestFrom(this.storeAny.select(authQuery.selectAuthUser)),
    tap(([action, user]) => {
      this.dataService.reorderItems(
        action.payload.ids,
        user.todoListId,
        user.id
      );
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeItem$ = this.actions$.pipe(
    ofType(TodoActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:removeItem$:A', payload);
      this.dataService.removeItem(
        payload.itemId,
        payload.todoListId,
        payload.userId
      );
    })
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  save$ = this.actions$.pipe(
    ofType(TodoActionTypes.UPSERT_ITEM),
    map((action: UpsertItem) => action.payload),
    tap((payload) => {
      console.log('Effect:save$:A', payload);
      this.dataService.save(payload.item, payload.todoListId, payload.userId);
    })
  );
}
