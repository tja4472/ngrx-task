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

// #region CompletedTasks
export const selectCompletedTasksAll = createSelector(
  getTaskState,
  TodoCompletedSelectors.getAllTodoCompleted
);

export const selectCompletedTasksEntities = createSelector(
  getTaskState,
  TodoCompletedSelectors.getEntities
);

export const selectCompletedTasksLoaded = createSelector(
  getTaskState,
  TodoCompletedSelectors.getLoaded
);
// #endregion

// #region CurrentTasks
export const selectCurrentTasksAll = createSelector(
  getTaskState,
  TodoSelectors.getAllTodo
);

export const selectCurrentTasksEntities = createSelector(
  getTaskState,
  TodoSelectors.getEntities
);

export const selectCurrentTasksLoaded = createSelector(
  getTaskState,
  TodoSelectors.getLoaded
);
// #endregion

// #region TaskLists
export const selectTaskListsAll = createSelector(
  getTaskState,
  TodoListsSelectors.getAllTodoLists
);

export const selectTaskListsEntities = createSelector(
  getTaskState,
  TodoListsSelectors.getEntities
);

export const selectTaskListsLoaded = createSelector(
  getTaskState,
  TodoListsSelectors.getLoaded
);
// #endregion

export const selectCompletedTaskFromRoute = createSelector(
  selectCompletedTasksEntities,
  selectRouteId,
  (tasks, id) => {
    return tasks[id];
  }
);

export const selectCurrentTaskFromRoute = createSelector(
  selectCurrentTasksEntities,
  selectRouteId,
  (tasks, id) => {
    return tasks[id];
  }
);

export const selectTaskListFromRoute = createSelector(
  selectTaskListsEntities,
  selectRouteId,
  (taskLists, id) => {
    return taskLists[id];
  }
);
