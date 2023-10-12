/* eslint-disable @typescript-eslint/no-extraneous-class */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material/material.module';

import { TaskListDetailEditComponent } from './components/task-list-detail-edit/task-list-detail-edit.component';
import { TaskListDetailNewComponent } from './components/task-list-detail-new/task-list-detail-new.component';
import { TaskListListComponent } from './components/task-list-list/task-list-list.component';

import { TaskListDetailEditPageComponent } from './containers/task-list-detail-edit-page/task-list-detail-edit-page.component';
import { TaskListDetailNewPageComponent } from './containers/task-list-detail-new-page/task-list-detail-new-page.component';
import { TaskListsPageComponent } from './containers/task-lists-page/task-lists-page.component';
import { TaskListsRootComponent } from './containers/task-lists-root/task-lists-root.component';

import { TaskListsRoutingModule } from './task-lists-routing.module';

export const COMPONENTS = [
  TaskListDetailEditComponent,
  TaskListDetailNewComponent,
  TaskListListComponent,
];

export const CONTAINERS = [
  TaskListDetailEditPageComponent,
  TaskListDetailNewPageComponent,
  TaskListsPageComponent,
  TaskListsRootComponent,
];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    TaskListsRoutingModule,
  ],
})
export class TaskListsModule {}
