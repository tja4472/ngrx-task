import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskActions } from '@app/tasks/actions';
import { Todo } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-current-tasks-detail-page',
  templateUrl: './current-tasks-detail-page.component.html',
  styleUrls: ['./current-tasks-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksDetailPageComponent implements OnInit {
  task$: Observable<Todo>;

  constructor(private router: Router, private store: Store<any>) {
    this.task$ = store.pipe(select(TaskSelectors.getCurrentTaskFromRoute));
  }

  ngOnInit() {}

  private goBack(taskId: string): void {
    this.router.navigate(['/tasks/current', { id: taskId }]);
  }

  viewCancelled(todo: Todo): void {
    this.goBack(todo.id);
  }

  viewRemoved(todo: Todo): void {
    this.store.dispatch(TaskActions.currentTaskDetailsPageRemoved({ todo }));
    this.goBack(todo.id);
  }

  viewSaved(todo: Todo) {
    this.store.dispatch(TaskActions.currentTaskDetailsPageSaved({ todo }));
    this.goBack(todo.id);
  }
}
