import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskListDetailEditPageActions } from '@app/root-store/tasks-store/actions';
import { TaskListListItem } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-task-list-detail-edit-page',
  templateUrl: './task-list-detail-edit-page.component.html',
  styleUrls: ['./task-list-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailEditPageComponent {
  task$: Observable<TaskListListItem | undefined>;

  constructor(private readonly store: Store) {
    this.task$ = store.select(TaskSelectors.selectTaskListFromRoute);
  }

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
