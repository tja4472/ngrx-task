import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskActions, TodoActions } from '@app/tasks/actions';
import { TodoCompleted } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-completed-tasks-detail-page',
  templateUrl: './completed-tasks-detail-page.component.html',
  styleUrls: ['./completed-tasks-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksDetailPageComponent implements OnInit {
  id: string;
  task$: Observable<TodoCompleted>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private location: Location
  ) {
    this.route.paramMap
      .pipe(
        map((params) =>
          TaskActions.completedTaskDetailsPageEnter({ id: params.get('id') })
        )
      )
      .subscribe(this.store);
    /*    
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
*/

    this.task$ = store.pipe(select(TaskSelectors.getSelectedCompletedTask));
  }

  ngOnInit() {
    // this.store.dispatch(TaskActions.enterCurrentTasksPage());
  }

  goBack(): void {
    this.location.back();
  }

  viewRemoved(todoCompleted: TodoCompleted): void {
    this.store.dispatch(
      TaskActions.completedTaskDetailsPageRemoved({ todoCompleted })
    );
    this.goBack();
  }

  viewSaved(todoCompleted: TodoCompleted) {
    this.store.dispatch(
      TaskActions.completedTaskDetailsPageSaved({ todoCompleted })
    );
    this.goBack();
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(new TodoActions.ReorderListA({ ids }));
  }

  onIncompleteToDo(toDo: TodoCompleted) {
    // this.store.dispatch(new IncompleteToDo(toDo));
  }
}
