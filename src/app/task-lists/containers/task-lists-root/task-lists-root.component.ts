import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';

// import { TaskListsRootActions } from '@app/tasks/actions';

@Component({
  selector: 'app-task-lists-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./task-lists-root.component.css'],
  imports: [RouterOutlet],
})
export class TaskListsRootComponent {
  private readonly store = inject(Store);
}
