import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class CompletedTaskGuardService implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCompletedTasksToLoad().pipe(
      switchMap(() => this.hasCompletedTask())
    );
  }

  private hasCompletedTask(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCompletedTaskFromRoute).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((todo) => todo !== undefined),
      take(1)
    );
  }

  private waitForCompletedTasksToLoad(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCompletedTasksLoaded).pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }
}
