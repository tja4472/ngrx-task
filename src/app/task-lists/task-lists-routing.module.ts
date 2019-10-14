import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@app/auth/services/auth-guard.service';

import {
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
} from './containers';

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
