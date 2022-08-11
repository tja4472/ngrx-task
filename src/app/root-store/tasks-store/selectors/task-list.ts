import { createFeatureSelector, createSelector } from '@ngrx/store';

import { taskFeatureKey, TaskState } from '../reducers';
import { TaskListSelectors } from '../task-list-store';

const selectTaskState = createFeatureSelector<TaskState>(taskFeatureKey);

export const selectAll = createSelector(
  selectTaskState,
  TaskListSelectors.selectAllTodoLists
);

export const selectEntities = createSelector(
  selectTaskState,
  TaskListSelectors.selectEntitiesA
);

export const selectLoaded = createSelector(
  selectTaskState,
  TaskListSelectors.selectLoaded
);
