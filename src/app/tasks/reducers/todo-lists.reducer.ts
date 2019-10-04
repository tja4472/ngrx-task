import { createReducer, on } from '@ngrx/store';

import { TaskActions, TodoListsActions } from '../actions';
import { TodoListsItem } from '../models';

export const todoListsFeatureKey = 'todo-lists';

export interface State {
  selectedId: string;
  loaded: boolean;
  loading: boolean;
  selectedListId: string | null;
  todoLists: TodoListsItem[];
}

const initialState: State = {
  selectedId: null,
  loaded: false,
  loading: false,
  selectedListId: null,
  todoLists: [],
};

export const reducer = createReducer(
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
  on(TodoListsActions.loadSuccess, (_, { items }) => ({
    selectedId: null,
    loaded: true,
    loading: false,
    selectedListId: 'ZZZdefault-list',
    todoLists: items,
  }))
);

/*
export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case TodoListsActionTypes.ListenForData: {
      return {
        ...state,
        loading: true,
      };
    }

    case TaskActions.taskListDetailPageEnter.type: {
      return { ...state, selectedId: action.id };
    }

    case TodoListsActionTypes.LoadSuccess: {
      const items: TodoListsItem[] = action.payload.items;

      return {
        selectedId: null,
        loaded: true,
        loading: false,
        selectedListId: 'ZZZdefault-list',
        todoLists: items.map((book) => book),
      };
    }

    case TodoListsActionTypes.SetSelectedList: {
      return {
        ...state,
        selectedListId: action.listId,
      };
    }

    default: {
      return state;
    }
  }
}
*/

// =========
// Selectors
// =========
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTodoLists = (state: State) => state.todoLists;
export const getSelectedListId = (state: State) => state.selectedListId;
