import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';

import { Store } from '@ngrx/store';

import * as CurrentTasksRootActions from '@app/root-store/tasks-store/actions/current-tasks-root.actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-current-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./current-tasks-root.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class CurrentTasksRootComponent implements OnDestroy {
  private readonly store = inject(Store);

  ngOnDestroy(): void {
    this.store.dispatch(CurrentTasksRootActions.destroyed());
  }
}
