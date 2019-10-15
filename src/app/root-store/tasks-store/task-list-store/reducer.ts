import { Action, createReducer, on } from '@ngrx/store';

import { TaskActions, TodoListsActions } from '../actions';

import { featureAdapter, initialState, State } from './state';

export const todoListsFeatureKey = 'todo-lists';

const featureReducer = createReducer(
  initialState,
  on(TaskActions.taskListDetailPageEnter, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(TodoListsActions.listenForData, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoListsActions.unlistenForData, () => ({
    ...initialState,
  })),
  on(TodoListsActions.loadSuccess, (state, { items }) =>
    featureAdapter.addAll(items, {
      ...state,
      loaded: true,
      loading: false,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
