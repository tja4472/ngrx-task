import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoCompleted from '../reducers/todo-completed.reducer';

const getTodoCompletedState = createFeatureSelector<fromTodoCompleted.State>(
  fromTodoCompleted.todoCompletedFeatureKey
);

export const getAllTodoCompleted = createSelector(
  getTodoCompletedState,
  (state) => state.todoCompletedList
);

export const getSelectedId = createSelector(
  getTodoCompletedState,
  (state) => state.selectedId
);

export const getSelectedItem = createSelector(
  getAllTodoCompleted,
  getSelectedId,
  (completedTodos, selectedId) => {
    return completedTodos.filter((todo) => todo.id === selectedId)[0];
  }
);
