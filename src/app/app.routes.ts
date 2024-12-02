import { Routes } from '@angular/router';

import { pathPrefix, routeNames } from '@app/app-route-names';
import { taskListsCanMatchGuard } from '@app/task-lists/guards/task-lists.guard';

import { authCanMatchGuard } from './auth/services/auth-guard.service';

// TODO: Use functional guards
// TODO:  Replace 'rxjs/operators' with 'rxjs'
export const routes: Routes = [
  {
    path: '',
    redirectTo: pathPrefix + routeNames.home.path,
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then((m) => m.routes),
  },
  {
    path: routeNames.signIn.path,
    loadChildren: () =>
      import('./auth/containers/sign-in-page/sign-in-page.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: routeNames.signInComponentStore.path,
    loadChildren: () =>
      import(
        './auth/containers/sign-in-page-component-store/sign-in-page-component-store.routes'
      ).then((m) => m.routes),
  },
  {
    path: routeNames.signUp.path,
    loadChildren: () =>
      import('./auth/containers/sign-up-page/sign-up-page.routes').then(
        (m) => m.routes
      ),
  },
  {
    path: routeNames.completedTasks.path,
    loadChildren: () =>
      import('./completed-tasks/completed-tasks.routes').then((m) => m.routes),
    canMatch: [authCanMatchGuard],
  },
  {
    path: routeNames.currentTasks.path,
    loadChildren: () =>
      import('./current-tasks/current-tasks.routes').then((m) => m.routes),
    canMatch: [authCanMatchGuard],
  },
  {
    path: routeNames.taskLists.path,
    loadChildren: () =>
      import('./task-lists/task-lists.routes').then((m) => m.routes),
    canMatch: [authCanMatchGuard, taskListsCanMatchGuard],
  },
  {
    path: routeNames.tasks.path,
    redirectTo: pathPrefix + routeNames.currentTasks.path,
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/containers/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
    data: { title: 'Not found' },
  },
];
