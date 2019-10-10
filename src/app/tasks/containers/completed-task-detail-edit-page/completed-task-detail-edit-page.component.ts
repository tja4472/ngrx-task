import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CompletedTaskDetailEditPageActions } from '@app/tasks/actions';
import { CompletedTask } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-completed-task-detail-edit-page',
  templateUrl: './completed-task-detail-edit-page.component.html',
  styleUrls: ['./completed-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTaskDetailEditPageComponent implements OnInit {
  task$: Observable<CompletedTask>;

  constructor(private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.selectCompletedTaskFromRoute));
  }

  ngOnInit() {}

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
