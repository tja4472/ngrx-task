import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material';

import {
  CompletedTaskDetailComponent,
  CompletedTaskListComponent,
  CurrentTaskListComponent,
  CurrentTaskNewItemComponent,
  TaskListDetailEditComponent,
  TaskListListComponent,
} from './components';
import { CurrentTaskDetailComponent } from './components/current-task-detail/current-task-detail.component';
import { CurrentTaskListItemComponent } from './components/current-task-list-item/current-task-list-item.component';
import {
  CompletedTasksDetailPageComponent,
  CompletedTasksPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  TaskListDetailEditPageComponent,
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
  CompletedTaskDetailComponent,
  CompletedTaskListComponent,
  CurrentTaskListComponent,
  CurrentTaskNewItemComponent,
  CurrentTaskDetailComponent,
  CurrentTaskListItemComponent,
  TaskListDetailEditComponent,
  TaskListListComponent,
];

export const CONTAINERS = [
  CompletedTasksDetailPageComponent,
  CurrentTasksDetailPageComponent,
  CurrentTasksNewItemPageComponent,
  CurrentTasksPageComponent,
  CompletedTasksPageComponent,
  TaskListDetailEditPageComponent,
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
