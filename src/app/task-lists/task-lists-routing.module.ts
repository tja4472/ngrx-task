/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';

import { TaskListDetailEditPageComponent } from './containers/task-list-detail-edit-page/task-list-detail-edit-page.component';
import { TaskListDetailNewPageComponent } from './containers/task-list-detail-new-page/task-list-detail-new-page.component';
import { TaskListsPageComponent } from './containers/task-lists-page/task-lists-page.component';
import { TaskListsRootComponent } from './containers/task-lists-root/task-lists-root.component';

import { TaskListDetailEditPageComponentGuard } from './guards/task-list-detail-edit-page-component.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskListsRootComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path:
          routeNames.taskLists.edit.path +
          '/:' +
          routeNames.taskLists.edit.idParam,
        component: TaskListDetailEditPageComponent,
        canActivate: [TaskListDetailEditPageComponentGuard],
      },
      {
        path: routeNames.taskLists.new.path,
        component: TaskListDetailNewPageComponent,
      },
      {
        path: '',
        component: TaskListsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskListsRoutingModule {}
