import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '@app/material';

import { TaskEffects } from './effects/task.effects';
import { TodoCompletedEffects } from './effects/todo-completed.effect';
import { TodoListsEffects } from './effects/todo-lists.effect';
import { TodoEffects } from './effects/todo.effect';
import * as fromTask from './reducers';
import { TasksRoutingModule } from './tasks-routing.module';

export const COMPONENTS = [];

export const CONTAINERS = [];

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
