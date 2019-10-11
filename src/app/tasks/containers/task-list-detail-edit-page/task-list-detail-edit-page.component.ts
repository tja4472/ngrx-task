import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskListDetailEditPageActions } from '@app/tasks/actions';
import { TaskListListItem } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-task-list-detail-edit-page',
  templateUrl: './task-list-detail-edit-page.component.html',
  styleUrls: ['./task-list-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailEditPageComponent implements OnInit {
  task$: Observable<TaskListListItem>;

  constructor(private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.selectTaskListFromRoute));
  }

  ngOnInit() {}

  viewCancelled(taskList: TaskListListItem): void {
    this.store.dispatch(TaskListDetailEditPageActions.cancelled({ taskList }));
  }

  viewRemoved(taskList: TaskListListItem): void {
    this.store.dispatch(TaskListDetailEditPageActions.removed({ taskList }));
  }

  viewSaved(taskList: TaskListListItem) {
    this.store.dispatch(TaskListDetailEditPageActions.saved({ taskList }));
  }
}
