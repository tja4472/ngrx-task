import { Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CurrentTasksRootGuardService } from '@app/services/current-tasks-root-guard.service';

import { CurrentTaskDetailEditPageComponentGuard } from './guards/current-task-detail-edit-page-component.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './containers/current-tasks-root/current-tasks-root.component'
      ).then((m) => m.CurrentTasksRootComponent),
    canActivate: [AuthGuardService, CurrentTasksRootGuardService],
    children: [
      {
        path:
          routeNames.currentTasks.edit.path +
          '/:' +
          routeNames.currentTasks.edit.idParam,
        loadComponent: () =>
          import(
            './containers/current-task-detail-edit-page/current-task-detail-edit-page.component'
          ).then((m) => m.CurrentTaskDetailEditPageComponent),
        canActivate: [CurrentTaskDetailEditPageComponentGuard],
      },
      {
        path: routeNames.currentTasks.new.path,
        loadComponent: () =>
          import(
            './containers/current-task-detail-new-page/current-task-detail-new-page.component'
          ).then((m) => m.CurrentTaskDetailNewPageComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import(
            './containers/current-tasks-page/current-tasks-page.component'
          ).then((m) => m.CurrentTasksPageComponent),
      },
    ],
  },
];
