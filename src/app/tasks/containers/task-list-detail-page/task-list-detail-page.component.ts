import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskActions, TodoActions } from '@app/tasks/actions';
import { TodoListsItem } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-task-list-detail-page',
  templateUrl: './task-list-detail-page.component.html',
  styleUrls: ['./task-list-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListDetailPageComponent implements OnInit {
  id: string;
  task$: Observable<TodoListsItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
  ) {
    this.route.paramMap
      .pipe(
        map((params) =>
          TaskActions.taskListDetailPageEnter({ id: params.get('id') })
        )
      )
      .subscribe(this.store);
    /*    
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
*/

    this.task$ = store.pipe(select(TaskSelectors.getSelectedTaskList));
  }

  ngOnInit() {
    // this.store.dispatch(TaskActions.enterCurrentTasksPage());
  }

  private goBack(taskId: string): void {
    this.router.navigate(['/lists', { id: taskId }]);
  }

  viewCancelled(todoCompleted: TodoListsItem): void {
    this.goBack(todoCompleted.id);
  }

  viewRemoved(todoCompleted: TodoListsItem): void {
    this.store.dispatch(
      TaskActions.taskListDetailPageRemoved({ todoCompleted })
    );
    this.goBack(todoCompleted.id);
  }

  viewSaved(todoCompleted: TodoListsItem) {
    this.store.dispatch(TaskActions.taskListDetailPageSaved({ todoCompleted }));
    this.goBack(todoCompleted.id);
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(new TodoActions.ReorderListA({ ids }));
  }

  onIncompleteToDo(toDo: TodoListsItem) {
    // this.store.dispatch(new IncompleteToDo(toDo));
  }
}
