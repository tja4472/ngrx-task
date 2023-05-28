import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, filter, take, timeout } from 'rxjs/operators';

import { RootState } from '@app/root-store/reducers';
import { TaskListSelectors } from '@app/root-store/tasks-store/selectors';

import { TaskListsGuardActions } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class TaskListsGuard  {
  constructor(private readonly store: Store) {}

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    // console.log('#### canLoad>', url);

    return this.store.select(TaskListSelectors.selectLoaded).pipe(
      timeout(5000),

      filter((loaded) => loaded),

      take(1),
      catchError((err) => {
        this.store.dispatch(
          TaskListsGuardActions.timeout({ requestedUrl: url })
        );
        return of(false);
      })
    );
  }
}
