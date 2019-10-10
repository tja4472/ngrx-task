import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CompletedTasksPageActions } from '@app/tasks/actions';
import { CompletedTask } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent implements OnInit {
  completedTasks$: Observable<CompletedTask[]>;

  constructor(private store: Store<any>) {
    this.completedTasks$ = store.pipe(
      select(TaskSelectors.selectCompletedTasksAll)
    );
  }

  ngOnInit() {
    this.store.dispatch(CompletedTasksPageActions.enter());
  }

  toggleCompleteItem(item: CompletedTask) {
    this.store.dispatch(
      CompletedTasksPageActions.itemToggled({ todoCompleted: item })
    );
  }
}
