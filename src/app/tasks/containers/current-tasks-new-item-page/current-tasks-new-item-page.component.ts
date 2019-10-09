import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { CurrentTaskNewItemPageActions } from '@app/tasks/actions';
import { CurrentTask, newCurrentTask } from '@app/tasks/models';

@Component({
  selector: 'app-current-tasks-new-item-page',
  templateUrl: './current-tasks-new-item-page.component.html',
  styleUrls: ['./current-tasks-new-item-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksNewItemPageComponent implements OnInit {
  task = newCurrentTask();

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit() {}

  private goBack(): void {
    this.router.navigate(['/tasks/current']);
  }

  viewCancelled(todo: CurrentTask): void {
    this.goBack();
  }

  viewSaved(todo: CurrentTask) {
    this.store.dispatch(
      CurrentTaskNewItemPageActions.Saved({ currentTask: todo })
    );
    this.goBack();
  }
}
