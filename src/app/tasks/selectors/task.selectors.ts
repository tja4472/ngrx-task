import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteId } from '@app/reducers';

import { newTodo, newTodoListsItem } from '../models';
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

export const getCurrentTasksLoaded = createSelector(
  getTaskState,
  TodoSelectors.getLoaded
);

export const getCompletedTasksLoaded = createSelector(
  getTaskState,
  TodoCompletedSelectors.getLoaded
);

export const getTaskListsLoaded = createSelector(
  getTaskState,
  TodoListsSelectors.getLoaded
);

export const getCurrentTasksEntities = createSelector(
  getTaskState,
  TodoSelectors.getEntities
);

export const getCompletedTasksEntities = createSelector(
  getTaskState,
  TodoCompletedSelectors.getEntities
);

export const getTaskListsEntities = createSelector(
  getTaskState,
  TodoListsSelectors.getEntities
);

export const selectCurrentTaskFromRoute = createSelector(
  getCurrentTasksEntities,
  selectRouteId,
  (tasks, id) => {
    return tasks[id];
  }
);

export const selectCompletedTaskFromRoute = createSelector(
  getCompletedTasksEntities,
  selectRouteId,
  (tasks, id) => {
    return tasks[id];
  }
);

export const selectTaskListFromRoute = createSelector(
  getTaskListsEntities,
  selectRouteId,
  (taskLists, id) => {
    return taskLists[id];
  }
);

export const getAllTaskLists = createSelector(
  getTaskState,
  TodoListsSelectors.getAllTodoLists
);

export const getSelectedTaskList = createSelector(
  getTaskState,
  TodoListsSelectors.getSelectedItem
);

export const getSelectedOrNewTaskList = createSelector(
  getSelectedTaskList,
  (task) => {
    if (!!!task) {
      // task undefined - new item.
      return newTodoListsItem();
    }

    return task;
  }
);
