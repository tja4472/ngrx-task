import { createFeatureSelector, createSelector } from '@ngrx/store';

import { routeNames } from '@app/app-route-names';
import { selectRouteParam } from '@app/root-store/reducers';

import * as fromTask from '../reducers';
// import * as TodoListsSelectors from '../task-list-store/selectors';

import { selectEntities } from './task-list';
import * as TodoCompletedSelectors from './todo-completed.selectors';
import * as TodoSelectors from './todo.selectors';

const selectTaskState = createFeatureSelector<fromTask.TaskState>(
  fromTask.taskFeatureKey
);

// #region CompletedTasks
export const selectCompletedTasksAll = createSelector(
  selectTaskState,
  TodoCompletedSelectors.selectAllTodoCompleted
);

export const selectCompletedTasksEntities = createSelector(
  selectTaskState,
  TodoCompletedSelectors.selectEntitiesA
);

export const selectCompletedTasksLoaded = createSelector(
  selectTaskState,
  TodoCompletedSelectors.selectLoaded
);

export const selectCompletedTasksQuery = createSelector(
  selectTaskState,
  TodoCompletedSelectors.selectQuery
);
// #endregion

export const selectCompletedTasksQueried = createSelector(
  selectCompletedTasksAll,
  selectCompletedTasksQuery,
  (tasks, query) => {
    if (query === '') {
      return tasks;
    }

    const result = tasks.filter((task) => {
      if (task.description === null) {
        return task.name.toLowerCase().includes(query);
      } else {
        return (
          task.name.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        );
      }
    });

    return result;
  }
);

// #region CurrentTasks
export const selectCurrentTasksAll = createSelector(
  selectTaskState,
  TodoSelectors.selectAllTodo
);

export const selectCurrentTasksEntities = createSelector(
  selectTaskState,
  TodoSelectors.selectEntitiesA
);

export const selectCurrentTasksLoaded = createSelector(
  selectTaskState,
  TodoSelectors.selectLoaded
);
// #endregion

export const selectCompletedTaskFromRoute = createSelector(
  selectCompletedTasksEntities,
  selectRouteParam(routeNames.completedTasks.edit.idParam),
  (tasks, id) => {
    if (id === undefined) {
      return undefined;
    }
    return tasks[id];
  }
);

export const selectCurrentTaskFromRoute = createSelector(
  selectCurrentTasksEntities,
  selectRouteParam(routeNames.currentTasks.edit.idParam),
  (tasks, id) => {
    if (id === undefined) {
      return undefined;
    }
    return tasks[id];
  }
);

export const selectTaskListFromRoute = createSelector(
  selectEntities,
  selectRouteParam(routeNames.taskLists.edit.idParam),
  (taskLists, id) => {
    if (id === undefined) {
      return undefined;
    }
    return taskLists[id];
  }
);
