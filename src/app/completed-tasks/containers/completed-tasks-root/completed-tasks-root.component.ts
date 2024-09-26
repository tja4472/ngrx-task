import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';

import * as CompletedTasksRootActions from '@app/root-store/tasks-store/actions/completed-tasks-root.actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-completed-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./completed-tasks-root.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class CompletedTasksRootComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.store.dispatch(CompletedTasksRootActions.destroyed());
  }

  constructor(private readonly store: Store) {}
}
