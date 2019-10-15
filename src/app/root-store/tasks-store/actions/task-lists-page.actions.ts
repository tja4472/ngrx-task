import { createAction, props } from '@ngrx/store';

import { TaskListListItem } from '@app/root-store/tasks-store/models';

const title = 'Task Lists Page';

//
export const enter = createAction(`[${title}]  Enter`);

export const newTaskList = createAction(`[${title}]  New Task List`);
