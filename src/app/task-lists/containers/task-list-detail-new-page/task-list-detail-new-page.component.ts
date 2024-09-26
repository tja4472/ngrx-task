/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as TaskListDetailNewPageActions from '@app/root-store/tasks-store/actions/task-list-detail-new-page.actions';

import {
  newTaskListListItem,
  TaskListListItem,
} from '@app/models/task-list-list-item.model';
import { TaskListDetailNewComponent } from '../../components/task-list-detail-new/task-list-detail-new.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-list-detail-new-page',
  templateUrl: './task-list-detail-new-page.component.html',
  styleUrls: ['./task-list-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TaskListDetailNewComponent, JsonPipe],
})
export class TaskListDetailNewPageComponent {
  task$ = newTaskListListItem();

  constructor(private readonly store: Store) {}

  viewCancelled(todoCompleted: TaskListListItem): void {
    this.store.dispatch(TaskListDetailNewPageActions.cancelled());
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskListDetailNewPageActions.saved({ taskList: todoCompleted })
    );
  }
}
