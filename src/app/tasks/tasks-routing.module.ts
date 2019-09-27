import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CompletedTasksDetailPageComponent,
  CompletedTasksPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailPageComponent,
  TaskListsPageComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: CurrentTasksPageComponent,
  },
  {
    path: 'edit/:id',
    component: CurrentTasksDetailPageComponent,
  },
  {
    path: 'completed',
    component: CompletedTasksPageComponent,
  },
  {
    path: 'completed/edit/:id',
    component: CompletedTasksDetailPageComponent,
  },
  {
    path: 'lists',
    component: TaskListsPageComponent,
  },
  {
    path: 'lists/edit/:id',
    component: TaskListDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
