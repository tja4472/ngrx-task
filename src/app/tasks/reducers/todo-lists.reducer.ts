import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { TaskActions, TodoListsActions } from '../actions';
import { TodoListsItem } from '../models';

export const todoListsFeatureKey = 'todo-lists';

export interface State extends EntityState<TodoListsItem> {
  loaded: boolean;
  loading: boolean;
  selectedId: string;
  selectedListId: string | null;
}

export const adapter: EntityAdapter<TodoListsItem> = createEntityAdapter<
  TodoListsItem
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
  selectedId: null,
  selectedListId: null,
});

const TaskListsReducer = createReducer(
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
    adapter.addAll(items, {
      ...state,
      loaded: true,
      loading: false,
      selectedId: null,
      selectedListId: 'ZZZdefault-list',
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return TaskListsReducer(state, action);
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
export const getSelectedListId = (state: State) => state.selectedListId;
