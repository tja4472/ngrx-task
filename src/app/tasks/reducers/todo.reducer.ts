import { createReducer, on } from '@ngrx/store';

import { TaskActions, TodoActions } from '../actions';
import { Todo } from '../models';

export const todoFeatureKey = 'todo';

export interface State {
  selectedId: string;
  loaded: boolean;
  loading: boolean;
  todos: Todo[];
}

const initialState: State = {
  selectedId: null,
  loaded: false,
  loading: false,
  todos: [],
};

export const reducer = createReducer(
  initialState,
  on(TodoActions.databaseListenForDataStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.databaseListenForDataStop, () => ({
    ...initialState,
  })),
  on(TodoActions.loadSuccess, (state, { currentTasks }) => ({
    // selectedId: null,
    ...state,
    loaded: true,
    loading: false,
    todos: currentTasks,
  }))
);

/*
export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case TodoActions.databaseListenForDataStart.type: {
      return {
        ...state,
        loading: true,
      };
    }

    case TaskActions.currentTaskDetailsPageEnter.type: {
      return { ...state, selectedId: action.id };
    }

    case TodoActions.databaseListenForDataStop.type: {
      return {
        ...initialState,
      };
    }

    case TodoActions.loadSuccess.type: {
      const items: Todo[] = action.payload;

      return {
        selectedId: null,
        loaded: true,
        loading: false,
        todos: items.map((book) => book),
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
export const getTodos = (state: State) => state.todos;
