/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { CurrentTaskDetailEditComponent } from './components/current-task-detail-edit/current-task-detail-edit.component';
import { CurrentTaskDetailNewComponent } from './components/current-task-detail-new/current-task-detail-new.component';
import { CurrentTaskListComponent } from './components/current-task-list/current-task-list.component';

import { CurrentTaskDetailEditPageComponent } from './containers/current-task-detail-edit-page/current-task-detail-edit-page.component';
import { CurrentTasksPageComponent } from './containers/current-tasks-page/current-tasks-page.component';
import { CurrentTaskDetailNewPageComponent } from './containers/current-task-detail-new-page/current-task-detail-new-page.component';
import { CurrentTasksRootComponent } from './containers/current-tasks-root/current-tasks-root.component';

import { CurrentTasksRoutingModule } from './current-tasks-routing.module';

export const COMPONENTS = [
  CurrentTaskDetailEditComponent,
  CurrentTaskDetailNewComponent,
  CurrentTaskListComponent,
];

export const CONTAINERS = [
  CurrentTaskDetailEditPageComponent,
  CurrentTaskDetailNewPageComponent,
  CurrentTasksPageComponent,
  CurrentTasksRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CurrentTasksRoutingModule,
  ],
})
export class CurrentTasksModule {}
