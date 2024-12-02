/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { catchError, filter, Observable, of, take, tap, timeout } from 'rxjs';

import * as TaskListSelectors from '@app/root-store/tasks-store/selectors/task-list';

import * as TaskListsGuardActions from '../actions/task-lists-guard.actions';

export const taskListsCanMatchGuard: CanMatchFn = (route) => {
  //
  const store = inject(Store);
  const url = `/${route.path ?? ''}`;

  const result = store.select(TaskListSelectors.selectLoaded).pipe(
    timeout(5000),
    /*
    tap((loaded) => {
      console.log('loaded>', loaded);
    }),
    */
    filter((loaded) => loaded),
    take(1),
    catchError((err) => {
      store.dispatch(TaskListsGuardActions.timeout({ requestedUrl: url }));
      return of(false);
    })
  );

  return result;
};
