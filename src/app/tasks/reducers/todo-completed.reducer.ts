import { TaskActions } from '@app/tasks/actions';

import {
  TodoCompletedActions,
  TodoCompletedActionTypes,
} from '../actions/todo-completed.action';
import { TodoCompleted } from '../models';

export const todoCompletedFeatureKey = 'todo-completed';

export interface State {
  selectedId: string;
  loaded: boolean;
  loading: boolean;
  todoCompletedList: TodoCompleted[];
}

const initialState: State = {
  selectedId: null,
  loaded: false,
  loading: false,
  todoCompletedList: [],
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case TodoCompletedActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case TaskActions.completedTaskDetailsPageEnter.type: {
      return { ...state, selectedId: action.id };
    }

    case TodoCompletedActionTypes.LoadSuccess: {
      const items: TodoCompleted[] = action.payload;

      return {
        selectedId: null,
        loaded: true,
        loading: false,
        todoCompletedList: items.map((book) => book),
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
export const getTodoCompletedList = (state: State) => state.todoCompletedList;
