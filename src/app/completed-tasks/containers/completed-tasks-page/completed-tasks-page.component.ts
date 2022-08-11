import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CompletedTasksPageActions } from '@app/root-store/tasks-store/actions';
import { CompletedTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent {
  completedTasks$: Observable<CompletedTask[]>;
  viewSearchQuery$: Observable<string>;

  constructor(private readonly store: Store) {
    this.viewSearchQuery$ = store
      .select(TaskSelectors.selectCompletedTasksQuery)
      .pipe(take(1));

    this.completedTasks$ = store
      // select(TaskSelectors.selectCompletedTasksAll)
      .select(TaskSelectors.selectCompletedTasksQueried);
  }

  viewSearch(query: string) {
    this.store.dispatch(CompletedTasksPageActions.search({ query }));
  }

  toggleCompleteItem(item: CompletedTask) {
    this.store.dispatch(
      CompletedTasksPageActions.itemToggled({ todoCompleted: item })
    );
  }
}
