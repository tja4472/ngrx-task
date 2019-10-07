import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { TaskActions, TodoCompletedActions } from '../actions';
import { TodoCompleted } from '../models';

export const todoCompletedFeatureKey = 'todo-completed';

export interface State extends EntityState<TodoCompleted> {
  selectedId: string;
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<TodoCompleted> = createEntityAdapter<
  TodoCompleted
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null,
  loaded: false,
  loading: false,
});

const completedTaskReducer = createReducer(
  initialState,
  on(TaskActions.completedTaskDetailsPageEnter, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(TodoCompletedActions.databaseListenForDataStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoCompletedActions.databaseListenForDataStop, () => ({
    ...initialState,
  })),
  on(TodoCompletedActions.loadSuccess, (state, { completedTasks }) =>
    adapter.addAll(completedTasks, {
      ...state,
      selectedId: null,
      loaded: true,
      loading: false,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return completedTaskReducer(state, action);
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
