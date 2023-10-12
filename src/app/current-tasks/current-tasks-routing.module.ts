/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CurrentTasksRootGuardService } from '@app/services/current-tasks-root-guard.service';

import { CurrentTaskDetailEditPageComponent } from './containers/current-task-detail-edit-page/current-task-detail-edit-page.component';
import { CurrentTasksPageComponent } from './containers/current-tasks-page/current-tasks-page.component';
import { CurrentTaskDetailNewPageComponent } from './containers/current-task-detail-new-page/current-task-detail-new-page.component';
import { CurrentTasksRootComponent } from './containers/current-tasks-root/current-tasks-root.component';

import { CurrentTaskDetailEditPageComponentGuard } from './guards/current-task-detail-edit-page-component.guard';

const routes: Routes = [
  {
    path: '',
    component: CurrentTasksRootComponent,
    canActivate: [AuthGuardService, CurrentTasksRootGuardService],
    children: [
      {
        path:
          routeNames.currentTasks.edit.path +
          '/:' +
          routeNames.currentTasks.edit.idParam,
        component: CurrentTaskDetailEditPageComponent,
        canActivate: [CurrentTaskDetailEditPageComponentGuard],
      },
      {
        path: routeNames.currentTasks.new.path,
        component: CurrentTaskDetailNewPageComponent,
      },
      {
        path: '',
        component: CurrentTasksPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTasksRoutingModule {}
