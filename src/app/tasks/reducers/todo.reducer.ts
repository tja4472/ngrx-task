import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { TodoActions } from '../actions';
import { Todo } from '../models';

export const todoFeatureKey = 'todo';

export interface State extends EntityState<Todo> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

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

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// =========
// Selectors
// =========
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
