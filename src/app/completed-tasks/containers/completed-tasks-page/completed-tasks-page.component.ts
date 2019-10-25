import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { CompletedTasksPageActions } from '@app/root-store/tasks-store/actions';
import { CompletedTask } from '@app/root-store/tasks-store/models';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Component({
  selector: 'app-completed-tasks-page',
  templateUrl: './completed-tasks-page.component.html',
  styleUrls: ['./completed-tasks-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedTasksPageComponent implements OnDestroy, OnInit {
  completedTasks$: Observable<CompletedTask[]>;

  constructor(private store: Store<{}>) {
    this.completedTasks$ = store.pipe(
      select(TaskSelectors.selectCompletedTasksAll)
    );
  }

  ngOnDestroy(): void {
    // this.store.dispatch(CompletedTasksPageActions.destroyed());
  }

  ngOnInit() {
    // this.store.dispatch(CompletedTasksPageActions.entered());
  }

  toggleCompleteItem(item: CompletedTask) {
    this.store.dispatch(
      CompletedTasksPageActions.itemToggled({ todoCompleted: item })
    );
  }
}
