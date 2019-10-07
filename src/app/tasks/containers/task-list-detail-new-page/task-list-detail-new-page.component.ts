import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { TaskActions } from '@app/tasks/actions';
import { newTodoListsItem, TodoListsItem } from '@app/tasks/models';

@Component({
  selector: 'app-task-list-detail-new-page',
  templateUrl: './task-list-detail-new-page.component.html',
  styleUrls: ['./task-list-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailNewPageComponent implements OnInit {
  task$ = newTodoListsItem();

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {}

  private goBack(): void {
    this.router.navigate(['/tasks/lists']);
  }

  viewCancelled(todoCompleted: TodoListsItem): void {
    this.goBack();
  }

  viewSaved(todoCompleted: TodoListsItem) {
    this.store.dispatch(
      TaskActions.taskListDetailNewPageSaved({ todoCompleted })
    );
    this.goBack();
  }
}
