import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompletedTasksRootComponent } from './completed-tasks/containers';
import { NotFoundPageComponent } from './core/containers';

const routes: Routes = [
  {
    path: 'tasks/completed',
    component: CompletedTasksRootComponent,
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks').then((mod) => mod.TasksModule),
  },
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
