import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import {
  CompletedTasksRootActions,
  TaskActions,
  TodoCompletedActions,
} from '../actions';
import { CompletedTask } from '../models';

export const todoCompletedFeatureKey = 'todo-completed';

export interface State extends EntityState<CompletedTask> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<CompletedTask> = createEntityAdapter<
  CompletedTask
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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
  on(
    TodoCompletedActions.databaseListenForDataStop,
    CompletedTasksRootActions.destroyed,
    () => ({
      ...initialState,
    })
  ),
  on(TodoCompletedActions.loadSuccess, (state, { completedTasks }) =>
    adapter.addAll(completedTasks, {
      ...state,
      loaded: true,
      loading: false,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return completedTaskReducer(state, action);
}
