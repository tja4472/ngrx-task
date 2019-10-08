import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskActions } from '@app/tasks/actions';
import { TodoListsItem } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-task-lists-page',
  templateUrl: './task-lists-page.component.html',
  styleUrls: ['./task-lists-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListsPageComponent implements OnInit {
  taskLists$: Observable<TodoListsItem[]>;

  selectedId: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {
    // this.taskLists$ = store.pipe(select(TaskSelectors.getAllTaskLists));
  }

  ngOnInit() {
    this.taskLists$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = params.get('id');
        return this.store.pipe(select(TaskSelectors.selectTaskListsAll));
      })
    );
    this.store.dispatch(TaskActions.enterTaskListsPage());
  }

  viewNewCurrentTask() {
    this.store.dispatch(TaskActions.TaskListPageNewTaskList());
  }

  toggleCompleteItem(a) {}
}
