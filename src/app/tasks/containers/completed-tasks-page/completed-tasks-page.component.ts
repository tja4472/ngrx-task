import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskActions } from '@app/tasks/actions';
import { TodoCompleted } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent implements OnInit {
  completedTasks$: Observable<TodoCompleted[]>;
  selectedId: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {
    // this.completedTasks$ = store.pipe(
    //  select(TaskSelectors.getAllCompletedTasks)
    // );
  }

  ngOnInit() {
    this.completedTasks$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = params.get('id');
        return this.store.pipe(select(TaskSelectors.selectCompletedTasksAll));
      })
    );
    this.store.dispatch(TaskActions.enterCompletedTasksPage());
  }

  toggleCompleteItem(item: TodoCompleted) {
    this.store.dispatch(
      TaskActions.completedTaskDetailsItemToggled({ todoCompleted: item })
    );
  }
}
