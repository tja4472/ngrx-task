/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { CurrentTaskDetailNewPageActions } from '@app/root-store/tasks-store/actions';
import {
  CurrentTask,
  newCurrentTask,
} from '@app/root-store/tasks-store/models';

@Component({
  selector: 'app-current-task-detail-new-page',
  templateUrl: './current-task-detail-new-page.component.html',
  styleUrls: ['./current-task-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailNewPageComponent {
  task = newCurrentTask();

  constructor(private readonly store: Store) {}

  viewCancelled(todo: CurrentTask): void {
    this.store.dispatch(CurrentTaskDetailNewPageActions.cancelled());
  }

  viewSaved(todo: CurrentTask) {
    this.store.dispatch(
      CurrentTaskDetailNewPageActions.saved({ currentTask: todo })
    );
  }
}
