import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskActions, TodoActions } from '@app/tasks/actions';
import { Todo } from '@app/tasks/models';
import { TaskSelectors } from '@app/tasks/selectors';

@Component({
  selector: 'app-current-tasks-detail-page',
  templateUrl: './current-tasks-detail-page.component.html',
  styleUrls: ['./current-tasks-detail-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentTasksDetailPageComponent implements OnInit {
  id: string;
  task$: Observable<Todo>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private location: Location
  ) {
    this.route.paramMap
      .pipe(
        map((params) =>
          TaskActions.currentTaskDetailsPageEnter({ id: params.get('id') })
        )
      )
      .subscribe(this.store);
    /*    
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
*/

    /*
    this.task$ = 
*/

    this.task$ = store.pipe(select(TaskSelectors.getSelectedCurrentTask));
  }

  ngOnInit() {
    // this.store.dispatch(TaskActions.enterCurrentTasksPage());
  }

  goBack(): void {
    this.location.back();
  }

  viewRemoved(todo: Todo): void {
    this.store.dispatch(TaskActions.currentTaskDetailsPageRemoved({ todo }));
    this.goBack();
  }

  viewSaved(todo: Todo) {
    console.log('viewSaved>', todo);
    this.store.dispatch(TaskActions.currentTaskDetailsPageSaved({ todo }));
    this.goBack();
  }

  reorderItems(ids: string[]) {
    this.store.dispatch(new TodoActions.ReorderListA({ ids }));
  }

  onIncompleteToDo(toDo: Todo) {
    // this.store.dispatch(new IncompleteToDo(toDo));
  }
}
