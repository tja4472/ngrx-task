/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';

import * as CurrentTaskDetailEditPageComponentGuardActions from '../actions/current-task-detail-edit-page-component-guard.actions';

// We don't want load component unless the task exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class CurrentTaskDetailEditPageComponentGuard {
  constructor(
    private readonly store: Store,
    private router: Router
  ) {}

  /*
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask())
    );
  }
*/
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasCurrentTask();
  }

  private hasCurrentTask(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCurrentTaskFromRoute).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          // throw action Current Task not found
          console.log('hasCurrentTask>', x);
          this.store.dispatch(
            CurrentTaskDetailEditPageComponentGuardActions.currentTaskNotFound()
          );
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }),
      take(1)
    );
  }

  private waitForCurrentTasksToLoad(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCurrentTasksLoaded).pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }
}
