import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TaskSelectors } from '@app/root-store/tasks-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class CurrentTaskGuardService implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask())
    );
  }

  private hasCurrentTask(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectCurrentTaskFromRoute),
      map((todo) => todo !== undefined),
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
