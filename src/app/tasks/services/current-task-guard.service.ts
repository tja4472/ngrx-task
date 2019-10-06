import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TaskSelectors } from '@app/tasks/selectors';

@Injectable({
  providedIn: 'root',
})
export class CurrentTaskGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCurrentTasksToLoad().pipe(
      switchMap(() => this.hasCurrentTask(route.paramMap.get('id')))
    );
  }

  private hasCurrentTask(id: string): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.getCurrentTaskFromRoute),
      map((todo) => todo !== undefined),
      take(1)
    );
  }

  private waitForCurrentTasksToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.getCurrentTasksLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
