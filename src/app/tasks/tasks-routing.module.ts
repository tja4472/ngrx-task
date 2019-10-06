import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CompletedTasksDetailPageComponent,
  CompletedTasksPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailPageComponent,
  TaskListsPageComponent,
} from './containers';
import { AaaResolverService } from './services/aaa-resolver.service';
import { CurrentTaskGuardService } from './services/current-task-guard.service';

const routes: Routes = [
  {
    path: 'current',
    component: CurrentTasksPageComponent,
  },
  {
    path: 'current/edit/:id',
    component: CurrentTasksDetailPageComponent,
    canActivate: [CurrentTaskGuardService],
    /*    
    resolve: {
      crisis: AaaResolverService
    }
*/
  },
  {
    path: 'current/new',
    component: CurrentTasksNewItemPageComponent,
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
  /*  
  {
    path: '',
    component: CurrentTasksPageComponent,
  },
*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
