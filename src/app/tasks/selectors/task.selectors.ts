import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTask from '../reducers';

import * as TodoCompletedSelectors from './todo-completed.selectors';
import * as TodoListsSelectors from './todo-lists.selectors';
import * as TodoSelectors from './todo.selectors';

const getTaskState = createFeatureSelector<fromTask.TaskState>(
  fromTask.taskFeatureKey
);

export const getAllCompletedTasks = createSelector(
  getTaskState,
  TodoCompletedSelectors.getAllTodoCompleted
);

/*
export const getAllCurrentTasks = createSelector(
  getTaskState,
  (state) => state.todo.todos
);
*/

export const getAllCurrentTasks = createSelector(
  getTaskState,
  TodoSelectors.getAllTodo
);

export const getSelectedCurrentTask = createSelector(
  getTaskState,
  TodoSelectors.getSelectedItem
);

export const getAllTaskLists = createSelector(
  getTaskState,
  TodoListsSelectors.getAllTodoLists
);
