import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import {
  CompletedTasksPageActions,
  CompletedTasksRootActions,
  TodoCompletedActions,
} from '../actions';
import { CompletedTask } from '../models';

export const todoCompletedFeatureKey = 'todo-completed';

export interface State extends EntityState<CompletedTask> {
  loaded: boolean;
  loading: boolean;
  query: string;
}

export const adapter: EntityAdapter<CompletedTask> = createEntityAdapter<
  CompletedTask
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  query: '',
});

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
const completedTaskReducer = createReducer(
  initialState,
  on(CompletedTasksPageActions.search, (state, { query }) => {
    const lowerCaseQuery = query.toLowerCase();
    const values: State = { ...state, query: lowerCaseQuery };
    return values;
  }),
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
