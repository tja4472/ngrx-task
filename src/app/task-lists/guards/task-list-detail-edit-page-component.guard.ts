import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  tap,
  timeout,
} from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import {
  TaskListSelectors,
  TaskSelectors,
} from '@app/root-store/tasks-store/selectors';

import { TaskListDetailEditPageComponentGuardActions } from '../actions';

// We don't want load component unless the task list exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class TaskListDetailEditPageComponentGuard {
  constructor(private readonly store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.waitForTaskListsToLoad().pipe(
      timeout(5000),
      switchMap(() => {
        return this.hasTaskListInStore();
      }),
      catchError((err) => of(false))
    );
  }

  private hasTaskListInStore(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectTaskListFromRoute).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          this.store.dispatch(
            TaskListDetailEditPageComponentGuardActions.taskListNotFound()
          );
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }),
      take(1)
    );
  }

  private waitForTaskListsToLoad(): Observable<boolean> {
    return this.store.select(TaskListSelectors.selectLoaded).pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }
}
