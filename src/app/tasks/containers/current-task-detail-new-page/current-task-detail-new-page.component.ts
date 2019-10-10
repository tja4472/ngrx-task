import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { CurrentTaskDetailNewPageActions } from '@app/tasks/actions';
import { CurrentTask, newCurrentTask } from '@app/tasks/models';

@Component({
  selector: 'app-current-task-detail-new-page',
  templateUrl: './current-task-detail-new-page.component.html',
  styleUrls: ['./current-task-detail-new-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTaskDetailNewPageComponent implements OnInit {
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
      CurrentTaskDetailNewPageActions.saved({ currentTask: todo })
    );
    this.goBack();
  }
}
