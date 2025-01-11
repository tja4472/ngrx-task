import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';

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
  private readonly store = inject(Store);

  ngOnDestroy(): void {
    this.store.dispatch(CompletedTasksRootActions.destroyed());
  }
}
