import { Action, createReducer, on } from '@ngrx/store';

import * as TaskActions from '../actions/task.actions';

export const taskFeatureKey = 'task';

export interface State {}

export const initialState: State = {};

const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, (state) => state)
);

export function reducer(state: State | undefined, action: Action) {
  return taskReducer(state, action);
}
