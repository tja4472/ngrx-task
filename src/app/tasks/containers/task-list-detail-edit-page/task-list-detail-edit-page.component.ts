import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskActions } from '@app/tasks/actions';
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
      TaskActions.taskListDetailPageRemoved({ todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }

  viewSaved(todoCompleted: TaskListListItem) {
    this.store.dispatch(
      TaskActions.taskListDetailEditPageSaved({ todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }
}
