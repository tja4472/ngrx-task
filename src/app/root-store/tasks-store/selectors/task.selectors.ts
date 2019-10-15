import { createFeatureSelector, createSelector } from '@ngrx/store';

import { selectRouteId } from '@app/root-store/reducers';

import { newCurrentTask, newTaskListListItem } from '../models';
import * as fromTask from '../reducers';
// import * as TodoListsSelectors from '../task-list-store/selectors';
import { TaskListSelectors } from '../task-list-store';

import { selectEntities } from './task-list';
import * as TodoCompletedSelectors from './todo-completed.selectors';
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
  selectEntities,
  selectRouteId,
  (taskLists, id) => {
    return taskLists[id];
  }
);
