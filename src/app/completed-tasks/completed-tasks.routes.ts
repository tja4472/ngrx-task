import { Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';
import { CompletedTasksRootGuardService } from '@app/services/completed-tasks-root-guard.service';

import { CompletedTaskDetailEditPageComponentGuard } from './guards/completed-task-detail-edit-page-component.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './containers/completed-tasks-root/completed-tasks-root.component'
      ).then((m) => m.CompletedTasksRootComponent),
    canActivate: [AuthGuardService, CompletedTasksRootGuardService],
    children: [
      {
        path:
          routeNames.completedTasks.edit.path +
          '/:' +
          routeNames.completedTasks.edit.idParam,
        loadComponent: () =>
          import(
            './containers/completed-task-detail-edit-page/completed-task-detail-edit-page.component'
          ).then((m) => m.CompletedTaskDetailEditPageComponent),
        canActivate: [CompletedTaskDetailEditPageComponentGuard],
      },
      {
        path: '',
        loadComponent: () =>
          import(
            './containers/completed-tasks-page/completed-tasks-page.component'
          ).then((m) => m.CompletedTasksPageComponent),
      },
    ],
  },
];
