import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { CurrentTasksRootActions } from '@app/tasks/actions';

@Component({
  selector: 'app-current-tasks-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./current-tasks-root.component.css'],
})
export class CurrentTasksRootComponent implements OnDestroy, OnInit {
  ngOnDestroy(): void {
    this.store.dispatch(CurrentTasksRootActions.destroyed());
  }

  ngOnInit(): void {}

  constructor(private store: Store<any>) {}
}
