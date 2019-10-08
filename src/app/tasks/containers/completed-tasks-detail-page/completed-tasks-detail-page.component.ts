import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskActions, TodoActions } from '@app/tasks/actions';
import { CompletedTask } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-completed-tasks-detail-page',
  templateUrl: './completed-tasks-detail-page.component.html',
  styleUrls: ['./completed-tasks-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksDetailPageComponent implements OnInit {
  task$: Observable<CompletedTask>;

  constructor(private router: Router, private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.selectCompletedTaskFromRoute));
  }

  ngOnInit() {}

  private goBack(taskId: string): void {
    this.router.navigate(['/tasks/completed', { id: taskId }]);
  }

  viewCancelled(todoCompleted: CompletedTask): void {
    this.goBack(todoCompleted.id);
  }

  viewRemoved(todoCompleted: CompletedTask): void {
    this.store.dispatch(
      TaskActions.completedTaskDetailsPageRemoved({ todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }

  viewSaved(todoCompleted: CompletedTask) {
    this.store.dispatch(
      TaskActions.completedTaskDetailsPageSaved({ todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }
}
