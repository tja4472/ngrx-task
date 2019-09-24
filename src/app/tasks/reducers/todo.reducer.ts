import { TaskActions } from '@app/tasks/actions';

import { TodoActions, TodoActionTypes } from '../actions/todo.action';
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

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case TodoActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case TaskActions.currentTaskDetailsPageEnter.type: {
      console.log('aaaaaaaaaaaaa:', action.id);
      return { ...state, selectedId: action.id };
    }

    case TodoActionTypes.DATABASE_LISTEN_FOR_DATA_STOP: {
      return {
        ...initialState,
      };
    }

    case TodoActionTypes.LoadSuccess: {
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

// =========
// Selectors
// =========
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getTodos = (state: State) => state.todos;
