// tslint:disable:max-classes-per-file
// tslint:disable:no-empty
import { Action } from '@ngrx/store';

import { TodoListsItem } from '../models';

export enum TodoListsActionTypes {
  ListenForData = '[TodoListsActions] Listen For Data',
  LoadSuccess = '[TodoListsActions] Load Success',
  Remove = '[TodoListsActions] Remove',
  Save = '[TodoListsActions] Save',
  SetSelectedList = '[TodoListsActions] Set Selected List',
  UnlistenForData = '[TodoListsActions] Unlisten For Data',
}

export class ListenForData implements Action {
  readonly type = TodoListsActionTypes.ListenForData;

  constructor(
    public payload: {
      userId: string;
    }
  ) {}
}

export class LoadSuccess implements Action {
  readonly type = TodoListsActionTypes.LoadSuccess;

  constructor(
    public payload: {
      items: TodoListsItem[];
      userId: string;
    }
  ) {}
}

export class Remove implements Action {
  readonly type = TodoListsActionTypes.Remove;

  constructor(public payload: string) {} // itemKey
}

export class Save implements Action {
  readonly type = TodoListsActionTypes.Save;

  constructor(public payload: TodoListsItem) {}
}

export class SetSelectedList implements Action {
  readonly type = TodoListsActionTypes.SetSelectedList;

  constructor(public listId: string) {}
}

export class UnlistenForData implements Action {
  readonly type = TodoListsActionTypes.UnlistenForData;

  constructor() {}
}

export type TodoListsActions =
  | ListenForData
  | LoadSuccess
  | Remove
  | Save
  | SetSelectedList
  | UnlistenForData;
