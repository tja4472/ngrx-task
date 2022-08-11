import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import {
  TaskListSelectors,
  TaskSelectors,
} from '@app/root-store/tasks-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskListGuardService implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForTaskListsToLoad().pipe(
      switchMap(() => this.hasTaskList())
    );
  }

  private hasTaskList(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectTaskListFromRoute).pipe(
      // eslint-disable-next-line @ngrx/avoid-mapping-selectors
      map((todo) => todo !== undefined),
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
