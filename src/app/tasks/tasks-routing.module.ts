import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CompletedTasksPageComponent,
  CurrentTasksPageComponent,
  TaskListsPageComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'completed',
    component: CompletedTasksPageComponent,
  },
  {
    path: 'lists',
    component: TaskListsPageComponent,
  },
  {
    path: '',
    component: CurrentTasksPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
