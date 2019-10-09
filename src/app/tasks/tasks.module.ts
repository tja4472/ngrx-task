import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material';

import {
  CompletedTaskDetailEditComponent,
  CompletedTaskListComponent,
  CurrentTaskDetailEditComponent,
  CurrentTaskDetailNewComponent,
  CurrentTaskListComponent,
  TaskListDetailEditComponent,
  TaskListDetailNewComponent,
  TaskListListComponent,
} from './components';
import {
  CompletedTasksDetailPageComponent,
  CompletedTasksPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
} from './containers';
import { TaskEffects } from './effects/task.effects';
import { TodoCompletedEffects } from './effects/todo-completed.effect';
import { TodoListsEffects } from './effects/todo-lists.effect';
import { TodoEffects } from './effects/todo.effect';
import * as fromTask from './reducers';
import { TasksRoutingModule } from './tasks-routing.module';

export const COMPONENTS = [
  CompletedTaskDetailEditComponent,
  CompletedTaskListComponent,
  CurrentTaskListComponent,
  CurrentTaskDetailNewComponent,
  CurrentTaskDetailEditComponent,
  TaskListDetailEditComponent,
  TaskListDetailNewComponent,
  TaskListListComponent,
];

export const CONTAINERS = [
  CompletedTasksDetailPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  CompletedTasksPageComponent,
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
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
