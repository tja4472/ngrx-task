import { createFeatureSelector, createSelector } from '@ngrx/store';

import { newTodo } from '../models';
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

export const getSelectedCompletedTask = createSelector(
  getTaskState,
  TodoCompletedSelectors.getSelectedItem
);

export const getSelectedCurrentTask = createSelector(
  getTaskState,
  TodoSelectors.getSelectedItem
);

export const getSelectedOrNewCurrentTask = createSelector(
  getSelectedCurrentTask,
  (task) => {
    if (!!!task) {
      // task undefined - new item.
      return newTodo();
    }

    return task;
  }
);

export const getAllTaskLists = createSelector(
  getTaskState,
  TodoListsSelectors.getAllTodoLists
);

/*
export const getSelectedListId = createSelector(
  getTaskState,
  TodoListsSelectors.getSelectedListId
);
*/
export const getSelectedTaskList = createSelector(
  getTaskState,
  TodoListsSelectors.getSelectedItem
);
