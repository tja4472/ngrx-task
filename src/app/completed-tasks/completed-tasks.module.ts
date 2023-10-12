/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { CompletedTasksRoutingModule } from './completed-tasks-routing.module';

import { CompletedTaskDetailEditComponent } from './components/completed-task-detail-edit/completed-task-detail-edit.component';
import { CompletedTaskListComponent } from './components/completed-task-list/completed-task-list.component';
import { SearchComponent } from './components/search/search.component';

import { CompletedTaskDetailEditPageComponent } from './containers/completed-task-detail-edit-page/completed-task-detail-edit-page.component';
import { CompletedTasksPageComponent } from './containers/completed-tasks-page/completed-tasks-page.component';
import { CompletedTasksRootComponent } from './containers/completed-tasks-root/completed-tasks-root.component';

export const COMPONENTS = [
  CompletedTaskDetailEditComponent,
  CompletedTaskListComponent,
  SearchComponent,
];

export const CONTAINERS = [
  CompletedTaskDetailEditPageComponent,
  CompletedTasksPageComponent,
  CompletedTasksRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CompletedTasksRoutingModule,
  ],
})
export class CompletedTasksModule {}
