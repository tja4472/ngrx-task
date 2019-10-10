import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CurrentTaskDetailEditPageActions } from '@app/tasks/actions';
import { CurrentTask } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-current-task-detail-edit-page',
  templateUrl: './current-task-detail-edit-page.component.html',
  styleUrls: ['./current-task-detail-edit-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailEditPageComponent implements OnInit {
  task$: Observable<CurrentTask>;

  constructor(private router: Router, private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.selectCurrentTaskFromRoute));
  }

  ngOnInit() {}

  private goBack(taskId: string): void {
    this.router.navigate(['/tasks/current', { id: taskId }]);
  }

  viewCancelled(todo: CurrentTask): void {
    this.goBack(todo.id);
  }

  viewRemoved(todo: CurrentTask): void {
    this.store.dispatch(CurrentTaskDetailEditPageActions.removed({ todo }));
    this.goBack(todo.id);
  }

  viewSaved(todo: CurrentTask) {
    this.store.dispatch(
      CurrentTaskDetailEditPageActions.saved({ currentTask: todo })
    );
    this.goBack(todo.id);
  }
}
