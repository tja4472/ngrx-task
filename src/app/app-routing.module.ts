import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/containers';

const routes: Routes = [
  {
    path: 'tasks/completed',
    loadChildren: () =>
      import('./completed-tasks').then((mod) => mod.CompletedTasksModule),
  },
  {
    path: 'tasks/current',
    loadChildren: () =>
      import('./current-tasks').then((mod) => mod.CurrentTasksModule),
  },
  {
    path: 'tasks/lists',
    loadChildren: () =>
      import('./task-lists').then((mod) => mod.TaskListsModule),
  },
  /*  
  {
    path: 'tasks',
    loadChildren: () => import('./tasks').then((mod) => mod.TasksModule),
  },
*/

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
