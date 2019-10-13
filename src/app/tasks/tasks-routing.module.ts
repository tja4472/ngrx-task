import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
} from './containers';
import { CurrentTaskGuardService } from './services/current-task-guard.service';
import { TaskListGuardService } from './services/task-list-guard.service';

const routes: Routes = [
  {
    path: 'tasks',

    children: [
      /*      
      {
        path: 'current',
        children: [
          {
            path: '',
            component: CurrentTasksPageComponent,
          },
          {
            path: 'edit/:id',
            component: CurrentTaskDetailEditPageComponent,
            canActivate: [CurrentTaskGuardService],
          },
          {
            path: 'new',
            component: CurrentTaskDetailNewPageComponent,
          },
        ],
      },
*/

      {
        path: 'lists',
        children: [
          {
            path: '',
            component: TaskListsPageComponent,
          },
          {
            path: 'edit/:id',
            component: TaskListDetailEditPageComponent,
            canActivate: [TaskListGuardService],
          },
          {
            path: 'new',
            component: TaskListDetailNewPageComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
