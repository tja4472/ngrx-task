import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as CurrentTasksPageActions from '@app/root-store/tasks-store/actions/current-tasks-page.actions';
import * as TodoActions from '@app/root-store/tasks-store/actions/todo.action';

import {
  CurrentTask,
  toggleIsComplete,
} from '@app/root-store/tasks-store/models/current-task.model';
import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';
import { CurrentTaskListComponent } from '../../components/current-task-list/current-task-list.component';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-current-tasks-page',
  templateUrl: './current-tasks-page.component.html',
  styleUrls: ['./current-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrentTaskListComponent,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    AsyncPipe,
  ],
})
export class CurrentTasksPageComponent implements OnInit {
  private readonly store = inject(Store);

  currentTasks$: Observable<CurrentTask[]>;

  constructor() {
    const store = this.store;

    this.currentTasks$ = store.select(TaskSelectors.selectCurrentTasksAll);
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
    const updatedTask: CurrentTask = toggleIsComplete(item, !item.isComplete);

    this.store.dispatch(
      CurrentTasksPageActions.saveItem({ currentTask: updatedTask })
    );
  }
}
