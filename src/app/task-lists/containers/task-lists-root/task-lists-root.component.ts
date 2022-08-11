import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';

// import { TaskListsRootActions } from '@app/tasks/actions';

@Component({
  selector: 'app-task-lists-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./task-lists-root.component.css'],
})
export class TaskListsRootComponent {
  constructor(private readonly store: Store) {}
}
