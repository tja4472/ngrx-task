import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { CurrentTasksRootActions, TodoActions } from '../actions';
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

/*
Typescript not enforcing State type.
https://github.com/microsoft/TypeScript/issues/241#issuecomment-540168588
Hence const values: State = { bodge
*/
export const reducer = createReducer(
  initialState,
  on(TodoActions.databaseListenForDataStart, (state) => {
    const values: State = { ...state, loading: true };
    return values;
  }),
  on(
    TodoActions.databaseListenForDataStop,
    CurrentTasksRootActions.destroyed,
    (state) => {
      const values: State = { ...initialState };
      return values;
    }
  ),
  on(TodoActions.loadSuccess, (state, { currentTasks }) => {
    const values: State = { ...state, loaded: true, loading: false };
    return adapter.setAll(currentTasks, values);
  }),
  on(TodoActions.reorderList, (state, { ids }) => {
    const values: State = { ...state, ids };
    return values;
  })
);
