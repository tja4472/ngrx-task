import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import { CompletedTasksRootActions } from '@app/root-store/tasks-store/actions';

@Component({
  selector: 'app-completed-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./completed-tasks-root.component.css'],
})
export class CompletedTasksRootComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.store.dispatch(CompletedTasksRootActions.destroyed());
  }

  constructor(private store: Store<{}>) {}
}
