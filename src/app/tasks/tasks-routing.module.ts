import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CompletedTasksPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksPageComponent,
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
    path: 'lists',
    component: TaskListsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
