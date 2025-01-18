import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as CompletedTasksPageActions from '@app/root-store/tasks-store/actions/completed-tasks-page.actions';
import { CompletedTask } from '@app/root-store/tasks-store/models/completed-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';
import { SearchComponent } from '../../components/search/search.component';
import { CompletedTaskListComponent } from '../../components/completed-task-list/completed-task-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchComponent, CompletedTaskListComponent, AsyncPipe],
})
export class CompletedTasksPageComponent {
  private readonly store = inject(Store);

  completedTasks$: Observable<CompletedTask[]>;
  viewSearchQuery$: Observable<string>;

  constructor() {
    const store = this.store;

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
