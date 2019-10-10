import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TaskActions } from '@app/tasks/actions';
import { TaskListListItem } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListsPageComponent implements OnInit {
  taskLists$: Observable<TaskListListItem[]>;

  constructor(private store: Store<any>) {
    this.taskLists$ = store.pipe(select(TaskSelectors.selectTaskListsAll));
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.enterTaskListsPage());
  }

  viewNewCurrentTask() {
    this.store.dispatch(TaskActions.TaskListPageNewTaskList());
  }
}
