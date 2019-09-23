// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { ReorderArrayIndexes, Todo } from '../models';

export enum TodoActionTypes {
  ClearCompleted = '[Todo] Clear Completed',
  DATABASE_LISTEN_FOR_DATA_START = '[Todo] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Todo] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[Todo] Delete Item',
  LoadSuccess = '[Todo] Load Success',
  ReorderList = '[Todo] Reorder List',

  ReorderListA = '[Todo] Reorder ListA',
  UPSERT_ITEM = '[Todo] Upsert item',
}

export class ClearCompleted implements Action {
  readonly type = TodoActionTypes.ClearCompleted;

  constructor(
    public payload: {
      todoListId: string;
      userId: string;
    }
  ) {}
}

export class DatabaseListenForDataStart implements Action {
  readonly type = TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      todoListId: string;
      userId: string;
    }
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  readonly type = TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;

  constructor() {}
}

export class DeleteItem implements Action {
  readonly type = TodoActionTypes.DELETE_ITEM;

  constructor(
    public payload: {
      itemId: string;
      todoListId: string;
      userId: string;
    }
  ) {}
}

export class LoadSuccess implements Action {
  readonly type = TodoActionTypes.LoadSuccess;

  constructor(public payload: Todo[]) {}
}

export class ReorderList implements Action {
  readonly type = TodoActionTypes.ReorderList;

  constructor(
    public payload: {
      indexes: ReorderArrayIndexes;
      todoListId: string;
      userId: string;
    }
  ) {}
}

export class ReorderListA implements Action {
  readonly type = TodoActionTypes.ReorderListA;

  constructor(
    public payload: {
      ids: string[];
    }
  ) {}
}

export class UpsertItem implements Action {
  readonly type = TodoActionTypes.UPSERT_ITEM;

  constructor(
    public payload: {
      item: Todo;
      todoListId: string;
      userId: string;
    }
  ) {}
}

export type TodoActions =
  | ClearCompleted
  | DatabaseListenForDataStart
  | DatabaseListenForDataStop
  | DeleteItem
  | LoadSuccess
  | ReorderList
  | ReorderListA
  | UpsertItem;
