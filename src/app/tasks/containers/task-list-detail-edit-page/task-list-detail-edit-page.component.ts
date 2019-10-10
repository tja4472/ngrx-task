import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.selectTaskListFromRoute));
  }

  ngOnInit() {}

  private goBack(taskId: string): void {
    this.router.navigate(['tasks/lists', { id: taskId }]);
  }

  viewCancelled(todoCompleted: TaskListListItem): void {
    this.goBack(todoCompleted.id);
  }

  viewRemoved(todoCompleted: TaskListListItem): void {
    this.store.dispatch(
      TaskListDetailEditPageActions.removed({ taskList: todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskListDetailEditPageActions.saved({ taskList: todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }
}
