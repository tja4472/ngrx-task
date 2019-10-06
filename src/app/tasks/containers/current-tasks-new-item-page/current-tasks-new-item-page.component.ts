import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { CurrentTaskNewItemPageActions } from '@app/tasks/actions';
import { newTodo, Todo } from '@app/tasks/models';

@Component({
  selector: 'app-current-tasks-new-item-page',
  templateUrl: './current-tasks-new-item-page.component.html',
  styleUrls: ['./current-tasks-new-item-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksNewItemPageComponent implements OnInit {
  task = newTodo();

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {
    // this.store.dispatch(TaskActions.enterCurrentTasksPage());
  }

  private goBack(): void {
    this.router.navigate(['/tasks/current']);
  }

  viewCancelled(todo: Todo): void {
    this.goBack();
  }

  viewSaved(todo: Todo) {
    this.store.dispatch(CurrentTaskNewItemPageActions.Saved({ todo }));
    this.goBack();
  }
}
