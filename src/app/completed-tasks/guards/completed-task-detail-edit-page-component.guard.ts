import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

import { CompletedTaskDetailEditPageComponentGuardActions } from '../actions';

// We don't want load component unless the task exists
// in the Store.
@Injectable({
  providedIn: 'root',
})
export class CompletedTaskDetailEditPageComponentGuard  {
  constructor(private readonly store: Store, private router: Router) {}

  /*
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask())
    );
  }
*/
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasCompletedTask();
  }

  private hasCompletedTask(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCompletedTaskFromRoute).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((todo) => todo !== undefined),
      tap((x) => {
        if (x === false) {
          // throw action Current Task not found
          console.log('hasCompletedTask>', x);
          this.store.dispatch(
            CompletedTaskDetailEditPageComponentGuardActions.completedTaskNotFound()
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
