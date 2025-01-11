import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

import * as TaskSelectors from '@app/root-store/tasks-store/selectors/task.selectors';

import * as UserStoreSelectors from '@app/root-store/user-store/selectors';

import * as CompletedTasksRootGuardServiceActions from '@app/root-store/tasks-store/actions/completed-tasks-root-guard-service.actions';

@Injectable({
  providedIn: 'root',
})
export class CompletedTasksRootGuardService {
  private readonly store = inject(Store);

  canActivate(): Observable<boolean> {
    return this.waitForAuth().pipe(
      // tap(() => console.log('waitForAuth - complete')),
      switchMap(() =>
        this.waitForCompletedTasksToLoad().pipe(
          // tap(() => console.log('waitForCompletedTasksToLoad - complete')),
          switchMap(() => of(true))
        )
      )
    );
  }

  private waitForAuth() {
    return this.store.select(UserStoreSelectors.selectUser).pipe(
      filter((user) => !!user),
      first()
    );
  }

  private waitForCompletedTasksToLoad(): Observable<boolean> {
    return this.store.select(TaskSelectors.selectCompletedTasksLoaded).pipe(
      tap((loaded) => {
        // console.log('waitForCompletedTasksToLoad>loaded>', loaded);
        if (!loaded) {
          this.store.dispatch(CompletedTasksRootGuardServiceActions.loadData());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
