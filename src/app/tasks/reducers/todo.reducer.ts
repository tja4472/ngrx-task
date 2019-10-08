import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { TodoActions } from '../actions';
import { CurrentTask } from '../models';

export const todoFeatureKey = 'todo';

export interface State extends EntityState<CurrentTask> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<CurrentTask> = createEntityAdapter<
  CurrentTask
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
});

const currentTaskReducer = createReducer(
  initialState,
  on(TodoActions.databaseListenForDataStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.databaseListenForDataStop, () => ({
    ...initialState,
  })),
  on(TodoActions.loadSuccess, (state, { currentTasks }) =>
    adapter.addAll(currentTasks, { ...state, loaded: true, loading: false })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return currentTaskReducer(state, action);
}
