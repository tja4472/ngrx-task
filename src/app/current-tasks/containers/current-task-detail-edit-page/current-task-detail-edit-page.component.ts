import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as CurrentTaskDetailEditPageActions from '@app/root-store/tasks-store/actions/current-task-detail-edit-page.actions';
import { CurrentTask } from '@app/root-store/tasks-store/models/current-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';
import { CurrentTaskDetailEditComponent } from '../../components/current-task-detail-edit/current-task-detail-edit.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-current-task-detail-edit-page',
  templateUrl: './current-task-detail-edit-page.component.html',
  styleUrls: ['./current-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrentTaskDetailEditComponent, AsyncPipe, JsonPipe],
})
export class CurrentTaskDetailEditPageComponent {
  private readonly store = inject(Store);

  task$: Observable<CurrentTask>;

  constructor() {
    const store = this.store;

    // The undefined task is caught by route guard.
    this.task$ = store
      .select(TaskSelectors.selectCurrentTaskFromRoute)
      .pipe(
        filter(
          (currentTask): currentTask is CurrentTask => currentTask !== undefined
        )
      );
  }

  viewCancelled(todo: CurrentTask): void {
    this.store.dispatch(
      CurrentTaskDetailEditPageActions.cancelled({ currentTask: todo })
    );
  }

  viewRemoved(todo: CurrentTask): void {
    this.store.dispatch(
      CurrentTaskDetailEditPageActions.removed({ currentTask: todo })
    );
  }

  viewSaved(todo: CurrentTask) {
    this.store.dispatch(
      CurrentTaskDetailEditPageActions.saved({ currentTask: todo })
    );
  }
}
