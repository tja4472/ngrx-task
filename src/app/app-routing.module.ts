import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListsGuard } from '@app/task-lists/guards/task-lists.guard';

import { AuthGuardService } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers';

const routes: Routes = [
  {
    path: 'tasks/completed',
    loadChildren: () =>
      import('./completed-tasks').then((m) => m.CompletedTasksModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'tasks/current',
    loadChildren: () =>
      import('./current-tasks').then((m) => m.CurrentTasksModule),
    canLoad: [AuthGuardService],
  },
  {
    path: 'tasks/lists',
    loadChildren: () => import('./task-lists').then((m) => m.TaskListsModule),
    canLoad: [AuthGuardService, TaskListsGuard],
  },

  { path: 'tasks', redirectTo: '/tasks/current', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
