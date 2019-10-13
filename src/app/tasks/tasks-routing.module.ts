import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
} from './containers';
import { TaskListGuardService } from './services/task-list-guard.service';

const routes: Routes = [
  {
    path: 'tasks',

    children: [
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
