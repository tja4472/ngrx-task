import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CompletedTasksPageComponent } from './containers/completed-tasks-page/completed-tasks-page.component';
import { CurrentTasksPageComponent } from './containers/current-tasks-page/current-tasks-page.component';
import { TaskEffects } from './effects/task.effects';
import * as fromTask from './reducers/task.reducer';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListsPageComponent } from './containers/task-lists-page/task-lists-page.component';

@NgModule({
  declarations: [
    CurrentTasksPageComponent,
    CompletedTasksPageComponent,
    TaskListsPageComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
})
export class TasksModule {}
