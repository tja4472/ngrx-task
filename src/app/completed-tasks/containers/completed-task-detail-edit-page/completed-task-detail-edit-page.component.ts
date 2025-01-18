import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as CompletedTaskDetailEditPageActions from '@app/root-store/tasks-store/actions/completed-task-detail-edit-page.actions';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';
import { CompletedTaskDetailEditComponent } from '../../components/completed-task-detail-edit/completed-task-detail-edit.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-completed-task-detail-edit-page',
  templateUrl: './completed-task-detail-edit-page.component.html',
  styleUrls: ['./completed-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CompletedTaskDetailEditComponent, AsyncPipe, JsonPipe],
})
export class CompletedTaskDetailEditPageComponent {
  private readonly store = inject(Store);

  task$: Observable<CompletedTask | undefined>;

  constructor() {
    const store = this.store;

    this.task$ = store.select(TaskSelectors.selectCompletedTaskFromRoute);
  }

  viewCancelled(completedTask: CompletedTask): void {
    this.store.dispatch(
      CompletedTaskDetailEditPageActions.cancelled({
        completedTask,
      })
    );
  }

  viewRemoved(completedTask: CompletedTask): void {
    this.store.dispatch(
      CompletedTaskDetailEditPageActions.removed({
        completedTask,
      })
    );
  }

  viewSaved(completedTask: CompletedTask) {
    this.store.dispatch(
      CompletedTaskDetailEditPageActions.saved({ completedTask })
    );
  }
}
