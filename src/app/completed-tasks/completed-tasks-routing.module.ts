import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CompletedTasksRootGuardService } from '@app/services/completed-tasks-root-guard.service';

import {
  CompletedTaskDetailEditPageComponent,
  CompletedTasksPageComponent,
  CompletedTasksRootComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: CompletedTasksRootComponent,
    canActivate: [AuthGuardService, CompletedTasksRootGuardService],
    children: [
      {
        path: '',
        component: CompletedTasksPageComponent,
      },
      {
        path: 'edit/:id',
        component: CompletedTaskDetailEditPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedTasksRoutingModule {}
