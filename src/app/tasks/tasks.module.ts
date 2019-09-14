import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CompletedTasksPageComponent } from './containers/completed-tasks-page/completed-tasks-page.component';
import { CurrentTasksPageComponent } from './containers/current-tasks-page/current-tasks-page.component';
import { TaskListsPageComponent } from './containers/task-lists-page/task-lists-page.component';
import { TaskEffects } from './effects/task.effects';
import { TodoCompletedEffects } from './effects/todo-completed.effect';
import { TodoListsEffects } from './effects/todo-lists.effect';
import { TodoEffects } from './effects/todo.effect';
import * as fromTask from './reducers';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    CurrentTasksPageComponent,
    CompletedTasksPageComponent,
    TaskListsPageComponent,
  ],
  imports: [
    CommonModule,
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
