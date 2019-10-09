import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskActions, TodoActions } from '@app/tasks/actions';
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
  selectedId: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {
    // this.currentTasks$ = store.pipe(select(TaskSelectors.getAllCurrentTasks));
  }

  ngOnInit() {
    this.currentTasks$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = params.get('id');
        return this.store.pipe(select(TaskSelectors.selectCurrentTasksAll));
      })
    );
    this.store.dispatch(TaskActions.currentTasksPageEnter());
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(TodoActions.reorderList({ ids }));
  }

  viewClearCompleted() {
    this.store.dispatch(TaskActions.currentTasksPageClearCompleted());
  }

  viewNewCurrentTask() {
    this.store.dispatch(TaskActions.currentTasksPageNewCurrentTask());
  }

  toggleCompleteItem(item: CurrentTask) {
    const newItem: CurrentTask = { ...item, isComplete: !item.isComplete };
    this.store.dispatch(
      TaskActions.currentTasksPageSaveItem({ currentTask: newItem })
    );
    // this.todoService.upsertItem(newItem);
  }
}
