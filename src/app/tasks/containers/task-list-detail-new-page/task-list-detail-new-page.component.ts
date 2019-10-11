import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {}

  private goBack(): void {
    this.router.navigate(['/tasks/lists']);
  }

  viewCancelled(todoCompleted: TaskListListItem): void {
    this.goBack();
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskListDetailNewPageActions.saved({ taskList: todoCompleted })
    );
    this.goBack();
  }
}
