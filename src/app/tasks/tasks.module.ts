import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material';

import { CurrentTaskListComponent } from './components';
import { CurrentTaskDetailComponent } from './components/current-task-detail/current-task-detail.component';
import { CurrentTaskListItemComponent } from './components/current-task-list-item/current-task-list-item.component';
import {
  CompletedTasksPageComponent,
  CurrentTasksPageComponent,
  TaskListsPageComponent,
} from './containers';
import { CurrentTasksDetailPageComponent } from './containers/current-tasks-detail-page/current-tasks-detail-page.component';
import { TaskEffects } from './effects/task.effects';
import { TodoCompletedEffects } from './effects/todo-completed.effect';
import { TodoListsEffects } from './effects/todo-lists.effect';
import { TodoEffects } from './effects/todo.effect';
import * as fromTask from './reducers';
import { TasksRoutingModule } from './tasks-routing.module';

export const COMPONENTS = [
  CurrentTaskListComponent,
  CurrentTaskDetailComponent,
  CurrentTaskListItemComponent,
];

export const CONTAINERS = [
  CurrentTasksDetailPageComponent,
  CurrentTasksPageComponent,
  CompletedTasksPageComponent,
  TaskListsPageComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TasksRoutingModule,
    StoreModule.forFeature(fromTask.taskFeatureKey, fromTask.reducers),
    EffectsModule.forFeature([
      TaskEffects,
      TodoListsEffects,
      TodoEffects,
      TodoCompletedEffects,
    ]),
  ],
})
export class TasksModule {}
