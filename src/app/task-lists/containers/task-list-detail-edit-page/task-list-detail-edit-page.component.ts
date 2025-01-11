import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as TaskListDetailEditPageActions from '@app/root-store/tasks-store/actions/task-list-detail-edit-page.actions';

import { TaskListListItem } from '@app/models/task-list-list-item.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';
import { TaskListDetailEditComponent } from '../../components/task-list-detail-edit/task-list-detail-edit.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-list-detail-edit-page',
  templateUrl: './task-list-detail-edit-page.component.html',
  styleUrls: ['./task-list-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TaskListDetailEditComponent, AsyncPipe, JsonPipe],
})
export class TaskListDetailEditPageComponent {
  private readonly store = inject(Store);

  task$: Observable<TaskListListItem | undefined>;

  constructor() {
    const store = this.store;

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
