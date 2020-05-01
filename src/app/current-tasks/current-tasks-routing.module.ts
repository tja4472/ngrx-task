import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CurrentTasksRootGuardService } from '@app/services/current-tasks-root-guard.service';

import {
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  CurrentTasksRootComponent,
} from './containers';
import { CurrentTaskDetailEditPageComponentGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: CurrentTasksRootComponent,
    canActivate: [AuthGuardService, CurrentTasksRootGuardService],
    children: [
      {
        path: '',
        component: CurrentTasksPageComponent,
      },
      {
        path: 'edit/:id',
        component: CurrentTaskDetailEditPageComponent,
        canActivate: [CurrentTaskDetailEditPageComponentGuard],
      },
      {
        path: 'new',
        component: CurrentTaskDetailNewPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTasksRoutingModule {}
