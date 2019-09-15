import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTodoCompleted from '../reducers/todo-completed.reducer';

const getTodoCompletedState = createFeatureSelector<fromTodoCompleted.State>(
  fromTodoCompleted.todoCompletedFeatureKey
);

export const getAllTodoCompleted = createSelector(
  getTodoCompletedState,
  (state) => state.todoCompletedList
);
