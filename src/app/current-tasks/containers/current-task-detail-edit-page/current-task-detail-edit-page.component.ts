import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CurrentTaskDetailEditPageActions } from '@app/root-store/tasks-store/actions';
import { CurrentTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-current-task-detail-edit-page',
  templateUrl: './current-task-detail-edit-page.component.html',
  styleUrls: ['./current-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailEditPageComponent {
  task$: Observable<CurrentTask>;

  constructor(private readonly store: Store) {
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
