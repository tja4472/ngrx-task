import { Routes } from '@angular/router';

import { routeNames } from '@app/app-route-names';
import { AuthGuardService } from '@app/auth/services/auth-guard.service';

import { TaskListDetailEditPageComponentGuard } from './guards/task-list-detail-edit-page-component.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/task-lists-root/task-lists-root.component').then(
        (m) => m.TaskListsRootComponent
      ),
    canActivate: [AuthGuardService],
    children: [
      {
        path:
          routeNames.taskLists.edit.path +
          '/:' +
          routeNames.taskLists.edit.idParam,
        loadComponent: () =>
          import(
            './containers/task-list-detail-edit-page/task-list-detail-edit-page.component'
          ).then((m) => m.TaskListDetailEditPageComponent),
        canActivate: [TaskListDetailEditPageComponentGuard],
      },
      {
        path: routeNames.taskLists.new.path,
        loadComponent: () =>
          import(
            './containers/task-list-detail-new-page/task-list-detail-new-page.component'
          ).then((m) => m.TaskListDetailNewPageComponent),
      },
      {
        path: '',
        loadComponent: () =>
          import('./containers/task-lists-page/task-lists-page.component').then(
            (m) => m.TaskListsPageComponent
          ),
      },
    ],
  },
];
