import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { TaskListDetailNewPageActions } from '@app/tasks/actions';
import { newTaskListListItem, TaskListListItem } from '@app/tasks/models';

@Component({
  selector: 'app-task-list-detail-new-page',
  templateUrl: './task-list-detail-new-page.component.html',
  styleUrls: ['./task-list-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailNewPageComponent implements OnInit {
  task$ = newTaskListListItem();

  constructor(private store: Store<any>) {}

  ngOnInit() {}

  viewCancelled(todoCompleted: TaskListListItem): void {
    this.store.dispatch(TaskListDetailNewPageActions.cancelled());
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskListDetailNewPageActions.saved({ taskList: todoCompleted })
    );
  }
}
