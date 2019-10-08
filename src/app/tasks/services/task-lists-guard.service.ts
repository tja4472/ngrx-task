import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { TaskSelectors } from '@app/tasks/selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskListsGuardService implements CanActivate {
  constructor(private store: Store<any>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForTaskListsToLoad().pipe(
      switchMap(() => this.hasTaskList())
    );
  }

  private hasTaskList(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectTaskListFromRoute),
      map((todo) => todo !== undefined),
      take(1)
    );
  }

  private waitForTaskListsToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(TaskSelectors.selectTaskListsLoaded),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
