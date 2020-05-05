import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListDetailEditPageComponentGuardActions } from '../actions';

// We don't want load component unless the task exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class TaskListDetailEditPageComponentGuard implements CanActivate {
  constructor(private store: Store<RootState>, private router: Router) {}

  /*
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask())
    );
  }
*/
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasTaskList();
  }

  private hasTaskList(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectTaskListFromRoute),
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          // throw action Current Task not found
          console.log('hasTaskList>', x);
          this.store.dispatch(
            TaskListDetailEditPageComponentGuardActions.taskListNotFound()
          );
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }),
      take(1)
    );
  }

  private waitForCurrentTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTasksLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
