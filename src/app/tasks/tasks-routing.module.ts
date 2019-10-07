import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CompletedTasksDetailPageComponent,
  CompletedTasksPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
} from './containers';
import { CompletedTaskGuardService } from './services/completed-task-guard.service';
import { CurrentTaskGuardService } from './services/current-task-guard.service';
import { TaskListsGuardService } from './services/task-lists-guard.service';

const routes: Routes = [
  {
    path: 'tasks',
    children: [
      {
        path: 'current',
        children: [
          {
            path: '',
            component: CurrentTasksPageComponent,
          },
          {
            path: 'edit/:id',
            component: CurrentTasksDetailPageComponent,
            canActivate: [CurrentTaskGuardService],
          },
          {
            path: 'new',
            component: CurrentTasksNewItemPageComponent,
          },
        ],
      },
      {
        path: 'completed',
        children: [
          {
            path: '',
            component: CompletedTasksPageComponent,
          },
          {
            path: 'edit/:id',
            component: CompletedTasksDetailPageComponent,
            canActivate: [CompletedTaskGuardService],
          },
        ],
      },
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
            canActivate: [TaskListsGuardService],
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
