import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as CompletedTaskDetailEditPageActions from '@app/root-store/tasks-store/actions/completed-task-detail-edit-page.actions';

import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';

@Component({
  selector: 'app-completed-task-detail-edit-page',
  templateUrl: './completed-task-detail-edit-page.component.html',
  styleUrls: ['./completed-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTaskDetailEditPageComponent {
  task$: Observable<CompletedTask | undefined>;

  constructor(private readonly store: Store) {
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
