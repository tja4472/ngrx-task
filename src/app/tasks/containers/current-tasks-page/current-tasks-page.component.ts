import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskActions } from '@app/tasks/actions';
import { Todo } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-current-tasks-page',
  templateUrl: './current-tasks-page.component.html',
  styleUrls: ['./current-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksPageComponent implements OnInit {
  currentTasks$: Observable<Todo[]>;

  constructor(private store: Store<any>) {
    this.currentTasks$ = store.pipe(select(TaskSelectors.getAllCurrentTasks));
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.enterCurrentTasksPage());
  }
}
