import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@app/auth/services/auth-guard.service';

import {
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
} from './containers';
import { TaskListDetailEditPageComponentGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: TaskListsRootComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: TaskListsPageComponent,
      },
      {
        path: 'edit/:id',
        component: TaskListDetailEditPageComponent,
        canActivate: [TaskListDetailEditPageComponentGuard],
      },
      {
        path: 'new',
        component: TaskListDetailNewPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListsRoutingModule {}
