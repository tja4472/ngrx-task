import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as TaskListsPageActions from '@app/root-store/tasks-store/actions/task-lists-page.actions';

import { TaskListListItem } from '@app/models/task-list-list-item.model';
import * as TaskListSelectors from '@app/root-store/tasks-store/selectors/task-list';
import { TaskListListComponent } from '../../components/task-list-list/task-list-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TaskListListComponent, AsyncPipe],
})
export class TaskListsPageComponent implements OnInit {
  taskLists$: Observable<TaskListListItem[]>;

  constructor(private readonly store: Store) {
    this.taskLists$ = store.select(TaskListSelectors.selectAll);
  }

  ngOnInit() {
    this.store.dispatch(TaskListsPageActions.enter());
  }

  viewNewCurrentTask() {
    this.store.dispatch(TaskListsPageActions.newTaskList());
  }
}
