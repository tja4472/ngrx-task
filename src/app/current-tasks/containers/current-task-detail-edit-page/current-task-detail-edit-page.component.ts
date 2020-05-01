import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CurrentTaskDetailEditPageActions } from '@app/root-store/tasks-store/actions';
import { CurrentTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-current-task-detail-edit-page',
  templateUrl: './current-task-detail-edit-page.component.html',
  styleUrls: ['./current-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailEditPageComponent implements OnInit {
  task$: Observable<CurrentTask>;

  // what to do if task is null ?
  // show 404: not found
  // dispatch action task not found.
  constructor(private store: Store<{}>) {
    // The undefined task is caught by guard.
    this.task$ = store.pipe(
      select(TaskSelectors.selectCurrentTaskFromRoute)
    ) as Observable<CurrentTask>;

    const subscribe = store
      .pipe(select(TaskSelectors.selectCurrentTaskFromRoute))
      .subscribe((x) => {
        console.log('SSSSS>', x);
      });
  }

  ngOnInit() {}

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
