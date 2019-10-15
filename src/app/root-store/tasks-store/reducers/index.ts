import { Action, combineReducers, createReducer, on } from '@ngrx/store';

import * as fromRoot from '@app/root-store/reducers';

import * as fromTodoCompleted from './todo-completed.reducer';
import * as fromTodoLists from './todo-lists.reducer';
import * as fromTodo from './todo.reducer';

export const taskFeatureKey = 'task';

export interface TaskState {
  [fromTodo.todoFeatureKey]: fromTodo.State;
  [fromTodoCompleted.todoCompletedFeatureKey]: fromTodoCompleted.State;
  [fromTodoLists.todoListsFeatureKey]: fromTodoLists.State;
}

// export const initialState: TaskState = {};

export interface State extends fromRoot.State {
  [taskFeatureKey]: TaskState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: TaskState | undefined, action: Action) {
  return combineReducers({
    [fromTodo.todoFeatureKey]: fromTodo.reducer,
    [fromTodoCompleted.todoCompletedFeatureKey]: fromTodoCompleted.reducer,
    [fromTodoLists.todoListsFeatureKey]: fromTodoLists.reducer,
  })(state, action);
}
