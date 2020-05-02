import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { RootState, selectRouteId } from '@app/root-store/reducers';

import {
  CompletedTask,
  CurrentTask,
  newCurrentTask,
  newTaskListListItem,
  TaskListListItem,
} from '../models';
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

export const selectCompletedTasksQuery = createSelector(
  getTaskState,
  TodoCompletedSelectors.getQuery
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

export const selectCompletedTaskFromRoute: MemoizedSelector<
  RootState,
  CompletedTask | undefined
> = createSelector(selectCompletedTasksEntities, selectRouteId, (tasks, id) => {
  if (id === undefined) {
    return undefined;
  }
  return tasks[id];
});

export const selectCurrentTaskFromRoute: MemoizedSelector<
  RootState,
  CurrentTask | undefined
> = createSelector(selectCurrentTasksEntities, selectRouteId, (tasks, id) => {
  if (id === undefined) {
    return undefined;
  }
  return tasks[id];
});

export const selectTaskListFromRoute: MemoizedSelector<
  RootState,
  TaskListListItem | undefined
> = createSelector(selectEntities, selectRouteId, (taskLists, id) => {
  if (id === undefined) {
    return undefined;
  }
  return taskLists[id];
});
