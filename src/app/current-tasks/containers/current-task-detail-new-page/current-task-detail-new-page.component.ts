/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as CurrentTaskDetailNewPageActions from '@app/root-store/tasks-store/actions/current-task-detail-new-page.actions';

import {
  CurrentTask,
  newCurrentTask,
} from '@app/root-store/tasks-store/models/current-task.model';
import { CurrentTaskDetailNewComponent } from '../../components/current-task-detail-new/current-task-detail-new.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-current-task-detail-new-page',
  templateUrl: './current-task-detail-new-page.component.html',
  styleUrls: ['./current-task-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrentTaskDetailNewComponent, JsonPipe],
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
