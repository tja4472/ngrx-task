import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CurrentTasksPageActions, TodoActions } from '@app/tasks/actions';
import { CurrentTask } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-current-tasks-page',
  templateUrl: './current-tasks-page.component.html',
  styleUrls: ['./current-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksPageComponent implements OnInit {
  currentTasks$: Observable<CurrentTask[]>;

  constructor(private store: Store<any>) {
    this.currentTasks$ = store.pipe(
      select(TaskSelectors.selectCurrentTasksAll)
    );
  }

  ngOnInit() {
    this.store.dispatch(CurrentTasksPageActions.enter());
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(TodoActions.reorderList({ ids }));
  }

  viewClearCompleted() {
    this.store.dispatch(CurrentTasksPageActions.clearCompleted());
  }

  viewNewCurrentTask() {
    this.store.dispatch(CurrentTasksPageActions.newCurrentTask());
  }

  toggleCompleteItem(item: CurrentTask) {
    const newItem: CurrentTask = { ...item, isComplete: !item.isComplete };
    this.store.dispatch(
      CurrentTasksPageActions.saveItem({ currentTask: newItem })
    );
  }
}
